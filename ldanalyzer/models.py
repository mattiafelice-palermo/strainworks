from __future__ import annotations

from dataclasses import dataclass
from typing import List

import numpy as np


@dataclass
class ExtractedData:
    time: np.ndarray
    disp: np.ndarray
    force: np.ndarray


@dataclass
class ScanResult:
    widths_n: List[int]
    widths_disp: np.ndarray
    centers_disp: np.ndarray
    slope_grid: np.ndarray
    intercept_grid: np.ndarray
    r2_grid: np.ndarray
    rel_rmse_grid: np.ndarray


@dataclass
class BestWindow:
    width_n: int
    center_disp: float
    disp_lo: float
    disp_hi: float
    slope_n_per_mm: float
    intercept_n: float
    r2: float
    rel_rmse: float


@dataclass
class YoungModulusResult:
    slope_n_per_mm: float
    intercept_n: float
    r2_linear: float
    young_modulus_mpa: float
    area_mm2: float
    thickness_mm: float
    n_points: int
