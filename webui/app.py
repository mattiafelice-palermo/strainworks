from __future__ import annotations

import math
import uuid
from pathlib import Path
from typing import Any, Dict, Optional

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from ldanalyzer import (
    BestWindow,
    ExtractedData,
    compute_young_modulus,
    extract_table_from_text,
    fit_linear_force_disp,
    pick_best_window,
    preprocess_data,
    resolve_area_mm2,
    scan_windows,
)


DEFAULT_IO: dict[str, Any] = {
    "encoding": "latin1",
    "sep": ";",
    "quotechar": '"',
    "start_marker": "Tiempo;Desplazamiento;Fuerza",
    "skip_lines_after_marker": 2,
    "col_time": 0,
    "col_disp": 1,
    "col_force": 2,
}

DEFAULT_ANALYSIS: dict[str, Any] = {
    "window_step_n": 10,
    "min_width_n": 30,
    "max_width_n": 500,
    "min_valid_points": 20,
    "require_positive_slope": True,
    "area_mm2": 0.0,
    "diameter_mm": 0.0,
    "thickness_mm": 0.0,
}


class AnalyzeCsvRequest(BaseModel):
    csv_name: str = "uploaded.csv"
    csv_text: str
    io: dict[str, Any] = Field(default_factory=dict)
    analysis: dict[str, Any] = Field(default_factory=dict)


class MetricsRequest(BaseModel):
    dataset_id: str
    center_idx: int = Field(ge=0)
    width_n: int = Field(ge=3)
    min_valid_points: int = Field(default=20, ge=3)
    area_mm2: float = 0.0
    diameter_mm: float = 0.0
    thickness_mm: float = 0.0


class DomainsRequest(BaseModel):
    dataset_id: str
    min_score: float = 0.80
    area_mm2: float = 0.0
    diameter_mm: float = 0.0
    thickness_mm: float = 0.0


class ReleaseDatasetRequest(BaseModel):
    dataset_id: str


class ReplicaInput(BaseModel):
    name: str
    file_name: str = ""
    csv_text: str


class SampleInput(BaseModel):
    name: str
    replicas: list[ReplicaInput] = Field(default_factory=list)


class ProjectSummaryRequest(BaseModel):
    io: dict[str, Any] = Field(default_factory=dict)
    analysis: dict[str, Any] = Field(default_factory=dict)
    samples: list[SampleInput] = Field(default_factory=list)


app = FastAPI(title="LD Linear Web UI")

_static_dir = Path(__file__).resolve().parent / "static"
app.mount("/static", StaticFiles(directory=str(_static_dir)), name="static")


@app.get("/")
def index() -> FileResponse:
    return FileResponse(_static_dir / "index.html")


_STATE: Dict[str, dict[str, Any]] = {}


def _window_bounds(n: int, center_idx: int, width_n: int) -> tuple[int, int]:
    c = int(np.clip(center_idx, 0, n - 1))
    w = max(3, int(width_n))
    half = w // 2
    lo = c - half
    hi = c + half + (0 if (w % 2 == 0) else 1)
    lo = max(0, lo)
    hi = min(n, hi)
    return lo, hi


def _nearest_index(arr: np.ndarray, target: float) -> int:
    idx = int(np.searchsorted(arr, target))
    if idx <= 0:
        return 0
    if idx >= arr.size:
        return int(arr.size - 1)
    a = float(arr[idx - 1])
    b = float(arr[idx])
    return int(idx - 1 if abs(target - a) <= abs(b - target) else idx)


def _merge_cfg(base: dict[str, Any], override: dict[str, Any]) -> dict[str, Any]:
    out = dict(base)
    out.update({k: v for k, v in override.items() if v is not None})
    return out


def _scan_and_heatmap(data: ExtractedData, analysis: dict[str, Any]) -> tuple[Any, dict[str, Any]]:
    window_step_n = max(1, int(analysis.get("window_step_n", 10)))
    min_valid_points = int(analysis.get("min_valid_points", 20))
    min_width_n = max(3, int(analysis.get("min_width_n", max(3, min_valid_points))))
    max_width_n = min(int(data.disp.size), int(analysis.get("max_width_n", int(data.disp.size))))
    if max_width_n < min_width_n:
        raise HTTPException(status_code=400, detail="Invalid width bounds in analysis config.")

    widths_n = list(range(min_width_n, max_width_n + 1, window_step_n))
    scan = scan_windows(
        disp=data.disp,
        force=data.force,
        min_disp=0.0,
        min_force=0.0,
        widths_n=widths_n,
        window_step_n=window_step_n,
        min_valid_points=min_valid_points,
    )

    score_grid = scan.r2_grid * np.exp(-20.0 * scan.rel_rmse_grid)
    if bool(analysis.get("require_positive_slope", True)):
        score_grid = np.where(scan.slope_grid > 0.0, score_grid, np.nan)
    score_grid = np.where(np.isfinite(score_grid), score_grid, np.nan)

    finite_mask = np.isfinite(score_grid)
    finite_n = int(np.sum(finite_mask))
    total_n = int(score_grid.size)
    nan_n = int(total_n - finite_n)
    finite_per_row = np.sum(finite_mask, axis=1).astype(int)
    rows_nonempty = int(np.sum(finite_per_row > 0))
    rows_sparse = int(np.sum((finite_per_row > 0) & (finite_per_row <= 3)))
    row_min = int(np.min(finite_per_row)) if finite_per_row.size else 0
    row_max = int(np.max(finite_per_row)) if finite_per_row.size else 0
    if finite_n > 0:
        score_min = float(np.nanmin(score_grid))
        score_max = float(np.nanmax(score_grid))
        score_p05 = float(np.nanpercentile(score_grid, 5))
        score_p50 = float(np.nanpercentile(score_grid, 50))
        score_p95 = float(np.nanpercentile(score_grid, 95))
        finite_vals = score_grid[finite_mask]
        finite_abs_max = float(np.max(np.abs(finite_vals))) if finite_vals.size else float("nan")
    else:
        score_min = float("nan")
        score_max = float("nan")
        score_p05 = float("nan")
        score_p50 = float("nan")
        score_p95 = float("nan")
        finite_abs_max = float("nan")
    sample_rows = []
    if finite_per_row.size:
        idxs = [0, max(0, finite_per_row.size // 4), max(0, finite_per_row.size // 2), max(0, (3 * finite_per_row.size) // 4), finite_per_row.size - 1]
        seen = set()
        for i in idxs:
            if i in seen:
                continue
            seen.add(i)
            sample_rows.append(f"{i}:{int(scan.widths_n[i])}pts->{int(finite_per_row[i])}cells")
    print(
        "[heatmap] "
        f"points={int(data.disp.size)} "
        f"width_rows={int(len(scan.widths_n))} "
        f"center_cols={int(len(scan.centers_disp))} "
        f"finite_cells={finite_n}/{total_n} "
        f"nan_cells={nan_n} "
        f"score_min={score_min:.6g} "
        f"score_max={score_max:.6g} "
        f"width_n_range=[{int(scan.widths_n[0])},{int(scan.widths_n[-1])}] "
        f"width_disp_range=[{float(np.nanmin(scan.widths_disp)):.6g},{float(np.nanmax(scan.widths_disp)):.6g}]"
    )
    print(
        "[heatmap] "
        f"score_q05={score_p05:.6g} "
        f"score_q50={score_p50:.6g} "
        f"score_q95={score_p95:.6g} "
        f"score_abs_max={finite_abs_max:.6g} "
        f"rows_nonempty={rows_nonempty}/{len(scan.widths_n)} "
        f"rows_sparse(<=3cells)={rows_sparse} "
        f"row_finite_minmax=[{row_min},{row_max}]"
    )
    if sample_rows:
        print(f"[heatmap] row_samples {' | '.join(sample_rows)}")

    heatmap_obj = {
        "widths_n": [int(v) for v in scan.widths_n],
        "widths_disp": scan.widths_disp.tolist(),
        "centers_disp": scan.centers_disp.tolist(),
        "score_grid": score_grid.tolist(),
        "score_name": "linearity_score",
        "score_formula": "R2 * exp(-20*rel_rmse)",
    }
    return scan, heatmap_obj


def _analyze_text(csv_text: str, io_cfg: dict[str, Any], analysis_cfg: dict[str, Any]) -> tuple[ExtractedData, Any, dict[str, Any]]:
    raw = extract_table_from_text(
        csv_text,
        sep=str(io_cfg.get("sep", ",")),
        quotechar=str(io_cfg.get("quotechar", '"')),
        start_marker=str(io_cfg.get("start_marker", "")),
        skip_lines_after_marker=int(io_cfg.get("skip_lines_after_marker", 0)),
        col_time=int(io_cfg.get("col_time", 0)),
        col_disp=int(io_cfg.get("col_disp", 1)),
        col_force=int(io_cfg.get("col_force", 2)),
    )
    data = preprocess_data(
        raw,
        trim_before_disp=0.0,
        rebase_disp_after_trim=True,
    )
    scan, heatmap = _scan_and_heatmap(data, analysis_cfg)
    return data, scan, heatmap


def _replica_result(sample_name: str, replica_name: str, csv_text: str, io_cfg: dict[str, Any], analysis_cfg: dict[str, Any]) -> dict[str, Any]:
    data, scan, _ = _analyze_text(csv_text, io_cfg, analysis_cfg)
    bw = pick_best_window(
        disp=data.disp,
        scan=scan,
        best_r2_min=0.0,
        best_rel_rmse_max=1e9,
        require_positive_slope=bool(analysis_cfg.get("require_positive_slope", True)),
    )

    out: dict[str, Any] = {
        "sample": sample_name,
        "replica": replica_name,
        "n_points": int(data.disp.size),
        "width_n": None,
        "disp_lo": None,
        "disp_hi": None,
        "slope_n_per_mm": None,
        "intercept_n": None,
        "r2": None,
        "rel_rmse": None,
        "score": None,
        "young_modulus_mpa": None,
    }
    if bw is None:
        return out

    out.update(
        {
            "width_n": int(bw.width_n),
            "disp_lo": float(bw.disp_lo),
            "disp_hi": float(bw.disp_hi),
            "slope_n_per_mm": float(bw.slope_n_per_mm),
            "intercept_n": float(bw.intercept_n),
            "r2": float(bw.r2),
            "rel_rmse": float(bw.rel_rmse),
            "score": float(bw.r2 * math.exp(-20.0 * bw.rel_rmse)),
        }
    )

    area_used = resolve_area_mm2(
        area_mm2=float(analysis_cfg.get("area_mm2", 0.0)),
        diameter_mm=float(analysis_cfg.get("diameter_mm", 0.0)),
    )
    ym = compute_young_modulus(
        disp=data.disp,
        force=data.force,
        bw=bw,
        area_mm2=float(area_used),
        thickness_mm=float(analysis_cfg.get("thickness_mm", 0.0)),
    )
    if ym is not None:
        out["young_modulus_mpa"] = float(ym.young_modulus_mpa)
    return out


def _mean_sem(vals: list[float]) -> tuple[Optional[float], Optional[float], int]:
    arr = np.asarray([v for v in vals if np.isfinite(v)], dtype=float)
    n = int(arr.size)
    if n == 0:
        return None, None, 0
    mean = float(np.mean(arr))
    if n < 2:
        return mean, None, n
    sem = float(np.std(arr, ddof=1) / np.sqrt(n))
    return mean, sem, n


@app.post("/api/analyze-csv")
def analyze_csv(req: AnalyzeCsvRequest) -> dict:
    io_cfg = _merge_cfg(DEFAULT_IO, dict(req.io or {}))
    analysis_cfg = _merge_cfg(DEFAULT_ANALYSIS, dict(req.analysis or {}))
    data, _, heatmap = _analyze_text(req.csv_text, io_cfg, analysis_cfg)

    dsid = str(uuid.uuid4())
    _STATE[dsid] = {"data": data, "heatmap": heatmap, "defaults": analysis_cfg}

    return {
        "dataset_id": dsid,
        "n_points": int(data.disp.size),
        "disp": data.disp.tolist(),
        "force": data.force.tolist(),
        "defaults": analysis_cfg,
        "io": io_cfg,
        "source": {"csv_name": req.csv_name},
        "heatmap": heatmap,
    }


@app.post("/api/project-summary")
def project_summary(req: ProjectSummaryRequest) -> dict:
    io_cfg = _merge_cfg(DEFAULT_IO, dict(req.io or {}))
    analysis_cfg = _merge_cfg(DEFAULT_ANALYSIS, dict(req.analysis or {}))

    replica_rows: list[dict[str, Any]] = []
    sample_stats: list[dict[str, Any]] = []

    for sample in req.samples:
        sample_rows = []
        for rep in sample.replicas:
            row = _replica_result(sample.name, rep.name, rep.csv_text, io_cfg, analysis_cfg)
            replica_rows.append(row)
            sample_rows.append(row)

        young_vals = [float(r["young_modulus_mpa"]) for r in sample_rows if r["young_modulus_mpa"] is not None]
        score_vals = [float(r["score"]) for r in sample_rows if r["score"] is not None]
        r2_vals = [float(r["r2"]) for r in sample_rows if r["r2"] is not None]
        rr_vals = [float(r["rel_rmse"]) for r in sample_rows if r["rel_rmse"] is not None]

        young_mean, young_sem, young_n = _mean_sem(young_vals)
        score_mean, score_sem, score_n = _mean_sem(score_vals)
        r2_mean, r2_sem, r2_n = _mean_sem(r2_vals)
        rr_mean, rr_sem, rr_n = _mean_sem(rr_vals)

        sample_stats.append(
            {
                "sample": sample.name,
                "n_replicas": int(len(sample_rows)),
                "young_modulus_mpa_mean": young_mean,
                "young_modulus_mpa_sem": young_sem,
                "young_n": young_n,
                "score_mean": score_mean,
                "score_sem": score_sem,
                "score_n": score_n,
                "r2_mean": r2_mean,
                "r2_sem": r2_sem,
                "r2_n": r2_n,
                "rel_rmse_mean": rr_mean,
                "rel_rmse_sem": rr_sem,
                "rel_rmse_n": rr_n,
            }
        )

    return {
        "replica_rows": replica_rows,
        "sample_stats": sample_stats,
        "n_samples": int(len(req.samples)),
        "n_replicas": int(len(replica_rows)),
    }


@app.post("/api/metrics")
def metrics(req: MetricsRequest) -> dict:
    obj = _STATE.get(req.dataset_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="Unknown dataset_id. Reload data.")
    data: ExtractedData = obj["data"]

    n = int(data.disp.size)
    lo, hi = _window_bounds(n, req.center_idx, req.width_n)

    x = data.disp[lo:hi]
    y = data.force[lo:hi]

    mask = np.isfinite(x) & np.isfinite(y)
    x2 = x[mask]
    y2 = y[mask]

    slope = None
    intercept = None
    r2_linear = None
    rel_rmse = None
    n_valid = int(x2.size)
    if x2.size >= req.min_valid_points:
        k, b, r2_v, rr_v = fit_linear_force_disp(x2, y2)
        slope = float(k)
        intercept = float(b)
        r2_linear = float(r2_v)
        rel_rmse = float(rr_v)

    area_used = resolve_area_mm2(area_mm2=req.area_mm2, diameter_mm=req.diameter_mm)
    young_mpa = None
    slope_n_per_mm = None
    r2_for_young = None
    if x.size >= 3 and area_used > 0 and req.thickness_mm > 0:
        bw = BestWindow(
            width_n=int(hi - lo),
            center_disp=float(data.disp[int(np.clip(req.center_idx, 0, n - 1))]),
            disp_lo=float(data.disp[lo]),
            disp_hi=float(data.disp[hi - 1]),
            slope_n_per_mm=float(slope) if slope is not None else float("nan"),
            intercept_n=float(intercept) if intercept is not None else float("nan"),
            r2=float(r2_linear) if r2_linear is not None else float("nan"),
            rel_rmse=float(rel_rmse) if rel_rmse is not None else float("nan"),
        )
        ym = compute_young_modulus(
            disp=data.disp,
            force=data.force,
            bw=bw,
            area_mm2=float(area_used),
            thickness_mm=float(req.thickness_mm),
        )
        if ym is not None:
            young_mpa = float(ym.young_modulus_mpa)
            slope_n_per_mm = float(ym.slope_n_per_mm)
            r2_for_young = float(ym.r2_linear)

    return {
        "window": {
            "lo_idx": int(lo),
            "hi_idx": int(hi),
            "n_points": int(hi - lo),
            "disp_lo": float(data.disp[lo]),
            "disp_hi": float(data.disp[hi - 1]),
        },
        "linear_fit": {
            "slope_n_per_mm": slope,
            "intercept_n": intercept,
            "r2": r2_linear,
            "rel_rmse": rel_rmse,
            "n_valid_points": n_valid,
        },
        "young_modulus": {
            "young_modulus_mpa": young_mpa,
            "slope_n_per_mm": slope_n_per_mm,
            "r2_linear": r2_for_young,
            "area_mm2_used": float(area_used),
            "thickness_mm": float(req.thickness_mm),
        },
    }


@app.post("/api/domains")
def domains(req: DomainsRequest) -> dict:
    obj = _STATE.get(req.dataset_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="Unknown dataset_id. Reload data.")
    data: ExtractedData = obj["data"]
    hm = obj["heatmap"]

    grid = np.asarray(hm["score_grid"], dtype=float)
    widths_n = np.asarray(hm["widths_n"], dtype=int)
    centers_disp = np.asarray(hm["centers_disp"], dtype=float)
    valid = np.isfinite(grid) & (grid >= float(req.min_score))
    h, w = valid.shape

    labels = -np.ones((h, w), dtype=int)
    components: list[list[tuple[int, int]]] = []
    nbrs = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

    for r in range(h):
        for c in range(w):
            if not valid[r, c] or labels[r, c] >= 0:
                continue
            cid = len(components)
            stack = [(r, c)]
            labels[r, c] = cid
            cells: list[tuple[int, int]] = []
            while stack:
                rr, cc = stack.pop()
                cells.append((rr, cc))
                for dr, dc in nbrs:
                    r2 = rr + dr
                    c2 = cc + dc
                    if r2 < 0 or r2 >= h or c2 < 0 or c2 >= w:
                        continue
                    if (not valid[r2, c2]) or labels[r2, c2] >= 0:
                        continue
                    labels[r2, c2] = cid
                    stack.append((r2, c2))
            components.append(cells)

    total_valid = int(np.sum(valid))
    area_used = resolve_area_mm2(area_mm2=float(req.area_mm2), diameter_mm=float(req.diameter_mm))

    out_domains = []
    for i, cells in enumerate(components):
        scores = np.asarray([grid[r, c] for r, c in cells], dtype=float)
        n_cells = int(len(cells))
        score_mean = float(np.mean(scores))
        max_local = int(np.argmax(scores))
        rr, cc = cells[max_local]
        score_max = float(scores[max_local])
        center_disp = float(centers_disp[cc])
        center_idx = _nearest_index(data.disp, center_disp)
        width_n = int(widths_n[rr])
        lo, hi = _window_bounds(int(data.disp.size), center_idx, width_n)

        xw = data.disp[lo:hi]
        yw = data.force[lo:hi]
        slope = None
        intercept = None
        r2 = None
        rel_rmse = None
        if xw.size >= 3:
            k, b, r2v, rrv = fit_linear_force_disp(xw, yw)
            slope = float(k)
            intercept = float(b)
            r2 = float(r2v)
            rel_rmse = float(rrv)

        ym = None
        if area_used > 0 and float(req.thickness_mm) > 0:
            bw = BestWindow(
                width_n=int(hi - lo),
                center_disp=float(data.disp[center_idx]),
                disp_lo=float(data.disp[lo]),
                disp_hi=float(data.disp[hi - 1]),
                slope_n_per_mm=float(slope) if slope is not None else float("nan"),
                intercept_n=float(intercept) if intercept is not None else float("nan"),
                r2=float(r2) if r2 is not None else float("nan"),
                rel_rmse=float(rel_rmse) if rel_rmse is not None else float("nan"),
            )
            ym = compute_young_modulus(
                disp=data.disp,
                force=data.force,
                bw=bw,
                area_mm2=float(area_used),
                thickness_mm=float(req.thickness_mm),
            )

        out_domains.append(
            {
                "id": int(i),
                "n_cells": n_cells,
                "population_fraction": (float(n_cells) / float(total_valid)) if total_valid > 0 else 0.0,
                "score_mean": score_mean,
                "score_max": score_max,
                "representative": {
                    "row": int(rr),
                    "col": int(cc),
                    "width_n": width_n,
                    "center_disp": center_disp,
                    "center_idx": int(center_idx),
                    "disp_lo": float(data.disp[lo]),
                    "disp_hi": float(data.disp[hi - 1]),
                    "n_points": int(hi - lo),
                    "slope_n_per_mm": slope,
                    "intercept_n": intercept,
                    "r2": r2,
                    "rel_rmse": rel_rmse,
                },
                "young_modulus_mpa": (float(ym.young_modulus_mpa) if ym is not None else None),
                "cells": [[int(r), int(c)] for r, c in cells],
            }
        )

    out_domains.sort(key=lambda d: (-d["n_cells"], -d["score_mean"], -d["score_max"]))
    best = out_domains[0] if out_domains else None

    return {
        "threshold": float(req.min_score),
        "n_domains": int(len(out_domains)),
        "total_valid_cells": total_valid,
        "best_domain_id": (best["id"] if best is not None else None),
        "domains": out_domains,
        "ranking": "n_cells desc, score_mean desc, score_max desc",
    }


@app.post("/api/release-dataset")
def release_dataset(req: ReleaseDatasetRequest) -> dict:
    _STATE.pop(req.dataset_id, None)
    return {"ok": True}
