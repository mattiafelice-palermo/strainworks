from __future__ import annotations

from pathlib import Path
from typing import List, Optional

import numpy as np

from .common import die
from .models import ExtractedData


def _split_csv_line(line: str, sep: str, quotechar: str) -> List[str]:
    out: List[str] = []
    cur: List[str] = []
    in_q = False
    i = 0
    while i < len(line):
        ch = line[i]
        if ch == quotechar:
            in_q = not in_q
            i += 1
            continue
        if (not in_q) and ch == sep:
            out.append("".join(cur).strip())
            cur = []
            i += 1
            continue
        cur.append(ch)
        i += 1
    out.append("".join(cur).strip())
    return out


def extract_table_from_csv(
    csv_path: Path,
    *,
    encoding: str,
    sep: str,
    quotechar: str,
    start_marker: str,
    skip_lines_after_marker: int,
    col_time: int,
    col_disp: int,
    col_force: int,
) -> ExtractedData:
    text = csv_path.read_text(encoding=encoding, errors="replace")
    return extract_table_from_text(
        text,
        sep=sep,
        quotechar=quotechar,
        start_marker=start_marker,
        skip_lines_after_marker=skip_lines_after_marker,
        col_time=col_time,
        col_disp=col_disp,
        col_force=col_force,
    )


def extract_table_from_text(
    text: str,
    *,
    sep: str,
    quotechar: str,
    start_marker: str,
    skip_lines_after_marker: int,
    col_time: int,
    col_disp: int,
    col_force: int,
) -> ExtractedData:
    lines = text.splitlines()

    start_idx = None
    for i, line in enumerate(lines):
        if line.strip() == start_marker.strip():
            start_idx = i
            break
    if start_idx is None:
        die(f"Could not find start_marker line: {start_marker!r}")

    data_start = start_idx + skip_lines_after_marker
    if data_start >= len(lines):
        die("start_marker found but data_start is beyond file end. Check skip_lines_after_marker.")

    t_list: List[float] = []
    x_list: List[float] = []
    f_list: List[float] = []

    for line in lines[data_start:]:
        s = line.strip()
        if not s:
            continue
        if s.lower().startswith("tabla"):
            break

        parts = _split_csv_line(s, sep=sep, quotechar=quotechar)
        if max(col_time, col_disp, col_force) >= len(parts):
            continue

        def to_float(val: str) -> Optional[float]:
            v = val.strip()
            if not v:
                return None
            try:
                return float(v)
            except Exception:
                try:
                    return float(v.replace(",", "."))
                except Exception:
                    return None

        tt = to_float(parts[col_time])
        xx = to_float(parts[col_disp])
        ff = to_float(parts[col_force])
        if tt is None or xx is None or ff is None:
            continue

        t_list.append(tt)
        x_list.append(xx)
        f_list.append(ff)

    if len(x_list) < 5:
        die(f"Parsed too few data rows ({len(x_list)}). Check marker/columns/separator/encoding.")

    time = np.asarray(t_list, dtype=float)
    disp = np.asarray(x_list, dtype=float)
    force = np.asarray(f_list, dtype=float)

    order = np.argsort(disp)
    return ExtractedData(time=time[order], disp=disp[order], force=force[order])


def preprocess_data(
    data: ExtractedData,
    *,
    trim_before_disp: float,
    rebase_disp_after_trim: bool,
) -> ExtractedData:
    disp = data.disp
    force = data.force
    time = data.time

    if trim_before_disp > float(np.min(disp)):
        keep = disp >= trim_before_disp
        if not np.any(keep):
            die("analysis.trim_before_disp removed all data points.")
        disp = disp[keep]
        force = force[keep]
        time = time[keep]

    if rebase_disp_after_trim and disp.size > 0:
        disp = disp - float(disp[0])

    if disp.size < 5:
        die("Too few points left after preprocessing.")

    return ExtractedData(time=time, disp=disp, force=force)
