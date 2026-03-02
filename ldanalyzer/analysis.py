from __future__ import annotations

import math
from typing import List, Optional, Tuple

import numpy as np

from .common import die
from .models import BestWindow, ScanResult, YoungModulusResult


def fit_linear_force_disp(x: np.ndarray, y: np.ndarray) -> Tuple[float, float, float, float]:
    """Fit y = b + k*x and return (k, b, r2, rel_rmse)."""
    A = np.vstack([np.ones_like(x), x]).T
    coef, *_ = np.linalg.lstsq(A, y, rcond=None)
    b, k = float(coef[0]), float(coef[1])
    yhat = A @ coef
    ss_res = float(np.sum((y - yhat) ** 2))
    ss_tot = float(np.sum((y - float(np.mean(y))) ** 2))
    r2 = 1.0 - ss_res / ss_tot if ss_tot > 0 else float("nan")
    rmse = float(np.sqrt(np.mean((y - yhat) ** 2)))
    y_span = float(np.max(y) - np.min(y))
    rel_rmse = rmse / y_span if y_span > 0 else float("nan")
    return k, b, r2, rel_rmse


def scan_windows(
    disp: np.ndarray,
    force: np.ndarray,
    *,
    min_disp: float,
    min_force: float,
    widths_n: List[int],
    window_step_n: int,
    min_valid_points: int,
) -> ScanResult:
    n = len(disp)
    widths_n = sorted(int(w) for w in widths_n if int(w) >= 3)
    if not widths_n:
        die("No valid window widths generated. Check min_width_n/max_width_n/window_step_n.")
    if window_step_n < 1:
        die("analysis.window_step_n must be >= 1")

    centers_idx = np.arange(0, n, window_step_n, dtype=int)
    centers_disp = disp[centers_idx]

    slope_grid = np.full((len(widths_n), len(centers_idx)), np.nan, dtype=float)
    intercept_grid = np.full_like(slope_grid, np.nan)
    r2_grid = np.full_like(slope_grid, np.nan)
    rel_rmse_grid = np.full_like(slope_grid, np.nan)
    widths_disp = np.full((len(widths_n),), np.nan, dtype=float)

    for iw, w in enumerate(widths_n):
        half = w // 2
        spans: List[float] = []
        for ic, c in enumerate(centers_idx):
            lo = c - half
            hi = c + half + (0 if (w % 2 == 0) else 1)
            if lo < 0 or hi > n:
                continue

            spans.append(float(disp[hi - 1] - disp[lo]))
            x = disp[lo:hi]
            y = force[lo:hi]

            m = (x >= min_disp) & (y >= min_force)
            x2 = x[m]
            y2 = y[m]
            if x2.size < min_valid_points:
                continue

            k, b, r2, rel_rmse = fit_linear_force_disp(x2, y2)
            slope_grid[iw, ic] = k
            intercept_grid[iw, ic] = b
            r2_grid[iw, ic] = r2
            rel_rmse_grid[iw, ic] = rel_rmse

        if spans:
            widths_disp[iw] = float(np.median(np.asarray(spans, dtype=float)))

    return ScanResult(
        widths_n=widths_n,
        widths_disp=widths_disp,
        centers_disp=centers_disp,
        slope_grid=slope_grid,
        intercept_grid=intercept_grid,
        r2_grid=r2_grid,
        rel_rmse_grid=rel_rmse_grid,
    )


def pick_best_window(
    disp: np.ndarray,
    scan: ScanResult,
    *,
    best_r2_min: float,
    best_rel_rmse_max: float,
    require_positive_slope: bool,
) -> Optional[BestWindow]:
    centers_idx = np.searchsorted(disp, scan.centers_disp)
    centers_idx = np.clip(centers_idx, 0, len(disp) - 1)

    slope = scan.slope_grid
    intercept = scan.intercept_grid
    rel_rmse = scan.rel_rmse_grid
    r2 = scan.r2_grid

    ok = np.isfinite(rel_rmse) & np.isfinite(r2) & np.isfinite(slope) & np.isfinite(intercept)
    if require_positive_slope:
        ok = ok & (slope > 0)

    strict = ok & (r2 >= best_r2_min) & (rel_rmse <= best_rel_rmse_max)
    if np.any(strict):
        idx = np.argwhere(strict)
        best = None
        for iw, ic in idx:
            score = (rel_rmse[iw, ic], -r2[iw, ic], -scan.widths_n[iw])
            if best is None or score < best[0]:
                best = (score, iw, ic)
        assert best is not None
        _, iw, ic = best
    else:
        relaxed = ok & (r2 >= best_r2_min)
        use = relaxed if np.any(relaxed) else ok
        if not np.any(use):
            return None
        idx = np.argwhere(use)
        best = None
        for iw, ic in idx:
            score = (rel_rmse[iw, ic], -r2[iw, ic], -scan.widths_n[iw])
            if best is None or score < best[0]:
                best = (score, iw, ic)
        assert best is not None
        _, iw, ic = best

    w = scan.widths_n[iw]
    cidx = int(centers_idx[ic])
    half = w // 2
    lo = max(cidx - half, 0)
    hi = min(cidx + half + (0 if (w % 2 == 0) else 1), len(disp))

    return BestWindow(
        width_n=w,
        center_disp=float(scan.centers_disp[ic]),
        disp_lo=float(disp[lo]),
        disp_hi=float(disp[hi - 1]),
        slope_n_per_mm=float(slope[iw, ic]),
        intercept_n=float(intercept[iw, ic]),
        r2=float(r2[iw, ic]),
        rel_rmse=float(rel_rmse[iw, ic]),
    )


def compute_young_modulus(
    disp: np.ndarray,
    force: np.ndarray,
    bw: BestWindow,
    *,
    area_mm2: float,
    thickness_mm: float,
) -> Optional[YoungModulusResult]:
    if area_mm2 <= 0 or thickness_mm <= 0:
        return None

    m = (disp >= bw.disp_lo) & (disp <= bw.disp_hi)
    x = disp[m]
    y = force[m]
    if x.size < 3:
        return None

    k, b, r2, _ = fit_linear_force_disp(x, y)
    e_mpa = k * thickness_mm / area_mm2
    return YoungModulusResult(
        slope_n_per_mm=float(k),
        intercept_n=float(b),
        r2_linear=float(r2),
        young_modulus_mpa=float(e_mpa),
        area_mm2=float(area_mm2),
        thickness_mm=float(thickness_mm),
        n_points=int(x.size),
    )


def resolve_area_mm2(*, area_mm2: float, diameter_mm: float) -> float:
    # Prefer explicitly provided area; only fall back to diameter-derived area.
    if area_mm2 > 0:
        return float(area_mm2)
    if diameter_mm > 0:
        return float(math.pi * (diameter_mm ** 2) / 4.0)
    return 0.0
