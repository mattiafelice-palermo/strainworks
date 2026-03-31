const state = {
  project: null,
  datasetId: null,
  loadedSampleId: null,
  loadedReplicaId: null,
  maxModePrev: 'global',
  toeModePrev: 'global',
  disp: [],
  force: [],
  d2: null,
  heatmap: null,
  domains: [],
  lo: 0,
  hi: 0,
  plotMeta: null,
  heatmapMeta: null,
  drag: null,
  suppressPlotClickOnce: false,
  replicaDataCache: {},
  loadingReplicaKey: null,
  summaryData: { replicaRows: [], sampleRows: [] },
  metricExplorer: {
    current: {
      metric_key: 'young_modulus_mpa',
      style: 'dot',
      sort: 'original',
      y_zero: true,
      show_grid: true,
      show_labels: false,
      use_global_font_size: true,
      global_font_size_px: 14,
      font_family: 'Arial, sans-serif',
      tick_font_size_px: 12,
      title_font_size_px: 17,
      axis_title_font_size_px: 14,
      title_text: null,
      x_axis_label: 'Sample',
      y_axis_label: null,
      plot_width_px: 760,
      plot_height_px: 570,
    },
    pinned: [],
    active_pin_id: null,
  },
  metricExplorerResize: null,
  summaryPlotResize: null,
  summaryPlotData: null,
  summaryLegendExpanded: false,
  summaryPlotSize: { w: 900, h: 540 },
  summaryPlotStyle: {
    use_global_font_size: true,
    global_font_size_px: 14,
    font_family: 'Arial, sans-serif',
    tick_font_size_px: 12,
    title_font_size_px: 18,
    axis_title_font_size_px: 14,
    title_text: 'All Load-Displacement Curves',
    x_axis_label: null,
    y_axis_label: null,
  },
  precomputeQueue: [],
  precomputeQueueRunning: false,
  curveWarmupRunning: false,
  projectSaveHandle: null,
  projectSaveName: '',
  projectSaveDir: '',
  projectAutosaveEnabled: false,
  projectAutosaveTimer: null,
  projectAutosaveBusy: false,
  projectAutosaveHistory: [],
  projectAutosaveStatus: {
    kind: 'off',
    last_saved_at: null,
    message: 'Autosave off',
    dots_idx: 0,
    anim_timer: null,
  },
  projectLastSavedAt: null,
  projectLastSavedBytes: null,
  projectLastChangedAt: null,
  projectDirty: false,
  projectSchemaVersion: 1,
  projectBuildVersion: '20260302-39',
  heatmapDrawRetryTimer: null,
  sampleColorPicker: {
    open: false,
    sample_id: null,
    h: 0,
    s: 0,
    l: 72,
    dragging: false,
  },
};

const els = {
  appSidebar: document.getElementById('appSidebar'),
  appSidebarToggle: document.getElementById('appSidebarToggle'),
  tabBtns: Array.from(document.querySelectorAll('.tabBtn')),
  tabPanes: Array.from(document.querySelectorAll('.tabPane')),

  io_sep: document.getElementById('io_sep'),
  io_quotechar: document.getElementById('io_quotechar'),
  io_start_marker: document.getElementById('io_start_marker'),
  io_skip_lines_after_marker: document.getElementById('io_skip_lines_after_marker'),
  io_col_time: document.getElementById('io_col_time'),
  io_col_disp: document.getElementById('io_col_disp'),
  io_col_force: document.getElementById('io_col_force'),
  io_parse_geom_from_filename: document.getElementById('io_parse_geom_from_filename'),
  io_geom_sep: document.getElementById('io_geom_sep'),
  io_geom_t_label: document.getElementById('io_geom_t_label'),
  io_geom_d_label: document.getElementById('io_geom_d_label'),
  io_geom_a_label: document.getElementById('io_geom_a_label'),

  an_window_step_n: document.getElementById('an_window_step_n'),
  an_min_width_n: document.getElementById('an_min_width_n'),
  an_max_width_n: document.getElementById('an_max_width_n'),
  an_min_valid_points: document.getElementById('an_min_valid_points'),
  an_domain_threshold_default: document.getElementById('an_domain_threshold_default'),
  an_require_positive_slope: document.getElementById('an_require_positive_slope'),
  an_area_mm2: document.getElementById('an_area_mm2'),
  an_diameter_mm: document.getElementById('an_diameter_mm'),
  an_thickness_mm: document.getElementById('an_thickness_mm'),

  newSampleName: document.getElementById('newSampleName'),
  addSampleBtn: document.getElementById('addSampleBtn'),
  expandAllSamplesBtn: document.getElementById('expandAllSamplesBtn'),
  collapseAllSamplesBtn: document.getElementById('collapseAllSamplesBtn'),
  precomputeAllBtn: document.getElementById('precomputeAllBtn'),
  exportProjectBtn: document.getElementById('exportProjectBtn'),
  updateProjectBtn: document.getElementById('updateProjectBtn'),
  projectAutosaveToggle: document.getElementById('projectAutosaveToggle'),
  projectAutosaveStatus: document.getElementById('projectAutosaveStatus'),
  newProjectBtn: document.getElementById('newProjectBtn'),
  importProjectBtn: document.getElementById('importProjectBtn'),
  importProjectInput: document.getElementById('importProjectInput'),
  autoPrecomputeOnUpload: document.getElementById('autoPrecomputeOnUpload'),
  includeHeatmapInExport: document.getElementById('includeHeatmapInExport'),
  precomputeInfo: document.getElementById('precomputeInfo'),
  samplesList: document.getElementById('samplesList'),

  vizSampleSelect: document.getElementById('vizSampleSelect'),
  vizReplicaSelect: document.getElementById('vizReplicaSelect'),
  vizInfo: document.getElementById('vizInfo'),
  domainThreshold: document.getElementById('domainThreshold'),
  domainThresholdValue: document.getElementById('domainThresholdValue'),
  detectDomainsBtn: document.getElementById('detectDomainsBtn'),
  centerSlider: document.getElementById('centerSlider'),
  widthSlider: document.getElementById('widthSlider'),
  centerLabel: document.getElementById('centerLabel'),
  widthLabel: document.getElementById('widthLabel'),
  plotUseStressStrain: document.getElementById('plotUseStressStrain'),
  maxMode: document.getElementById('maxMode'),
  maxWindowControls: document.getElementById('maxWindowControls'),
  maxPointControls: document.getElementById('maxPointControls'),
  maxCenterSlider: document.getElementById('maxCenterSlider'),
  maxWidthSlider: document.getElementById('maxWidthSlider'),
  maxPointSlider: document.getElementById('maxPointSlider'),
  maxCenterLabel: document.getElementById('maxCenterLabel'),
  maxWidthLabel: document.getElementById('maxWidthLabel'),
  maxPointLabel: document.getElementById('maxPointLabel'),
  showD2: document.getElementById('showD2'),
  toeEnabled: document.getElementById('toeEnabled'),
  hideBeforeToe: document.getElementById('hideBeforeToe'),
  toeMode: document.getElementById('toeMode'),
  toePointControls: document.getElementById('toePointControls'),
  toePointSlider: document.getElementById('toePointSlider'),
  toePointLabel: document.getElementById('toePointLabel'),
  metrics: document.getElementById('metrics'),

  domainsPanel: document.getElementById('domainsPanel'),
  domainsSummary: document.getElementById('domainsSummary'),
  toggleDomainsBtn: document.getElementById('toggleDomainsBtn'),
  domainsTbody: document.getElementById('domainsTbody'),

  plotCanvas: document.getElementById('plotCanvas'),
  heatmapPlot: document.getElementById('heatmapPlot'),
  heatmapCanvas: document.getElementById('heatmapCanvas'),

  summaryInfo: document.getElementById('summaryInfo'),
  exportReplicaCsvBtn: document.getElementById('exportReplicaCsvBtn'),
  exportSampleCsvBtn: document.getElementById('exportSampleCsvBtn'),
  exportSummaryExcelBtn: document.getElementById('exportSummaryExcelBtn'),
  downloadSummaryPlotSvgBtn: document.getElementById('downloadSummaryPlotSvgBtn'),
  downloadSummaryPlotCsvBtn: document.getElementById('downloadSummaryPlotCsvBtn'),
  downloadSummaryPlotZipBtn: document.getElementById('downloadSummaryPlotZipBtn'),
  summaryShowToeRegion: document.getElementById('summaryShowToeRegion'),
  summaryUseStressStrain: document.getElementById('summaryUseStressStrain'),
  summaryUseSampleAverage: document.getElementById('summaryUseSampleAverage'),
  summaryShowAverageShadow: document.getElementById('summaryShowAverageShadow'),
  summaryLineWidth: document.getElementById('summaryLineWidth'),
  summaryLineWidthValue: document.getElementById('summaryLineWidthValue'),
  summaryFontFamily: document.getElementById('summaryFontFamily'),
  summaryUseGlobalFontSize: document.getElementById('summaryUseGlobalFontSize'),
  summaryGlobalFontSize: document.getElementById('summaryGlobalFontSize'),
  summaryTickFontSize: document.getElementById('summaryTickFontSize'),
  summaryTitleFontSize: document.getElementById('summaryTitleFontSize'),
  summaryAxisTitleFontSize: document.getElementById('summaryAxisTitleFontSize'),
  summaryTitleText: document.getElementById('summaryTitleText'),
  summaryXAxisLabel: document.getElementById('summaryXAxisLabel'),
  summaryYAxisLabel: document.getElementById('summaryYAxisLabel'),
  summaryLegendTab: document.getElementById('summaryLegendTab'),
  summaryPlotWrap: document.getElementById('summaryPlotWrap'),
  summaryPlotResizeRight: document.getElementById('summaryPlotResizeRight'),
  summaryPlotResizeBottom: document.getElementById('summaryPlotResizeBottom'),
  summaryShowFitDetails: document.getElementById('summaryShowFitDetails'),
  replicaHeadRow: document.getElementById('replicaHeadRow'),
  sampleHeadRow: document.getElementById('sampleHeadRow'),
  metricExplorerMetric: document.getElementById('metricExplorerMetric'),
  metricExplorerStyle: document.getElementById('metricExplorerStyle'),
  metricExplorerSort: document.getElementById('metricExplorerSort'),
  metricExplorerZeroY: document.getElementById('metricExplorerZeroY'),
  metricExplorerShowGrid: document.getElementById('metricExplorerShowGrid'),
  metricExplorerShowLabels: document.getElementById('metricExplorerShowLabels'),
  metricExplorerFontFamily: document.getElementById('metricExplorerFontFamily'),
  metricExplorerUseGlobalFontSize: document.getElementById('metricExplorerUseGlobalFontSize'),
  metricExplorerGlobalFontSize: document.getElementById('metricExplorerGlobalFontSize'),
  metricExplorerTickFontSize: document.getElementById('metricExplorerTickFontSize'),
  metricExplorerTitleFontSize: document.getElementById('metricExplorerTitleFontSize'),
  metricExplorerAxisTitleFontSize: document.getElementById('metricExplorerAxisTitleFontSize'),
  metricExplorerTitleText: document.getElementById('metricExplorerTitleText'),
  metricExplorerXAxisLabel: document.getElementById('metricExplorerXAxisLabel'),
  metricExplorerYAxisLabel: document.getElementById('metricExplorerYAxisLabel'),
  metricExplorerDownloadSvgBtn: document.getElementById('metricExplorerDownloadSvgBtn'),
  metricExplorerDownloadCsvBtn: document.getElementById('metricExplorerDownloadCsvBtn'),
  newMetricPlotBtn: document.getElementById('newMetricPlotBtn'),
  updateMetricPlotBtn: document.getElementById('updateMetricPlotBtn'),
  metricExplorerPlotWrap: document.getElementById('metricExplorerPlotWrap'),
  metricExplorerResizeRight: document.getElementById('metricExplorerResizeRight'),
  metricExplorerResizeBottom: document.getElementById('metricExplorerResizeBottom'),
  metricExplorerPlot: document.getElementById('metricExplorerPlot'),
  pinnedMetricPlots: document.getElementById('pinnedMetricPlots'),
  summaryPlot: document.getElementById('summaryPlot'),
  replicaTbody: document.getElementById('replicaTbody'),
  sampleTbody: document.getElementById('sampleTbody'),
  sampleColorPickerPopover: document.getElementById('sampleColorPickerPopover'),
  sampleColorPickerSurface: document.getElementById('sampleColorPickerSurface'),
  sampleColorPickerLightness: document.getElementById('sampleColorPickerLightness'),
  sampleColorPickerHex: document.getElementById('sampleColorPickerHex'),
  sampleColorPickerApplyBtn: document.getElementById('sampleColorPickerApplyBtn'),
  sampleColorPickerCancelBtn: document.getElementById('sampleColorPickerCancelBtn'),
  projectInfoContent: document.getElementById('projectInfoContent'),
};

const SUMMARY_METRIC_COLUMNS = [
  { key: 'score', label: 'Score', display_decimals: 4, optional_fit: true },
  { key: 'r2', label: 'R2', display_decimals: 4, optional_fit: true },
  { key: 'rel_rmse', label: 'relRMSE', display_decimals: 4, optional_fit: true },
  { key: 'young_modulus_mpa', label: 'E (MPa)', display_decimals: 2 },
  { key: 'thickness_mm', label: 'Thickness (mm)', display_decimals: 2 },
  { key: 'area_cm2', label: 'Area (cm2)', display_decimals: 2 },
  { key: 'compressive_strength_n', label: 'Fmax (N)', display_decimals: 2 },
  { key: 'compressive_disp_mm', label: 'Fmax disp from toe (mm)', display_decimals: 2 },
  { key: 'compressive_pressure_mpa', label: 'P@Fmax (MPa)', display_decimals: 2 },
  { key: 'strain_to_fmax_pct', label: 'Strain to Fmax (%)', display_decimals: 1 },
  { key: 'compressive_energy_mj', label: 'Energy to Fmax (mJ)', display_decimals: 1 },
  { key: 'energy_density_mj_per_cm3', label: 'Energy density (mJ/cm3)', display_decimals: 1 },
  { key: 'toe_disp_mm', label: 'Toe disp (mm)', display_decimals: 2 },
  { key: 'toe_force_mn', label: 'Toe force (mN)', display_decimals: 0 },
];

const METRIC_EXPLORER_METRICS = [
  { key: 'young_modulus_mpa', label: 'Young modulus E', unit: 'MPa' },
  { key: 'compressive_strength_n', label: 'Max compressive strength (Fmax)', unit: 'N' },
  { key: 'compressive_disp_mm', label: 'Displacement at Fmax from toe', unit: 'mm' },
  { key: 'compressive_pressure_mpa', label: 'Pressure at Fmax', unit: 'MPa' },
  { key: 'strain_to_fmax_pct', label: 'Strain to Fmax', unit: '%' },
  { key: 'compressive_energy_mj', label: 'Energy to Fmax', unit: 'mJ' },
  { key: 'energy_density_mj_per_cm3', label: 'Energy density at Fmax', unit: 'mJ/cm3' },
  { key: 'toe_disp_mm', label: 'Toe-end displacement', unit: 'mm' },
  { key: 'toe_force_mn', label: 'Toe-end force', unit: 'mN' },
];
const METRIC_EXPLORER_METRIC_BY_KEY = Object.fromEntries(METRIC_EXPLORER_METRICS.map((m) => [m.key, m]));
const SAMPLE_PASTEL_PALETTE = [
  '#7fa8dd',
  '#84c7ad',
  '#d3a56d',
  '#a99ad9',
  '#d58ea5',
  '#8cc1c8',
  '#b7a07a',
  '#9abf84',
  '#8ea9c9',
  '#c79ac0',
];

function applyAnalysisSettingTooltips() {
  const tips = {
    an_window_step_n: 'Sampling step (points) used for window centers and tested widths in the scan.',
    an_min_width_n: 'Smallest window width (points) tested in the linear-fit heatmap scan.',
    an_max_width_n: 'Largest window width (points) tested in the linear-fit heatmap scan.',
    an_min_valid_points: 'Minimum finite points required for a window fit to be accepted.',
    an_domain_threshold_default: 'Default threshold used to segment contiguous domains in score heatmaps.',
    an_area_mm2: 'Global area (mm^2). If set, it takes priority over diameter because it works for any geometry.',
    an_diameter_mm: 'Global diameter (mm) for disc specimens. Used only when no area is provided.',
    an_thickness_mm: 'Global sample thickness fallback (mm); used in stress/strain and Young modulus calculations.',
    an_require_positive_slope: 'Rejects windows with non-positive fitted slope in scan/best-window selection.',
  };

  for (const [id, text] of Object.entries(tips)) {
    const el = document.getElementById(id);
    if (!el) continue;
    const label = el.closest('label');
    if (!label) continue;
    label.title = text;
  }
}

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function format(x, digits = 6) {
  if (x === null || x === undefined || Number.isNaN(x)) return 'n/a';
  return Number(x).toPrecision(digits);
}

function formatMeanSem(mean, sem, meanDigits = 6, semDigits = 4) {
  const m = format(mean, meanDigits);
  if (sem === null || sem === undefined || Number.isNaN(sem)) return m;
  return `${m} +- ${format(sem, semDigits)}`;
}

function formatFixed(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return 'n/a';
  return Number(value).toFixed(Math.max(0, Number(decimals) || 0));
}

function formatMeanSemFixed(mean, sem, decimals = 2) {
  const m = formatFixed(mean, decimals);
  if (sem === null || sem === undefined || Number.isNaN(Number(sem))) return m;
  return `${m} +- ${formatFixed(sem, decimals)}`;
}

function finiteNum(v, fallback = 0) {
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

function reflectIndex(i, n) {
  if (n <= 1) return 0;
  let k = i;
  while (k < 0 || k >= n) {
    if (k < 0) k = -k - 1;
    if (k >= n) k = 2 * n - 1 - k;
  }
  return k;
}

function convolve1dReflect(y, kernel, radius) {
  const n = y.length;
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = -radius; k <= radius; k++) {
      const kk = reflectIndex(i + k, n);
      s += y[kk] * kernel[k + radius];
    }
    out[i] = s;
  }
  return out;
}

function gaussianKernel1d(sigmaPts, truncate = 3.0) {
  const s = Math.max(0.5, Number(sigmaPts));
  const radius = Math.max(1, Math.ceil(truncate * s));
  const kernel = new Array(2 * radius + 1);
  let sum = 0;
  for (let k = -radius; k <= radius; k++) {
    const v = Math.exp(-0.5 * (k / s) ** 2);
    kernel[k + radius] = v;
    sum += v;
  }
  for (let i = 0; i < kernel.length; i++) kernel[i] /= sum;
  return { kernel, radius };
}

function gaussianSecondDerivativeKernel1d(sigmaPts, truncate = 3.0) {
  const s = Math.max(0.5, Number(sigmaPts));
  const radius = Math.max(1, Math.ceil(truncate * s));
  const kernel = new Array(2 * radius + 1);
  for (let k = -radius; k <= radius; k++) {
    const kk = k / s;
    const g = Math.exp(-0.5 * kk * kk);
    kernel[k + radius] = ((k * k - s * s) / (s ** 4)) * g;
  }
  return { kernel, radius };
}

function smoothGaussian(y, sigmaPts) {
  if (!y.length) return [];
  const g = gaussianKernel1d(sigmaPts, 3.0);
  return convolve1dReflect(y, g.kernel, g.radius);
}

function collapseDuplicateDispSorted(disp, force) {
  const pts = [];
  for (let i = 0; i < Math.min(disp.length, force.length); i++) {
    const x = Number(disp[i]);
    const y = Number(force[i]);
    if (Number.isFinite(x) && Number.isFinite(y)) pts.push([x, y]);
  }
  pts.sort((a, b) => a[0] - b[0]);
  if (!pts.length) return { x: [], y: [] };
  const xOut = [];
  const yOut = [];
  let cx = pts[0][0];
  let sum = pts[0][1];
  let cnt = 1;
  for (let i = 1; i < pts.length; i++) {
    const x = pts[i][0];
    const y = pts[i][1];
    if (x === cx) {
      sum += y;
      cnt += 1;
    } else {
      xOut.push(cx);
      yOut.push(sum / cnt);
      cx = x;
      sum = y;
      cnt = 1;
    }
  }
  xOut.push(cx);
  yOut.push(sum / cnt);
  return { x: xOut, y: yOut };
}

function interpolateToUniformGrid(x, y, nGrid) {
  const n = x.length;
  if (n < 2 || nGrid < 2) return { xg: [], yg: [], dx: NaN };
  const x0 = x[0];
  const x1 = x[n - 1];
  const span = x1 - x0;
  if (!(span > 0)) return { xg: [], yg: [], dx: NaN };
  const dx = span / (nGrid - 1);
  const xg = new Array(nGrid);
  const yg = new Array(nGrid);
  let j = 0;
  for (let i = 0; i < nGrid; i++) {
    const xx = x0 + i * dx;
    xg[i] = xx;
    while (j + 1 < n && x[j + 1] < xx) j++;
    if (j + 1 >= n) {
      yg[i] = y[n - 1];
      continue;
    }
    const xa = x[j];
    const xb = x[j + 1];
    const ya = y[j];
    const yb = y[j + 1];
    const t = xb > xa ? (xx - xa) / (xb - xa) : 0;
    yg[i] = ya * (1 - t) + yb * t;
  }
  return { xg, yg, dx };
}

function computeSecondDerivativeSeries(disp, force, sigmaPts = 25) {
  const collapsed = collapseDuplicateDispSorted(disp, force);
  const nUnique = collapsed.x.length;
  if (nUnique < 3) return { x: [], force_smooth: [], d2: [] };
  const grid = interpolateToUniformGrid(collapsed.x, collapsed.y, nUnique);
  if (!grid.xg.length || !Number.isFinite(grid.dx) || grid.dx <= 0) return { x: [], force_smooth: [], d2: [] };
  const smooth = smoothGaussian(grid.yg, sigmaPts);
  const g2 = gaussianSecondDerivativeKernel1d(sigmaPts, 3.0);
  const d2Idx = convolve1dReflect(grid.yg, g2.kernel, g2.radius);
  const d2 = d2Idx.map((v) => v / (grid.dx * grid.dx));
  return { x: grid.xg, force_smooth: smooth, d2 };
}

function niceTicks(minV, maxV, nTicks = 6) {
  let lo = finiteNum(minV, 0);
  let hi = finiteNum(maxV, 1);
  if (hi < lo) [lo, hi] = [hi, lo];
  if (hi === lo) hi = lo + 1;
  const rawStep = (hi - lo) / Math.max(2, nTicks - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(Math.abs(rawStep))));
  const norm = rawStep / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  const start = Math.ceil(lo / step) * step;
  const ticks = [];
  for (let v = start; v <= hi + 0.5 * step; v += step) ticks.push(v);
  return ticks;
}

function toFiniteOrNull(v) {
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
}

function optionalFiniteNumber(v) {
  if (v === null || v === undefined) return null;
  if (typeof v === 'string' && !v.trim()) return null;
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
}

function clamp01(v) {
  return clamp(Number(v), 0, 1);
}

function normalizeHexColor(v, fallback = '#a9d0f5') {
  const s = String(v || '').trim();
  const m = s.match(/^#?([0-9a-fA-F]{6})$/);
  if (!m) return fallback;
  return `#${m[1].toLowerCase()}`;
}

function hexToRgb(hex) {
  const h = normalizeHexColor(hex, '#000000');
  return {
    r: Number.parseInt(h.slice(1, 3), 16),
    g: Number.parseInt(h.slice(3, 5), 16),
    b: Number.parseInt(h.slice(5, 7), 16),
  };
}

function rgbToHex(r, g, b) {
  const toHex = (x) => clamp(Math.round(Number(x)), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r, g, b) {
  const rn = clamp01(r / 255);
  const gn = clamp01(g / 255);
  const bn = clamp01(b / 255);
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const l = (max + min) / 2;
  let s = 0;
  if (d > 1e-12) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = 60 * (((gn - bn) / d) % 6);
    else if (max === gn) h = 60 * (((bn - rn) / d) + 2);
    else h = 60 * (((rn - gn) / d) + 4);
    if (h < 0) h += 360;
  }
  return { h, s: clamp01(s), l: clamp01(l) };
}

function hslToRgb(h, s, l) {
  const hh = ((Number(h) % 360) + 360) % 360;
  const ss = clamp01(s);
  const ll = clamp01(l);
  const c = (1 - Math.abs(2 * ll - 1)) * ss;
  const hp = hh / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rn = 0;
  let gn = 0;
  let bn = 0;
  if (hp >= 0 && hp < 1) [rn, gn, bn] = [c, x, 0];
  else if (hp < 2) [rn, gn, bn] = [x, c, 0];
  else if (hp < 3) [rn, gn, bn] = [0, c, x];
  else if (hp < 4) [rn, gn, bn] = [0, x, c];
  else if (hp < 5) [rn, gn, bn] = [x, 0, c];
  else [rn, gn, bn] = [c, 0, x];
  const m = ll - c / 2;
  return {
    r: Math.round((rn + m) * 255),
    g: Math.round((gn + m) * 255),
    b: Math.round((bn + m) * 255),
  };
}

function hslToHex(h, s, l) {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

function sampleColorByIndex(i) {
  return SAMPLE_PASTEL_PALETTE[((Number(i) % SAMPLE_PASTEL_PALETTE.length) + SAMPLE_PASTEL_PALETTE.length) % SAMPLE_PASTEL_PALETTE.length];
}

function hueDistanceDeg(a, b) {
  const d = Math.abs(a - b) % 360;
  return Math.min(d, 360 - d);
}

function generateDistinctPastelColor(usedHexes, seedIndex = 0) {
  if (!Array.isArray(usedHexes) || !usedHexes.length) {
    return sampleColorByIndex(seedIndex);
  }
  const usedHues = usedHexes.map((hex) => {
    const rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b).h;
  });
  let bestHex = sampleColorByIndex(seedIndex);
  let bestScore = -Infinity;
  for (let k = 0; k < 36; k++) {
    const h = (seedIndex * 67 + k * 37) % 360;
    const cand = hslToHex(h, 0.43, 0.66);
    let minDist = Infinity;
    for (const uh of usedHues) minDist = Math.min(minDist, hueDistanceDeg(h, uh));
    if (minDist > bestScore) {
      bestScore = minDist;
      bestHex = cand;
    }
  }
  return bestHex;
}

function ensureSampleColors(samples) {
  const used = new Set();
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    if (s && typeof s.color_hex === 'string' && /^#[0-9a-fA-F]{6}$/.test(s.color_hex)) {
      s.color_hex = normalizeHexColor(s.color_hex);
      used.add(s.color_hex);
    }
  }
  for (let i = 0; i < samples.length; i++) {
    const s = samples[i];
    if (!s) continue;
    if (s.color_hex && /^#[0-9a-fA-F]{6}$/.test(s.color_hex)) continue;
    let candidate = sampleColorByIndex(i);
    if (used.has(candidate)) {
      candidate = generateDistinctPastelColor(Array.from(used), i);
    }
    s.color_hex = candidate;
    used.add(candidate);
  }
}

function getReplicaShadeColor(baseHex, replicaIndex, replicaCount) {
  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const n = Math.max(1, Number(replicaCount) || 1);
  const idx = clamp(Math.floor(Number(replicaIndex) || 0), 0, n - 1);
  const t = n <= 1 ? 0 : idx / (n - 1);
  const sat = clamp01(hsl.s * (0.85 + 0.35 * t));
  const lig = clamp01(hsl.l * (1.06 - 0.24 * t));
  return hslToHex(hsl.h, sat, lig);
}

function colorWithAdjustedLightness(baseHex, delta) {
  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return hslToHex(hsl.h, hsl.s, clamp01(hsl.l + delta));
}

function hexToRgba(hex, alpha = 1.0) {
  const rgb = hexToRgb(hex);
  const a = clamp(Number(alpha), 0, 1);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
}

function escapeRegex(s) {
  return String(s ?? '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseTaggedNumber(token, label) {
  const lbl = String(label || '').trim();
  if (!lbl) return null;
  const re = new RegExp(`^${escapeRegex(lbl)}(?:N)?([+-]?\\d+(?:[.,]\\d+)?)$`, 'i');
  const m = String(token || '').trim().match(re);
  if (!m) return null;
  const v = Number(String(m[1]).replace(',', '.'));
  return Number.isFinite(v) ? v : null;
}

function normalizeGeometryChoice({ areaCm2 = null, diameterMm = null } = {}) {
  const area = optionalFiniteNumber(areaCm2);
  const diameter = optionalFiniteNumber(diameterMm);
  if (Number.isFinite(area) && area > 0) {
    return { area_cm2: area, diameter_mm: null };
  }
  if (Number.isFinite(diameter) && diameter > 0) {
    return { area_cm2: null, diameter_mm: diameter };
  }
  return { area_cm2: null, diameter_mm: null };
}

function syncGlobalGeometryInputsUi() {
  const area = optionalFiniteNumber(els.an_area_mm2?.value);
  const diameter = optionalFiniteNumber(els.an_diameter_mm?.value);
  const hasArea = Number.isFinite(area) && area > 0;
  const hasDiameter = Number.isFinite(diameter) && diameter > 0;
  if (els.an_area_mm2) {
    const disableArea = hasDiameter && !hasArea;
    els.an_area_mm2.disabled = disableArea;
    els.an_area_mm2.readOnly = disableArea;
    if (disableArea) els.an_area_mm2.setAttribute('disabled', 'disabled');
    else els.an_area_mm2.removeAttribute('disabled');
    els.an_area_mm2.classList.toggle('geoInputDisabled', disableArea);
  }
  if (els.an_diameter_mm) {
    const disableDiameter = hasArea;
    els.an_diameter_mm.disabled = disableDiameter;
    els.an_diameter_mm.readOnly = disableDiameter;
    if (disableDiameter) els.an_diameter_mm.setAttribute('disabled', 'disabled');
    else els.an_diameter_mm.removeAttribute('disabled');
    els.an_diameter_mm.classList.toggle('geoInputDisabled', disableDiameter);
  }
}

function handleGlobalGeometryEdit(source) {
  if (!els.an_area_mm2 || !els.an_diameter_mm) return;
  const areaVal = optionalFiniteNumber(els.an_area_mm2.value);
  const diameterVal = optionalFiniteNumber(els.an_diameter_mm.value);
  const hasArea = Number.isFinite(areaVal) && areaVal > 0;
  const hasDiameter = Number.isFinite(diameterVal) && diameterVal > 0;

  if (source === 'diameter' && hasDiameter) {
    els.an_area_mm2.value = '';
  } else if (source === 'area' && hasArea) {
    els.an_diameter_mm.value = '';
  }

  syncGlobalGeometryInputsUi();
}

function parseGeometryFromFilename(fileName) {
  const io = state.project?.io || {};
  if (!io.parse_geom_from_filename) return { thickness_mm: null, area_cm2: null, diameter_mm: null };
  const base = String(fileName || '').replace(/\.[^/.]+$/, '');
  const sep = String(io.geom_sep ?? '_');
  const tLabel = String(io.geom_t_label ?? 'T').trim();
  const dLabel = String(io.geom_d_label ?? 'D').trim();
  const aLabel = String(io.geom_a_label ?? 'A').trim();
  let thickness = null;
  let diameter = null;
  let area = null;
  if (sep) {
    const tokens = base.split(sep);
    for (const tok of tokens) {
      if (!Number.isFinite(thickness)) {
        const v = parseTaggedNumber(tok, tLabel);
        if (Number.isFinite(v)) thickness = v;
      }
      if (!Number.isFinite(diameter)) {
        const v = parseTaggedNumber(tok, dLabel);
        if (Number.isFinite(v)) diameter = v;
      }
      if (!Number.isFinite(area)) {
        const v = parseTaggedNumber(tok, aLabel);
        if (Number.isFinite(v)) area = v;
      }
    }
  } else {
    if (tLabel) {
      const mt = base.match(new RegExp(`${escapeRegex(tLabel)}(?:N)?([+-]?\\d+(?:[.,]\\d+)?)`, 'i'));
      if (mt) {
        const v = Number(String(mt[1]).replace(',', '.'));
        if (Number.isFinite(v)) thickness = v;
      }
    }
    if (dLabel) {
      const md = base.match(new RegExp(`${escapeRegex(dLabel)}(?:N)?([+-]?\\d+(?:[.,]\\d+)?)`, 'i'));
      if (md) {
        const v = Number(String(md[1]).replace(',', '.'));
        if (Number.isFinite(v)) diameter = v;
      }
    }
    if (aLabel) {
      const ma = base.match(new RegExp(`${escapeRegex(aLabel)}(?:N)?([+-]?\\d+(?:[.,]\\d+)?)`, 'i'));
      if (ma) {
        const v = Number(String(ma[1]).replace(',', '.'));
        if (Number.isFinite(v)) area = v;
      }
    }
  }
  const geom = normalizeGeometryChoice({
    areaCm2: Number.isFinite(area) && area > 0 ? area : null,
    diameterMm: Number.isFinite(diameter) && diameter > 0 ? diameter : null,
  });
  return {
    thickness_mm: Number.isFinite(thickness) && thickness > 0 ? thickness : null,
    area_cm2: geom.area_cm2,
    diameter_mm: geom.diameter_mm,
  };
}

function ensureReplicaGeometryFromFilename(replica) {
  if (!replica || !state.project?.io?.parse_geom_from_filename) return;
  const needT = !Number.isFinite(optionalFiniteNumber(replica.thickness_mm));
  const needA = !Number.isFinite(optionalFiniteNumber(replica.area_cm2));
  const needD = !Number.isFinite(optionalFiniteNumber(replica.diameter_mm));
  if (!needT && !needA && !needD) return;
  const g = parseGeometryFromFilename(replica.file_name || replica.name || '');
  if (needT && Number.isFinite(g.thickness_mm)) replica.thickness_mm = g.thickness_mm;
  if (needA && Number.isFinite(g.area_cm2)) replica.area_cm2 = g.area_cm2;
  if (needD && Number.isFinite(g.diameter_mm)) replica.diameter_mm = g.diameter_mm;
  const geom = normalizeGeometryChoice({ areaCm2: replica.area_cm2, diameterMm: replica.diameter_mm });
  replica.area_cm2 = geom.area_cm2;
  replica.diameter_mm = geom.diameter_mm;
}

function meanSem(vals) {
  const arr = vals.filter((v) => Number.isFinite(v));
  const n = arr.length;
  if (!n) return { mean: null, sem: null, n: 0 };
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  if (n < 2) return { mean, sem: null, n };
  const varS = arr.reduce((s, x) => s + (x - mean) ** 2, 0) / (n - 1);
  return { mean, sem: Math.sqrt(varS / n), n };
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatTs(s) {
  if (!s) return '';
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return String(s);
  return d.toLocaleString();
}

function normalizeSampleComment(raw) {
  const c = (raw && typeof raw === 'object') ? raw : {};
  const createdAt = c.created_at || new Date().toISOString();
  return {
    id: c.id || uid('cmt'),
    author: String(c.author || '').trim(),
    text: String(c.text || '').trim(),
    created_at: createdAt,
    updated_at: c.updated_at || createdAt,
  };
}

function normalizeSample(raw) {
  const s = (raw && typeof raw === 'object') ? raw : {};
  return {
    ...s,
    color_hex: normalizeHexColor(s.color_hex, ''),
    comments: Array.isArray(s.comments) ? s.comments.map((c) => normalizeSampleComment(c)).filter((c) => c.text) : [],
    comments_expanded: Boolean(s.comments_expanded),
    collapsed: Boolean(s.collapsed),
  };
}

function normalizeProjectMeta(raw) {
  const m = (raw && typeof raw === 'object') ? raw : {};
  const owner = String(m.owner_name || m.user_name || '').trim();
  return {
    owner_name: owner,
    project_title: String(m.project_title || '').trim(),
    project_code: String(m.project_code || '').trim(),
    operator_email: String(m.operator_email || '').trim(),
    institution: String(m.institution || '').trim(),
    experiment_type: String(m.experiment_type || '').trim(),
    sample_family: String(m.sample_family || '').trim(),
    batch_id: String(m.batch_id || '').trim(),
    test_date: String(m.test_date || '').trim(),
    objective: String(m.objective || '').trim(),
    comments: Array.isArray(m.comments)
      ? m.comments.map((c) => normalizeSampleComment(c)).filter((c) => c.text)
      : [],
  };
}

function defaultProject() {
  return {
    io: {
      sep: ';',
      quotechar: '"',
      start_marker: 'Tiempo;Desplazamiento;Fuerza',
      skip_lines_after_marker: 2,
      col_time: 0,
      col_disp: 1,
      col_force: 2,
      parse_geom_from_filename: false,
      geom_sep: '_',
      geom_t_label: 'T',
      geom_d_label: 'D',
      geom_a_label: 'A',
    },
    analysis: {
      window_step_n: 10,
      min_width_n: 30,
      max_width_n: 500,
      min_valid_points: 20,
      domain_threshold_default: 0.80,
      require_positive_slope: true,
      area_mm2: 0.0,
      diameter_mm: 12.0,
      thickness_mm: 3.0,
    },
    ui: {
      auto_precompute_on_upload: true,
      include_heatmap_in_export: true,
    },
    project_meta: {
      owner_name: '',
      project_title: '',
      project_code: '',
      operator_email: '',
      institution: '',
      experiment_type: '',
      sample_family: '',
      batch_id: '',
      test_date: '',
      objective: '',
      comments: [],
    },
    samples: [],
  };
}

function writeConfigForm(project) {
  const io = project.io || {};
  const a = project.analysis || {};
  const ui = project.ui || {};
  const globalGeom = normalizeGeometryChoice({
    areaCm2: Number(a.area_mm2) > 0 ? Number(a.area_mm2) / 100.0 : null,
    diameterMm: optionalFiniteNumber(a.diameter_mm),
  });

  els.io_sep.value = io.sep ?? ';';
  els.io_quotechar.value = io.quotechar ?? '"';
  els.io_start_marker.value = io.start_marker ?? 'Tiempo;Desplazamiento;Fuerza';
  els.io_skip_lines_after_marker.value = io.skip_lines_after_marker ?? 2;
  els.io_col_time.value = io.col_time ?? 0;
  els.io_col_disp.value = io.col_disp ?? 1;
  els.io_col_force.value = io.col_force ?? 2;
  els.io_parse_geom_from_filename.checked = Boolean(io.parse_geom_from_filename ?? false);
  els.io_geom_sep.value = io.geom_sep ?? '_';
  els.io_geom_t_label.value = io.geom_t_label ?? 'T';
  els.io_geom_d_label.value = io.geom_d_label ?? 'D';
  els.io_geom_a_label.value = io.geom_a_label ?? 'A';

  els.an_window_step_n.value = a.window_step_n ?? 10;
  els.an_min_width_n.value = a.min_width_n ?? 30;
  els.an_max_width_n.value = a.max_width_n ?? 500;
  els.an_min_valid_points.value = a.min_valid_points ?? 20;
  els.an_domain_threshold_default.value = a.domain_threshold_default ?? 0.80;
  els.an_require_positive_slope.checked = Boolean(a.require_positive_slope ?? true);
  els.an_area_mm2.value = Number.isFinite(globalGeom.area_cm2) ? globalGeom.area_cm2 * 100.0 : '';
  els.an_diameter_mm.value = Number.isFinite(globalGeom.diameter_mm) ? globalGeom.diameter_mm : '';
  els.an_thickness_mm.value = a.thickness_mm ?? 3;
  syncGlobalGeometryInputsUi();

  els.autoPrecomputeOnUpload.checked = Boolean(ui.auto_precompute_on_upload ?? false);
  els.includeHeatmapInExport.checked = Boolean(ui.include_heatmap_in_export ?? false);
}

function syncProjectFromConfigForm() {
  if (!state.project) state.project = defaultProject();
  state.project.io = {
    sep: els.io_sep.value,
    quotechar: els.io_quotechar.value,
    start_marker: els.io_start_marker.value,
    skip_lines_after_marker: Number(els.io_skip_lines_after_marker.value),
    col_time: Number(els.io_col_time.value),
    col_disp: Number(els.io_col_disp.value),
    col_force: Number(els.io_col_force.value),
    parse_geom_from_filename: Boolean(els.io_parse_geom_from_filename.checked),
    geom_sep: String(els.io_geom_sep.value ?? ''),
    geom_t_label: String(els.io_geom_t_label.value ?? ''),
    geom_d_label: String(els.io_geom_d_label.value ?? ''),
    geom_a_label: String(els.io_geom_a_label.value ?? ''),
  };
  const globalGeom = normalizeGeometryChoice({
    areaCm2: Number.isFinite(optionalFiniteNumber(els.an_area_mm2.value)) ? Number(els.an_area_mm2.value) / 100.0 : null,
    diameterMm: optionalFiniteNumber(els.an_diameter_mm.value),
  });
  state.project.analysis = {
    window_step_n: Number(els.an_window_step_n.value),
    min_width_n: Number(els.an_min_width_n.value),
    max_width_n: Number(els.an_max_width_n.value),
    min_valid_points: Number(els.an_min_valid_points.value),
    domain_threshold_default: Number(els.an_domain_threshold_default.value),
    require_positive_slope: Boolean(els.an_require_positive_slope.checked),
    area_mm2: Number.isFinite(globalGeom.area_cm2) ? globalGeom.area_cm2 * 100.0 : 0,
    diameter_mm: Number.isFinite(globalGeom.diameter_mm) ? globalGeom.diameter_mm : 0,
    thickness_mm: Number(els.an_thickness_mm.value),
  };
  state.project.ui = {
    auto_precompute_on_upload: Boolean(els.autoPrecomputeOnUpload.checked),
    include_heatmap_in_export: Boolean(els.includeHeatmapInExport.checked),
    autosave_enabled: Boolean(state.projectAutosaveEnabled),
  };
  markProjectChanged('settings');
  queueProjectAutosave('settings');
}

function cacheStatusClass(status) {
  if (status === 'ok') return 'status-ok';
  if (status === 'error') return 'status-err';
  if (status === 'running') return 'status-run';
  return 'status-none';
}

function cacheStatusLabel(replica) {
  const c = replica?.cache;
  if (!c || !c.status || c.status === 'none') return 'not computed';
  if (c.status === 'running') return 'running';
  if (c.status === 'error') return 'error';
  if (c.status === 'ok') {
    const s = Number(c.score);
    if (Number.isFinite(s)) return `ok (${s.toFixed(3)})`;
    return 'ok';
  }
  return String(c.status);
}

function setPrecomputeInfo(text) {
  els.precomputeInfo.textContent = text || '';
}

function nextSampleDefaultName() {
  const names = new Set((state.project?.samples || []).map((s) => String(s.name || '').trim()));
  let k = Math.max(1, (state.project?.samples || []).length + 1);
  while (names.has(`Sample ${k}`)) k += 1;
  return `Sample ${k}`;
}

function updateNewSampleNameSuggestion(force = false) {
  const current = String(els.newSampleName?.value || '').trim();
  if (!force && current) return;
  els.newSampleName.value = nextSampleDefaultName();
  els.newSampleName.dataset.autofill = '1';
}

function sampleColorPickerFromHex(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return { h: hsl.h, s: hsl.s, l: hsl.l };
}

function sampleColorPickerCurrentHex() {
  const p = state.sampleColorPicker;
  return hslToHex(p.h, p.s, p.l);
}

function drawSampleColorPickerSurface() {
  const canvas = els.sampleColorPickerSurface;
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const l = clamp01(state.sampleColorPicker.l);
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    const sat = 1 - y / (h - 1 || 1);
    for (let x = 0; x < w; x++) {
      const hue = (x / (w - 1 || 1)) * 360;
      const rgb = hslToRgb(hue, sat, l);
      const i = (y * w + x) * 4;
      img.data[i + 0] = rgb.r;
      img.data[i + 1] = rgb.g;
      img.data[i + 2] = rgb.b;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const x = clamp01(state.sampleColorPicker.h / 360) * (w - 1);
  const y = (1 - clamp01(state.sampleColorPicker.s)) * (h - 1);
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, 6, 0, Math.PI * 2);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, 7.5, 0, Math.PI * 2);
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = '#0f172a';
  ctx.stroke();
  ctx.restore();
}

function sampleColorPickerSetFromSurfaceEvent(evt) {
  const canvas = els.sampleColorPickerSurface;
  if (!(canvas instanceof HTMLCanvasElement)) return;
  const rect = canvas.getBoundingClientRect();
  const x = clamp(evt.clientX - rect.left, 0, rect.width);
  const y = clamp(evt.clientY - rect.top, 0, rect.height);
  state.sampleColorPicker.h = clamp01(x / Math.max(1, rect.width)) * 360;
  state.sampleColorPicker.s = 1 - clamp01(y / Math.max(1, rect.height));
  const hex = sampleColorPickerCurrentHex();
  if (els.sampleColorPickerHex) els.sampleColorPickerHex.value = hex;
  drawSampleColorPickerSurface();
}

function openSampleColorPicker(sampleId, anchorEl) {
  const sample = getSampleById(sampleId);
  if (!sample || !(anchorEl instanceof HTMLElement)) return;
  const pop = els.sampleColorPickerPopover;
  if (!(pop instanceof HTMLElement)) return;
  const hsl = sampleColorPickerFromHex(normalizeHexColor(sample.color_hex, '#a9d0f5'));
  state.sampleColorPicker = {
    open: true,
    sample_id: sample.id,
    h: hsl.h,
    s: hsl.s,
    l: hsl.l,
    dragging: false,
  };
  els.sampleColorPickerLightness.value = String(Math.round(hsl.l * 100));
  els.sampleColorPickerHex.value = normalizeHexColor(sample.color_hex, '#a9d0f5');
  pop.classList.remove('hidden');
  pop.style.left = '0px';
  pop.style.top = '0px';
  const popW = Math.max(220, pop.offsetWidth || 250);
  const popH = Math.max(180, pop.offsetHeight || 260);
  const rect = anchorEl.getBoundingClientRect();
  let left = rect.left;
  let top = rect.bottom + 8;
  if (left + popW > window.innerWidth - 8) left = rect.right - popW;
  if (left < 8) left = 8;
  if (top + popH > window.innerHeight - 8) top = rect.top - popH - 8;
  if (top < 8) top = 8;
  pop.style.left = `${left}px`;
  pop.style.top = `${top}px`;
  drawSampleColorPickerSurface();
}

function closeSampleColorPicker() {
  state.sampleColorPicker.open = false;
  state.sampleColorPicker.sample_id = null;
  state.sampleColorPicker.dragging = false;
  els.sampleColorPickerPopover?.classList.add('hidden');
}

function applySampleColorPicker() {
  if (!state.sampleColorPicker.open) return;
  const sample = getSampleById(state.sampleColorPicker.sample_id);
  if (!sample) {
    closeSampleColorPicker();
    return;
  }
  sample.color_hex = normalizeHexColor(sampleColorPickerCurrentHex(), '#a9d0f5');
  closeSampleColorPicker();
  renderSamplesList();
  renderSummaryFromCache();
}

function renderSamplesList() {
  const samples = (state.project.samples || []).map((s) => normalizeSample(s));
  ensureSampleColors(samples);
  state.project.samples = samples;
  if (!samples.length) {
    els.samplesList.innerHTML = '<div class="muted">No samples yet.</div>';
    renderProjectInfo();
    return;
  }

  els.samplesList.innerHTML = samples
    .map((s, si) => {
      const replicas = (s.replicas || []).map((r) => {
        ensureReplicaGeometryFromFilename(r);
        return r;
      });
      const rows = replicas
        .map(
          (r) => `
            <tr>
              <td>${escapeHtml(r.name)}</td>
              <td>${escapeHtml(r.file_name || '')}</td>
              <td><span class="statusBadge ${cacheStatusClass(r.cache?.status)}" title="${r.cache?.error ? escapeHtml(String(r.cache.error)) : ''}">${cacheStatusLabel(r)}</span></td>
              <td>
                <input
                  class="replicaThicknessInput"
                  data-sid="${s.id}"
                  data-rid="${r.id}"
                  type="number"
                  step="any"
                  placeholder="global"
                  value="${Number.isFinite(optionalFiniteNumber(r.thickness_mm)) ? optionalFiniteNumber(r.thickness_mm) : ''}"
                />
              </td>
              <td>
                <input
                  class="replicaDiameterInput ${Number.isFinite(optionalFiniteNumber(r.area_cm2)) ? 'geoInputDisabled' : ''}"
                  data-sid="${s.id}"
                  data-rid="${r.id}"
                  type="number"
                  step="any"
                  placeholder="global"
                  ${Number.isFinite(optionalFiniteNumber(r.area_cm2)) ? 'disabled' : ''}
                  value="${Number.isFinite(optionalFiniteNumber(r.diameter_mm)) ? optionalFiniteNumber(r.diameter_mm) : ''}"
                />
              </td>
              <td>
                <input
                  class="replicaAreaInput ${Number.isFinite(optionalFiniteNumber(r.diameter_mm)) && !Number.isFinite(optionalFiniteNumber(r.area_cm2)) ? 'geoInputDisabled' : ''}"
                  data-sid="${s.id}"
                  data-rid="${r.id}"
                  type="number"
                  step="any"
                  placeholder="global"
                  ${Number.isFinite(optionalFiniteNumber(r.diameter_mm)) && !Number.isFinite(optionalFiniteNumber(r.area_cm2)) ? 'disabled' : ''}
                  value="${Number.isFinite(optionalFiniteNumber(r.area_cm2)) ? optionalFiniteNumber(r.area_cm2) : ''}"
                />
              </td>
              <td><button class="removeReplicaBtn" data-sid="${s.id}" data-rid="${r.id}" type="button">Remove</button></td>
            </tr>`
        )
        .join('');

      const commentsRows = (s.comments || [])
        .map(
          (c) => `
            <tr>
              <td>${escapeHtml(c.author || 'unknown')}</td>
              <td>${escapeHtml(formatTs(c.created_at))}</td>
              <td class="commentTextCell">${escapeHtml(c.text)}</td>
              <td>
                <button class="editSampleCommentBtn" data-sid="${s.id}" data-cid="${c.id}" type="button">Edit</button>
                <button class="deleteSampleCommentBtn" data-sid="${s.id}" data-cid="${c.id}" type="button">Delete</button>
              </td>
            </tr>`
        )
        .join('');

      const sampleBase = normalizeHexColor(s.color_hex, '#a9d0f5');
      const sampleHdrBg = colorWithAdjustedLightness(sampleBase, 0.20);
      const sampleHdrBorder = colorWithAdjustedLightness(sampleBase, 0.06);

      return `
        <div class="sampleCard">
          <div class="sampleHeader sampleHeaderToggle" style="background:${escapeHtml(sampleHdrBg)};border-color:${escapeHtml(sampleHdrBorder)};" data-sid="${s.id}" role="button" tabindex="0" aria-expanded="${s.collapsed ? 'false' : 'true'}">
            <span class="sampleChevron">${s.collapsed ? '▸' : '▾'}</span>
            <span class="sampleTitle">${escapeHtml(s.name)}</span>
            <div class="sampleHeaderActions">
              <button class="sampleColorBtn iconBtn" data-sid="${s.id}" type="button" title="Sample color">
                <span class="sampleColorSwatch" style="background:${escapeHtml(normalizeHexColor(s.color_hex, '#a9d0f5'))};"></span>
              </button>
              <button class="editSampleNameBtn iconBtn" data-sid="${s.id}" type="button" title="Rename sample">✎</button>
              <button class="removeSampleBtn" data-sid="${s.id}" type="button">Remove Sample</button>
            </div>
          </div>
          <div class="sampleBody ${s.collapsed ? 'collapsed' : ''}">
            <div class="row wrap">
              <label style="flex:1;">Upload replicas (CSV)
                <input class="replicaUploadInput" data-sid="${s.id}" type="file" accept=".csv,text/csv" multiple />
              </label>
            </div>
            <table class="replicaList">
              <thead><tr><th>Replica</th><th>File</th><th>Status</th><th>Thickness (mm)</th><th>Diameter (mm)</th><th>Area (cm2)</th><th>Action</th></tr></thead>
              <tbody>${rows || '<tr><td colspan="7">No replicas</td></tr>'}</tbody>
            </table>

            <div class="sampleComments">
              <div class="sampleCommentsHeader">
                <strong>Sample Comments</strong>
                <button class="toggleSampleCommentsBtn" data-sid="${s.id}" type="button">${s.comments_expanded ? 'Hide' : 'Show'} (${s.comments.length})</button>
              </div>
              <div class="commentForm">
                <label>Author
                  <input class="sampleCommentAuthorInput" data-sid="${s.id}" type="text" placeholder="Your name" />
                </label>
                <label>Comment
                  <input class="sampleCommentTextInput" data-sid="${s.id}" type="text" placeholder="Add sample-level note..." />
                </label>
                <button class="addSampleCommentBtn" data-sid="${s.id}" type="button">Submit</button>
              </div>
              <div class="sampleCommentsList ${s.comments_expanded ? '' : 'collapsed'}">
                <table class="sampleCommentsTable">
                  <thead><tr><th>Author</th><th>Date</th><th>Comment</th><th>Action</th></tr></thead>
                  <tbody>${commentsRows || '<tr><td colspan="4">No comments yet.</td></tr>'}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join('');

  if (document.getElementById('summaryTab')?.classList.contains('active')) {
    renderSummaryFromCache();
  }
  updateNewSampleNameSuggestion(false);
  renderProjectInfo();
}

function getSampleById(sampleId) {
  return (state.project.samples || []).find((s) => s.id === sampleId);
}

function setAllSamplesCollapsed(collapsed) {
  for (const s of state.project.samples || []) {
    s.collapsed = Boolean(collapsed);
  }
  renderSamplesList();
}

function getSelectedReplica() {
  const sid = els.vizSampleSelect.value;
  const rid = els.vizReplicaSelect.value;
  const sample = getSampleById(sid);
  const replica = sample?.replicas?.find((r) => r.id === rid);
  return { sample, replica };
}

function analysisCacheKey(project) {
  return JSON.stringify({
    io: project?.io || {},
    analysis: project?.analysis || {},
  });
}

function replicaDataCacheKey(sampleId, replicaId) {
  return `${sampleId}::${replicaId}`;
}

function setSelectedReplicaThresholdOverride(valueOrNull) {
  const { replica } = getSelectedReplica();
  if (!replica) return;
  replica.domain_threshold_override = valueOrNull;
}

function hasUsableCachedMetrics(replica) {
  return Boolean(replica?.cache?.status === 'ok' && replica?.cache?.metrics);
}

function hasUsableCachedDomains(replica) {
  if (!(replica?.cache?.status === 'ok' && Array.isArray(replica?.cache?.domains))) return false;
  const cacheThr = optionalFiniteNumber(replica.cache?.threshold);
  const effectiveThr = clamp(getEffectiveDomainThreshold(replica), 0.5, 0.999);
  return Number.isFinite(cacheThr) && Math.abs(cacheThr - effectiveThr) < 1e-9;
}

async function ensureDatasetForSelectedReplica() {
  if (state.datasetId) return true;
  const { sample, replica } = getSelectedReplica();
  if (!sample || !replica) return false;

  const payload = {
    csv_name: replica.file_name || replica.name,
    csv_text: replica.csv_text,
    io: state.project.io,
    analysis: state.project.analysis,
  };
  const dataKey = replicaDataCacheKey(sample.id, replica.id);
  const cfgKey = analysisCacheKey(state.project);
  const prev = state.replicaDataCache[dataKey] || {};
  const data = await fetchJson('/api/analyze-csv', payload);
  data.cfg_key = cfgKey;
  if ((!data.d2 || !Array.isArray(data.d2.x) || !data.d2.x.length) && prev.d2 && Array.isArray(prev.d2.x)) {
    data.d2 = prev.d2;
  }
  state.replicaDataCache[dataKey] = data;
  state.datasetId = data.dataset_id || null;
  return Boolean(state.datasetId);
}

function refreshVizSelectors() {
  const samples = state.project.samples || [];
  const prevS = els.vizSampleSelect.value;
  const prevR = els.vizReplicaSelect.value;

  els.vizSampleSelect.innerHTML = samples
    .map((s) => `<option value="${s.id}">${s.name}</option>`)
    .join('');

  if (samples.length) {
    els.vizSampleSelect.value = samples.some((s) => s.id === prevS) ? prevS : samples[0].id;
  }
  refreshReplicaSelector(prevR);
}

function refreshReplicaSelector(prevReplicaId = null) {
  const sid = els.vizSampleSelect.value;
  const sample = (state.project.samples || []).find((s) => s.id === sid);
  const reps = sample ? sample.replicas : [];
  els.vizReplicaSelect.innerHTML = reps.map((r) => `<option value="${r.id}">${r.name}</option>`).join('');
  if (reps.length) {
    els.vizReplicaSelect.value = reps.some((r) => r.id === prevReplicaId) ? prevReplicaId : reps[0].id;
  } else {
    els.vizReplicaSelect.value = '';
  }
}

function clearVisualizationState(reason = 'Select a sample/replica first.') {
  state.datasetId = null;
  state.loadedSampleId = null;
  state.loadedReplicaId = null;
  state.disp = [];
  state.force = [];
  state.d2 = null;
  state.heatmap = null;
  state.domains = [];
  state.lo = 0;
  state.hi = 0;
  state.plotMeta = null;
  state.heatmapMeta = null;
  state.drag = null;
  els.vizInfo.textContent = reason;
  els.metrics.textContent = '';
  setDomainsSummary('Domains summary');
  renderDomainsTable([]);
  syncToeLabels();
  drawPlot();
  drawHeatmap();
}

function switchTab(tabId) {
  els.tabBtns.forEach((b) => b.classList.toggle('active', b.dataset.tab === tabId));
  els.tabPanes.forEach((p) => p.classList.toggle('active', p.id === tabId));
  if (tabId === 'vizTab') {
    maybeAutoLoadSelectedReplica();
    requestAnimationFrame(() => {
      drawPlot();
      drawHeatmap();
      if (window.Plotly && els.heatmapPlot) window.Plotly.Plots.resize(els.heatmapPlot);
    });
    setTimeout(() => {
      drawHeatmap();
      if (window.Plotly && els.heatmapPlot) window.Plotly.Plots.resize(els.heatmapPlot);
    }, 120);
  }
  if (tabId === 'summaryTab') {
    renderSummaryFromCache();
  }
  if (tabId === 'projectInfoTab') {
    renderProjectInfo();
  }
}

function maybeAutoLoadSelectedReplica(force = false) {
  const { sample, replica } = getSelectedReplica();
  if (!sample || !replica) {
    clearVisualizationState('Select a sample/replica first.');
    return;
  }
  if (!force && state.loadedSampleId === sample.id && state.loadedReplicaId === replica.id) return;
  loadSelectedReplica().catch((err) => {
    els.metrics.textContent = `Error: ${err}`;
  });
}

function windowBounds(n, centerIdx, widthN) {
  const c = clamp(Math.floor(centerIdx), 0, n - 1);
  const w = Math.max(3, Math.floor(widthN));
  const half = Math.floor(w / 2);
  let lo = c - half;
  let hi = c + half + (w % 2 === 0 ? 0 : 1);
  lo = Math.max(0, lo);
  hi = Math.min(n, hi);
  return [lo, hi];
}

function maxWindowBounds(n, centerIdx, widthN) {
  const c = clamp(Math.floor(centerIdx), 0, n - 1);
  const w = Math.max(1, Math.floor(widthN));
  const half = Math.floor(w / 2);
  let lo = c - half;
  let hi = c + half + (w % 2 === 0 ? 0 : 1);
  lo = Math.max(0, lo);
  hi = Math.min(n, hi);
  if (hi <= lo) hi = Math.min(n, lo + 1);
  return [lo, hi];
}

function getMaxWindowBoundsFromControls() {
  if (!state.disp.length) return [0, 0];
  const n = state.disp.length;
  const c = clamp(Number(els.maxCenterSlider.value), 0, n - 1);
  const w = clamp(Number(els.maxWidthSlider.value), 1, n);
  return maxWindowBounds(n, c, w);
}

function setMaxWindowBounds(lo, hi) {
  if (!state.disp.length) return;
  const n = state.disp.length;
  let l = clamp(Math.floor(lo), 0, n - 1);
  let h = clamp(Math.floor(hi), l + 1, n);
  const center = Math.floor((l + h - 1) / 2);
  const width = h - l;
  els.maxCenterSlider.value = String(center);
  els.maxWidthSlider.value = String(width);
  syncMaxLabels();
  drawPlot();
}

function findMaxIndexInRange(force, lo, hi) {
  let idx = lo;
  let maxV = -Infinity;
  for (let i = lo; i < hi; i++) {
    const v = force[i];
    if (v > maxV) {
      maxV = v;
      idx = i;
    }
  }
  return idx;
}

function getGlobalMaxIndex() {
  if (!state.force.length) return 0;
  return findMaxIndexInRange(state.force, 0, state.force.length);
}

function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(2, Math.floor(rect.width * dpr));
  canvas.height = Math.max(2, Math.floor(rect.height * dpr));
  return dpr;
}

function nearestIndex(arr, target) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  if (lo <= 0) return 0;
  if (lo >= arr.length) return arr.length - 1;
  const a = arr[lo - 1];
  const b = arr[lo];
  return Math.abs(target - a) <= Math.abs(b - target) ? lo - 1 : lo;
}

function nearestIndexAny(arr, target) {
  if (!arr.length) return 0;
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < arr.length; i++) {
    const v = Number(arr[i]);
    if (!Number.isFinite(v)) continue;
    const d = Math.abs(v - target);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

function canvasPoint(evt, canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  return { x: (evt.clientX - rect.left) * dpr, y: (evt.clientY - rect.top) * dpr };
}

function setDomainsSummary(text) {
  els.domainsSummary.textContent = text;
}

function renderDomainsTable(domains) {
  els.domainsTbody.innerHTML = '';
  if (!domains || !domains.length) {
    const tr = document.createElement('tr');
    tr.innerHTML = '<td colspan="9">No domains detected for current threshold.</td>';
    els.domainsTbody.appendChild(tr);
    return;
  }

  domains.forEach((d, i) => {
    const rep = d.representative || {};
    const tr = document.createElement('tr');
    tr.innerHTML = [
      `<td>${i + 1}</td>`,
      `<td>${d.n_cells ?? 'n/a'}</td>`,
      `<td>${format(d.population_fraction, 4)}</td>`,
      `<td>${format(d.score_mean, 5)}</td>`,
      `<td>${format(d.score_max, 5)}</td>`,
      `<td>${format(rep.disp_lo, 5)}..${format(rep.disp_hi, 5)}</td>`,
      `<td>${format(rep.r2, 5)}</td>`,
      `<td>${format(rep.rel_rmse, 5)}</td>`,
      `<td>${format(d.young_modulus_mpa, 6)}</td>`,
    ].join('');
    tr.addEventListener('click', () => {
      applyDomainRepresentative(rep);
    });
    els.domainsTbody.appendChild(tr);
  });
}

function applyDomainRepresentative(rep) {
  const centerIdx = Number(rep.center_idx);
  const widthN = Number(rep.width_n);
  if (!Number.isFinite(centerIdx) || !Number.isFinite(widthN)) return;
  els.centerSlider.value = String(clamp(centerIdx, Number(els.centerSlider.min), Number(els.centerSlider.max)));
  els.widthSlider.value = String(clamp(widthN, Number(els.widthSlider.min), Number(els.widthSlider.max)));
  persistSelectedReplicaVizUiState('viz fit window');
  scheduleUpdate();
}

function syncWindowFromControls() {
  if (!state.disp.length) return;
  const n = state.disp.length;
  const center = Number(els.centerSlider.value);
  const width = Number(els.widthSlider.value);
  const [lo, hi] = windowBounds(n, center, width);
  state.lo = lo;
  state.hi = hi;

  const centerDisp = state.disp[clamp(Math.floor(center), 0, n - 1)];
  els.centerLabel.textContent = `idx=${center} | disp=${format(centerDisp, 6)} mm`;
  els.widthLabel.textContent = `width=${hi - lo} points | range=${format(state.disp[lo], 6)}..${format(state.disp[hi - 1], 6)} mm`;
}

function setWindowBounds(lo, hi) {
  if (!state.disp.length) return;
  const n = state.disp.length;
  let l = clamp(Math.floor(lo), 0, n - 1);
  let h = clamp(Math.floor(hi), l + 1, n);
  if (h - l < 3) {
    h = Math.min(n, l + 3);
    l = Math.max(0, h - 3);
  }

  const center = Math.floor((l + h - 1) / 2);
  const width = h - l;
  els.centerSlider.value = String(center);
  els.widthSlider.value = String(width);
  syncWindowFromControls();
  drawPlot();
  drawHeatmap();
}

function syncMaxControlsVisibility() {
  const mode = els.maxMode.value || 'global';
  els.maxWindowControls.classList.toggle('hidden', mode !== 'window');
  els.maxPointControls.classList.toggle('hidden', mode !== 'point');
}

function syncMaxLabels() {
  if (!state.disp.length) {
    els.maxCenterLabel.textContent = '';
    els.maxWidthLabel.textContent = '';
    els.maxPointLabel.textContent = '';
    return;
  }
  const n = state.disp.length;
  const c = clamp(Number(els.maxCenterSlider.value), 0, n - 1);
  const w = clamp(Number(els.maxWidthSlider.value), 1, n);
  const [lo, hi] = maxWindowBounds(n, c, w);
  const p = clamp(Number(els.maxPointSlider.value), 0, n - 1);
  els.maxCenterLabel.textContent = `idx=${c} | disp=${format(state.disp[c], 6)} mm`;
  els.maxWidthLabel.textContent = `width=${hi - lo} points | range=${format(state.disp[lo], 6)}..${format(state.disp[hi - 1], 6)} mm`;
  els.maxPointLabel.textContent = `idx=${p} | disp=${format(state.disp[p], 6)} mm`;
}

function centerWidthFromBounds(lo, hi) {
  const l = Math.floor(lo);
  const h = Math.floor(hi);
  return {
    center: Math.floor((l + h - 1) / 2),
    width: Math.max(1, h - l),
  };
}

function setMaxWindowAroundIndex(anchorIdx) {
  if (!state.disp.length) return;
  const n = state.disp.length;
  const idx = clamp(Math.floor(anchorIdx), 0, n - 1);
  const pad = Math.max(1, Math.round(0.1 * n));
  let lo = idx - pad;
  let hi = idx + pad + 1;
  lo = clamp(lo, 0, n - 1);
  hi = clamp(hi, lo + 1, n);
  const cw = centerWidthFromBounds(lo, hi);
  els.maxCenterSlider.value = String(clamp(cw.center, Number(els.maxCenterSlider.min), Number(els.maxCenterSlider.max)));
  els.maxWidthSlider.value = String(clamp(cw.width, Number(els.maxWidthSlider.min), Number(els.maxWidthSlider.max)));
}

function isToeSelectorActive() {
  return Boolean(els.toeEnabled?.checked);
}

function shouldShowD2() {
  return Boolean(els.showD2?.checked);
}

function syncToeControlsVisibility() {
  const enabled = isToeSelectorActive();
  const mode = els.toeMode.value || 'global';
  els.toeMode.disabled = !enabled;
  els.toePointControls.classList.toggle('hidden', !enabled || mode !== 'point');
}

function syncToeLabels() {
  const n = state.d2?.x?.length || 0;
  if (!n) {
    els.toePointLabel.textContent = '';
    return;
  }
  const p = clamp(Number(els.toePointSlider.value), 0, n - 1);
  els.toePointLabel.textContent = `idx=${p} | disp=${format(state.d2.x[p], 6)} mm`;
}

function getDefaultToeIndexCurvatureRise(xArr, d2Arr) {
  const n = Math.min(xArr?.length || 0, d2Arr?.length || 0);
  if (!n) return 0;
  if (n === 1) return 0;

  const x0 = Number(xArr[0]);
  const x1 = Number(xArr[n - 1]);
  const xMid = x0 + 0.5 * (x1 - x0);

  let halfEnd = n;
  for (let i = 0; i < n; i++) {
    if (xArr[i] <= xMid) halfEnd = i + 1;
    else break;
  }
  halfEnd = Math.max(1, Math.min(n, halfEnd));

  const peakIdx = findMaxIndexInRange(d2Arr, 0, halfEnd);
  const peakVal = Number(d2Arr[peakIdx]);
  const threshold = Number.isFinite(peakVal) ? (0.5 * peakVal) : 0;

  for (let i = peakIdx; i >= 0; i--) {
    const v = Number(d2Arr[i]);
    if (!Number.isFinite(v)) continue;
    if (v <= threshold) {
      // Keep the point nearest to threshold around the first backward crossing.
      const j = Math.min(peakIdx, i + 1);
      const vj = Number(d2Arr[j]);
      if (Number.isFinite(vj) && Math.abs(vj - threshold) < Math.abs(v - threshold)) {
        return j;
      }
      return i;
    }
  }

  // If never crossing, choose the closest point to threshold in [0..peakIdx].
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i <= peakIdx; i++) {
    const v = Number(d2Arr[i]);
    if (!Number.isFinite(v)) continue;
    const diff = Math.abs(v - threshold);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

function getToeSelection() {
  const n = state.d2?.x?.length || 0;
  if (!n || !isToeSelectorActive()) return null;
  const mode = els.toeMode.value || 'global';
  if (mode === 'global') {
    const auto = getDefaultToeSelectionFromState();
    if (!auto) return null;
    return {
      ...auto,
      mode: 'global',
    };
  }
  let idx = 0;
  if (mode === 'point') {
    idx = clamp(Number(els.toePointSlider.value), 0, n - 1);
  } else {
    const auto = getDefaultToeSelectionFromState();
    idx = auto?.idx ?? 0;
  }
  const disp = state.d2.x[idx];
  const rawIdx = nearestIndexAny(state.disp, disp);
  return {
    mode,
    idx,
    lo: idx,
    hi: idx + 1,
    disp,
    force: state.force[rawIdx],
    d2: state.d2.d2[idx],
    raw_idx: rawIdx,
  };
}

function getCompressiveStrengthSelection() {
  if (!state.disp.length || !state.force.length) return null;
  const n = state.disp.length;
  const mode = els.maxMode.value || 'global';

  let lo = 0;
  let hi = n;
  if (mode === 'window') {
    [lo, hi] = getMaxWindowBoundsFromControls();
  }

  let idx = 0;
  if (mode === 'point') {
    idx = clamp(Number(els.maxPointSlider.value), 0, n - 1);
    lo = idx;
    hi = idx + 1;
  } else {
    let maxV = -Infinity;
    for (let i = lo; i < hi; i++) {
      const v = state.force[i];
      if (v > maxV) {
        maxV = v;
        idx = i;
      }
    }
  }

  return {
    mode,
    idx,
    lo,
    hi,
    disp: state.disp[idx],
    force: state.force[idx],
  };
}

function integrateEnergyToIndex(disp, force, idxInclusive) {
  const n = Math.min(disp.length, force.length);
  if (n < 2) return null;
  const end = clamp(Math.floor(idxInclusive), 0, n - 1);
  if (end < 1) return 0;
  let areaNmm = 0;
  for (let i = 1; i <= end; i++) {
    const x0 = Number(disp[i - 1]);
    const x1 = Number(disp[i]);
    const y0 = Number(force[i - 1]);
    const y1 = Number(force[i]);
    if (!Number.isFinite(x0) || !Number.isFinite(x1) || !Number.isFinite(y0) || !Number.isFinite(y1)) continue;
    const dx = x1 - x0;
    if (dx <= 0) continue;
    areaNmm += 0.5 * (y0 + y1) * dx;
  }
  return areaNmm;
}

function effectiveAreaMm2(replica = null) {
  const aCm2 = optionalFiniteNumber(replica?.area_cm2);
  if (Number.isFinite(aCm2) && aCm2 > 0) return aCm2 * 100.0;
  const rd = optionalFiniteNumber(replica?.diameter_mm);
  if (Number.isFinite(rd) && rd > 0) return Math.PI * (rd * rd) / 4;
  const a = optionalFiniteNumber(state.project?.analysis?.area_mm2);
  if (Number.isFinite(a) && a > 0) return a;
  const d = Number(state.project?.analysis?.diameter_mm);
  if (Number.isFinite(d) && d > 0) return Math.PI * (d * d) / 4;
  return null;
}

function effectiveThicknessMm(replica = null) {
  const tr = optionalFiniteNumber(replica?.thickness_mm);
  if (Number.isFinite(tr) && tr > 0) return tr;
  const t = Number(state.project?.analysis?.thickness_mm);
  return Number.isFinite(t) && t > 0 ? t : null;
}

function getReplicaGeometry(replica = null) {
  const areaMm2 = effectiveAreaMm2(replica);
  const thicknessMm = effectiveThicknessMm(replica);
  const rd = optionalFiniteNumber(replica?.diameter_mm);
  const d = optionalFiniteNumber(state.project?.analysis?.diameter_mm);
  return {
    area_mm2: Number.isFinite(areaMm2) ? areaMm2 : 0,
    thickness_mm: Number.isFinite(thicknessMm) ? thicknessMm : 0,
    diameter_mm: Number.isFinite(rd) ? rd : (Number.isFinite(d) ? d : 0),
  };
}

function dispToViewX(dispMm, useStressStrain, thicknessMm) {
  if (useStressStrain && Number.isFinite(thicknessMm) && thicknessMm > 0) {
    return (Number(dispMm) / thicknessMm) * 100.0;
  }
  return Number(dispMm);
}

function forceToViewY(forceN, useStressStrain, areaMm2) {
  if (useStressStrain && Number.isFinite(areaMm2) && areaMm2 > 0) {
    return Number(forceN) / areaMm2;
  }
  return Number(forceN);
}

function viewXToDisp(xView, useStressStrain, thicknessMm) {
  if (useStressStrain && Number.isFinite(thicknessMm) && thicknessMm > 0) {
    return (Number(xView) * thicknessMm) / 100.0;
  }
  return Number(xView);
}

function getPressureAtFmaxMpa(ms) {
  if (!ms || !Number.isFinite(ms.force)) return null;
  const { replica } = getSelectedReplica();
  const area = effectiveAreaMm2(replica);
  if (!Number.isFinite(area) || area <= 0) return null;
  return ms.force / area;
}

function getStrainToFmaxPct(ms, ts) {
  if (!ms || !ts) return null;
  const { replica } = getSelectedReplica();
  const th = effectiveThicknessMm(replica);
  if (!Number.isFinite(th) || th <= 0) return null;
  if (!Number.isFinite(ms.disp) || !Number.isFinite(ts.disp)) return null;
  return Math.max(0, 100 * (ms.disp - ts.disp) / th);
}

function toeModeLabel(mode) {
  if (mode === 'window') return 'window';
  if (mode === 'point') return 'point';
  if (mode === 'default_curvature_rise') return 'default_curvature_rise';
  return 'global';
}

function getDefaultToeSelectionFromState() {
  if (!state.d2?.x?.length) return null;
  const idx = getDefaultToeIndexCurvatureRise(state.d2.x, state.d2.d2);
  const disp = state.d2.x[idx];
  const rawIdx = nearestIndexAny(state.disp, disp);
  return {
    mode: 'default_curvature_rise',
    idx,
    lo: 0,
    hi: Math.max(1, Math.ceil(state.d2.x.length / 2)),
    disp,
    force: state.force[rawIdx],
    d2: state.d2.d2[idx],
    raw_idx: rawIdx,
  };
}

function getToeSelectionForTrim() {
  const selected = getToeSelection();
  if (selected) return selected;
  return getDefaultToeSelectionFromState();
}

function drawPlot() {
  const dpr = resizeCanvas(els.plotCanvas);
  const c = els.plotCanvas;
  const ctx = c.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);

  if (!state.disp.length) {
    ctx.fillStyle = '#666';
    ctx.font = `${14 * dpr}px sans-serif`;
    ctx.fillText('Load a replica to visualize.', 20 * dpr, 30 * dpr);
    state.plotMeta = null;
    return;
  }

  const { replica } = getSelectedReplica();
  const geom = getReplicaGeometry(replica);
  const useStressStrain = Boolean(els.plotUseStressStrain?.checked) && geom.area_mm2 > 0 && geom.thickness_mm > 0;
  const xDisp = (v) => dispToViewX(v, useStressStrain, geom.thickness_mm);
  const yForce = (v) => forceToViewY(v, useStressStrain, geom.area_mm2);

  const m = { l: 84 * dpr, r: 90 * dpr, t: 30 * dpr, b: 62 * dpr };
  const pw = c.width - m.l - m.r;
  const ph = c.height - m.t - m.b;

  const toe = getToeSelection();
  const toeForTrim = getToeSelectionForTrim();
  const trimBeforeToe = Boolean(els.hideBeforeToe?.checked) && Boolean(toeForTrim);
  const viewStartIdx = trimBeforeToe ? clamp(toeForTrim.raw_idx, 0, state.disp.length - 1) : 0;
  const xOffset = trimBeforeToe ? xDisp(state.disp[viewStartIdx]) : 0;
  const xViewFromDisp = (v) => xDisp(v) - xOffset;

  const xMin = xViewFromDisp(state.disp[viewStartIdx]);
  const xMax = xViewFromDisp(state.disp[state.disp.length - 1]);
  let yMin = Infinity;
  let yMax = -Infinity;
  for (let i = viewStartIdx; i < state.force.length; i++) {
    const y = yForce(state.force[i]);
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }
  if (yMax <= yMin) yMax = yMin + 1;
  let d2Min = -1;
  let d2Max = 1;
  if (shouldShowD2() && state.d2?.d2?.length) {
    d2Min = Infinity;
    d2Max = -Infinity;
    for (const v of state.d2.d2) {
      if (!Number.isFinite(v)) continue;
      if (v < d2Min) d2Min = v;
      if (v > d2Max) d2Max = v;
    }
    if (!Number.isFinite(d2Min) || !Number.isFinite(d2Max) || d2Max <= d2Min) {
      d2Min = -1;
      d2Max = 1;
    }
  }

  const xToPx = (x) => m.l + ((x - xMin) / (xMax - xMin || 1)) * pw;
  const yToPx = (y) => m.t + (1 - (y - yMin) / (yMax - yMin || 1)) * ph;
  const y2ToPx = (y) => m.t + (1 - (y - d2Min) / (d2Max - d2Min || 1)) * ph;

  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.4 * dpr;
  ctx.strokeRect(m.l, m.t, pw, ph);

  ctx.fillStyle = '#1f2933';
  ctx.font = `${16 * dpr}px sans-serif`;
  const plotTitle = 'Load-Displacement Curve';
  ctx.fillText(plotTitle, m.l + (pw - ctx.measureText(plotTitle).width) / 2, 20 * dpr);

  const stride = Math.max(1, Math.floor((state.disp.length - viewStartIdx) / 3000));
  ctx.strokeStyle = '#1f77b4';
  ctx.lineWidth = 1.5 * dpr;
  ctx.beginPath();
  for (let i = viewStartIdx; i < state.disp.length; i += stride) {
    const x = xToPx(xViewFromDisp(state.disp[i]));
    const y = yToPx(yForce(state.force[i]));
    if (i === viewStartIdx) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  if (shouldShowD2() && state.d2?.x?.length) {
    ctx.strokeStyle = '#7c2d12';
    ctx.lineWidth = 1.1 * dpr;
    ctx.setLineDash([4 * dpr, 3 * dpr]);
    ctx.beginPath();
    let started = false;
    const stride2 = Math.max(1, Math.floor(state.d2.x.length / 3000));
    for (let i = 0; i < state.d2.x.length; i += stride2) {
      const xVal = xViewFromDisp(state.d2.x[i]);
      if (!Number.isFinite(state.d2.d2[i]) || xVal < xMin) continue;
      const x = xToPx(xVal);
      const y = y2ToPx(state.d2.d2[i]);
      if (!started) {
        ctx.moveTo(x, y);
        started = true;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }
  const lo = state.lo;
  const hi = state.hi;
  const leftIdx = lo;
  const rightIdx = Math.max(lo, hi - 1);
  const xL = xToPx(xViewFromDisp(state.disp[leftIdx]));
  const xR = xToPx(xViewFromDisp(state.disp[rightIdx]));
  const yL = yToPx(yForce(state.force[leftIdx]));
  const yR = yToPx(yForce(state.force[rightIdx]));

  if (hi > lo + 1) {
    ctx.fillStyle = 'rgba(231, 111, 81, 0.12)';
    ctx.fillRect(Math.min(xL, xR), m.t, Math.max(2, Math.abs(xR - xL)), ph);

    ctx.strokeStyle = '#2f3a45';
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.moveTo(xL, m.t);
    ctx.lineTo(xL, m.t + ph);
    ctx.moveTo(xR, m.t);
    ctx.lineTo(xR, m.t + ph);
    ctx.stroke();

    ctx.strokeStyle = '#e76f51';
    ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    for (let i = lo; i < hi; i += stride) {
      const x = xToPx(xViewFromDisp(state.disp[i]));
      const y = yToPx(yForce(state.force[i]));
      if (i === lo) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    const r = 5 * dpr;
    ctx.fillStyle = '#111827';
    ctx.beginPath();
    ctx.arc(xL, yL, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(xR, yR, r, 0, 2 * Math.PI);
    ctx.fill();
  }

  const ms = getCompressiveStrengthSelection();
  if (ms) {
    if (ms.mode === 'window' && ms.hi > ms.lo + 1) {
      const xWL = xToPx(xViewFromDisp(state.disp[ms.lo]));
      const xWR = xToPx(xViewFromDisp(state.disp[Math.max(ms.lo, ms.hi - 1)]));
      const yWL = yToPx(yForce(state.force[ms.lo]));
      const yWR = yToPx(yForce(state.force[Math.max(ms.lo, ms.hi - 1)]));
      ctx.fillStyle = 'rgba(22, 163, 74, 0.08)';
      ctx.fillRect(Math.min(xWL, xWR), m.t, Math.max(2, Math.abs(xWR - xWL)), ph);
      ctx.strokeStyle = 'rgba(22, 163, 74, 0.85)';
      ctx.lineWidth = 1.1 * dpr;
      ctx.beginPath();
      ctx.moveTo(xWL, m.t);
      ctx.lineTo(xWL, m.t + ph);
      ctx.moveTo(xWR, m.t);
      ctx.lineTo(xWR, m.t + ph);
      ctx.stroke();

      ctx.fillStyle = '#166534';
      ctx.beginPath();
      ctx.arc(xWL, yWL, 4.8 * dpr, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(xWR, yWR, 4.8 * dpr, 0, 2 * Math.PI);
      ctx.fill();
    }

    const xM = xToPx(xViewFromDisp(ms.disp));
    const yM = yToPx(yForce(ms.force));
    ctx.strokeStyle = '#166534';
    ctx.lineWidth = 1.2 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(xM, m.t);
    ctx.lineTo(xM, m.t + ph);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#166534';
    ctx.beginPath();
    ctx.arc(xM, yM, 5.2 * dpr, 0, 2 * Math.PI);
    ctx.fill();
  }

  if (toe) {
    const xT = xToPx(xViewFromDisp(toe.disp));
    const yT = yToPx(yForce(toe.force));
    ctx.strokeStyle = '#6d28d9';
    ctx.lineWidth = 1.2 * dpr;
    ctx.setLineDash([3 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(xT, m.t);
    ctx.lineTo(xT, m.t + ph);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#6d28d9';
    ctx.beginPath();
    ctx.arc(xT, yT, 5.0 * dpr, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.fillStyle = '#364152';
  ctx.font = `${14 * dpr}px sans-serif`;
  const xAxisLabel = useStressStrain
    ? (trimBeforeToe ? 'Strain from toe-end (%)' : 'Strain (%)')
    : (trimBeforeToe ? 'Displacement from toe-end (mm)' : 'Displacement (mm)');
  const xAxisW = ctx.measureText(xAxisLabel).width;
  ctx.fillText(xAxisLabel, m.l + (pw - xAxisW) / 2, c.height - 18 * dpr);

  ctx.save();
  ctx.translate((m.l - 56 * dpr), m.t + ph / 2 + 56 * dpr);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText(useStressStrain ? 'Stress (MPa)' : 'Load / Force (N)', 0, 0);
  ctx.restore();

  if (shouldShowD2()) {
    ctx.save();
    ctx.translate(c.width - 12 * dpr, m.t + ph / 2 + 62 * dpr);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('d2F/dd2 (N/mm^2)', 0, 0);
    ctx.restore();
  }

  const xTicks = niceTicks(xMin, xMax, 7);
  ctx.fillStyle = '#52606d';
  ctx.strokeStyle = '#c8ced6';
  ctx.lineWidth = 1;
  ctx.font = `${12 * dpr}px sans-serif`;
  for (const t of xTicks) {
    const x = xToPx(t);
    if (x < m.l - 0.5 * dpr || x > m.l + pw + 0.5 * dpr) continue;
    ctx.beginPath();
    ctx.moveTo(x, m.t + ph);
    ctx.lineTo(x, m.t + ph + 4 * dpr);
    ctx.stroke();
    const tickText = Number(t).toPrecision(3);
    ctx.fillText(tickText, x - ctx.measureText(tickText).width / 2, m.t + ph + 18 * dpr);
  }
  const yTicks = niceTicks(yMin, yMax, 6);
  for (const t of yTicks) {
    const y = yToPx(t);
    ctx.beginPath();
    ctx.moveTo(m.l - 4 * dpr, y);
    ctx.lineTo(m.l, y);
    ctx.stroke();
    const tickText = Number(t).toPrecision(3);
    ctx.fillText(tickText, m.l - 8 * dpr - ctx.measureText(tickText).width, y + 4 * dpr);
  }
  if (shouldShowD2()) {
    const y2Ticks = niceTicks(d2Min, d2Max, 6);
    for (const t of y2Ticks) {
      const y = y2ToPx(t);
      ctx.beginPath();
      ctx.moveTo(m.l + pw, y);
      ctx.lineTo(m.l + pw + 4 * dpr, y);
      ctx.stroke();
      const tickText = Number(t).toPrecision(3);
      ctx.fillText(tickText, m.l + pw + 8 * dpr, y + 4 * dpr);
    }
  }
  ctx.fillStyle = '#1f2933';
  ctx.font = `${12 * dpr}px sans-serif`;
  ctx.fillRect(m.l + 8 * dpr, m.t + 8 * dpr, 8 * dpr, 2 * dpr);
  ctx.fillStyle = '#111827';
  ctx.fillText(useStressStrain ? 'Stress' : 'Force', m.l + 20 * dpr, m.t + 11 * dpr);
  if (shouldShowD2()) {
    ctx.strokeStyle = '#7c2d12';
    ctx.setLineDash([4 * dpr, 3 * dpr]);
    ctx.beginPath();
    ctx.moveTo(m.l + 78 * dpr, m.t + 9 * dpr);
    ctx.lineTo(m.l + 86 * dpr, m.t + 9 * dpr);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#111827';
    ctx.fillText('d2F/dd2', m.l + 90 * dpr, m.t + 11 * dpr);
  }

  state.plotMeta = {
    dpr,
    m,
    pw,
    ph,
    xMin,
    xMax,
    yMin,
    yMax,
    display_mode: useStressStrain ? 'stress_strain' : 'load_disp',
    thickness_mm: geom.thickness_mm,
    area_mm2: geom.area_mm2,
    x_offset: xOffset,
    trim_before_toe: trimBeforeToe,
    left: { x: xL, y: yL, idx: leftIdx },
    right: { x: xR, y: yR, idx: rightIdx },
  };
}

function buildEdges(vals) {
  const n = vals.length;
  if (n === 1) return [vals[0] - 0.5, vals[0] + 0.5];
  const e = new Array(n + 1);
  e[0] = vals[0] - 0.5 * (vals[1] - vals[0]);
  for (let i = 1; i < n; i++) e[i] = 0.5 * (vals[i - 1] + vals[i]);
  e[n] = vals[n - 1] + 0.5 * (vals[n - 1] - vals[n - 2]);
  return e;
}

function scoreColor(v, vMin, vMax) {
  if (!Number.isFinite(v)) return '#ffffff';
  const t = clamp((v - vMin) / ((vMax - vMin) || 1), 0, 1);
  const h = 220 - 170 * t;
  const s = 72;
  const l = 82 - 42 * t;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Legacy canvas heatmap renderer (disabled; kept for fallback).
function drawHeatmapCanvasLegacy() {
  const dpr = resizeCanvas(els.heatmapCanvas);
  const c = els.heatmapCanvas;
  const ctx = c.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, c.width, c.height);

  if (!state.heatmap) {
    ctx.fillStyle = '#666';
    ctx.font = `${13 * dpr}px sans-serif`;
    ctx.fillText('Heatmap unavailable. Load a replica.', 20 * dpr, 26 * dpr);
    state.heatmapMeta = null;
    return;
  }

  const hm = state.heatmap;
  const centers = hm.centers_disp;
  const widthsDisp = hm.widths_disp;
  const grid = hm.score_grid;
  if (!centers.length || !widthsDisp.length) {
    state.heatmapMeta = null;
    return;
  }

  const m = { l: 64 * dpr, r: 16 * dpr, t: 20 * dpr, b: 42 * dpr };
  const pw = c.width - m.l - m.r;
  const ph = c.height - m.t - m.b;
  const xMin = centers[0];
  const xMax = centers[centers.length - 1];
  const yMin = Math.min(...widthsDisp);
  const yMax = Math.max(...widthsDisp);

  const xToPx = (x) => m.l + ((x - xMin) / (xMax - xMin || 1)) * pw;
  const yToPx = (y) => m.t + (1 - (y - yMin) / (yMax - yMin || 1)) * ph;

  const xEdges = buildEdges(centers);
  const yEdges = buildEdges(widthsDisp);

  let vMin = Infinity;
  let vMax = -Infinity;
  const finiteVals = [];
  for (let r = 0; r < grid.length; r++) {
    for (let col = 0; col < grid[r].length; col++) {
      const v = grid[r][col];
      if (!Number.isFinite(v)) continue;
      finiteVals.push(v);
      if (v < vMin) vMin = v;
      if (v > vMax) vMax = v;
    }
  }
  if (!Number.isFinite(vMin) || !Number.isFinite(vMax) || vMin === vMax) {
    vMin = 0;
    vMax = 1;
  } else if (finiteVals.length >= 30) {
    // Robust color scaling prevents a few extreme cells from washing the whole map.
    finiteVals.sort((a, b) => a - b);
    const q = (p) => finiteVals[Math.max(0, Math.min(finiteVals.length - 1, Math.round((finiteVals.length - 1) * p)))];
    const lo = q(0.02);
    const hi = q(0.98);
    if (Number.isFinite(lo) && Number.isFinite(hi) && hi > lo) {
      vMin = lo;
      vMax = hi;
    }
  }

  for (let r = 0; r < widthsDisp.length; r++) {
    for (let col = 0; col < centers.length; col++) {
      const v = grid[r][col];
      const x0 = xToPx(xEdges[col]);
      const x1 = xToPx(xEdges[col + 1]);
      const y0 = yToPx(yEdges[r]);
      const y1 = yToPx(yEdges[r + 1]);
      ctx.fillStyle = scoreColor(v, vMin, vMax);
      ctx.fillRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0) + 0.5, Math.abs(y1 - y0) + 0.5);
    }
  }

  if (state.domains && state.domains.length) {
    const palette = ['#111827', '#b91c1c', '#065f46', '#1d4ed8', '#7c3aed', '#a16207'];
    for (let di = 0; di < state.domains.length; di++) {
      const dom = state.domains[di];
      const color = palette[di % palette.length];
      const set = new Set((dom.cells || []).map((rc) => `${rc[0]}:${rc[1]}`));
      ctx.strokeStyle = color;
      ctx.lineWidth = (di === 0 ? 1.8 : 1.2) * dpr;
      ctx.beginPath();
      for (const rc of dom.cells || []) {
        const rr = rc[0];
        const cc = rc[1];
        const keyL = `${rr}:${cc - 1}`;
        const keyR = `${rr}:${cc + 1}`;
        const keyU = `${rr + 1}:${cc}`;
        const keyD = `${rr - 1}:${cc}`;

        const x0 = xToPx(xEdges[cc]);
        const x1 = xToPx(xEdges[cc + 1]);
        const y0 = yToPx(yEdges[rr]);
        const y1 = yToPx(yEdges[rr + 1]);
        const xl = Math.min(x0, x1);
        const xr = Math.max(x0, x1);
        const yt = Math.min(y0, y1);
        const yb = Math.max(y0, y1);

        if (!set.has(keyL)) { ctx.moveTo(xl, yt); ctx.lineTo(xl, yb); }
        if (!set.has(keyR)) { ctx.moveTo(xr, yt); ctx.lineTo(xr, yb); }
        if (!set.has(keyU)) { ctx.moveTo(xl, yt); ctx.lineTo(xr, yt); }
        if (!set.has(keyD)) { ctx.moveTo(xl, yb); ctx.lineTo(xr, yb); }
      }
      ctx.stroke();
    }
  }

  ctx.strokeStyle = '#111827';
  ctx.lineWidth = 1.4 * dpr;
  ctx.beginPath();
  const isFiniteCell = (rr, cc) =>
    rr >= 0 &&
    rr < widthsDisp.length &&
    cc >= 0 &&
    cc < centers.length &&
    Number.isFinite(grid[rr][cc]);
  for (let r = 0; r < widthsDisp.length; r++) {
    for (let col = 0; col < centers.length; col++) {
      if (!isFiniteCell(r, col)) continue;
      const x0 = xToPx(xEdges[col]);
      const x1 = xToPx(xEdges[col + 1]);
      const y0 = yToPx(yEdges[r]);
      const y1 = yToPx(yEdges[r + 1]);
      const xl = Math.min(x0, x1);
      const xr = Math.max(x0, x1);
      const yt = Math.min(y0, y1);
      const yb = Math.max(y0, y1);
      if (!isFiniteCell(r, col - 1)) { ctx.moveTo(xl, yt); ctx.lineTo(xl, yb); }
      if (!isFiniteCell(r, col + 1)) { ctx.moveTo(xr, yt); ctx.lineTo(xr, yb); }
      if (!isFiniteCell(r + 1, col)) { ctx.moveTo(xl, yt); ctx.lineTo(xr, yt); }
      if (!isFiniteCell(r - 1, col)) { ctx.moveTo(xl, yb); ctx.lineTo(xr, yb); }
    }
  }
  ctx.stroke();

  ctx.strokeStyle = '#d2d6dc';
  ctx.strokeRect(m.l, m.t, pw, ph);

  ctx.fillStyle = '#1f2933';
  ctx.font = `${13 * dpr}px sans-serif`;
  ctx.fillText('Linearity Score Heatmap', m.l + pw / 2 - 62 * dpr, 14 * dpr);

  if (state.disp.length && state.hi > state.lo) {
    const centerIdx = Number(els.centerSlider.value);
    const centerDisp = state.disp[clamp(centerIdx, 0, state.disp.length - 1)];
    const span = state.disp[state.hi - 1] - state.disp[state.lo];
    const xs = xToPx(centerDisp);
    const ys = yToPx(span);

    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 1.3 * dpr;
    ctx.beginPath();
    ctx.moveTo(xs - 8 * dpr, ys); ctx.lineTo(xs + 8 * dpr, ys);
    ctx.moveTo(xs, ys - 8 * dpr); ctx.lineTo(xs, ys + 8 * dpr);
    ctx.stroke();

    ctx.fillStyle = '#e76f51';
    ctx.beginPath();
    ctx.arc(xs, ys, 4.2 * dpr, 0, 2 * Math.PI);
    ctx.fill();
  }

  ctx.fillStyle = '#364152';
  ctx.font = `${12 * dpr}px sans-serif`;
  ctx.fillText('Window center displacement (mm)', m.l + pw / 2 - 86 * dpr, c.height - 10 * dpr);

  ctx.save();
  ctx.translate(14 * dpr, m.t + ph / 2 + 48 * dpr);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Window width (mm)', 0, 0);
  ctx.restore();

  const xTicks = niceTicks(xMin, xMax, 6);
  ctx.fillStyle = '#52606d';
  ctx.strokeStyle = '#c8ced6';
  ctx.lineWidth = 1;
  ctx.font = `${10 * dpr}px sans-serif`;
  for (const t of xTicks) {
    const x = xToPx(t);
    ctx.beginPath();
    ctx.moveTo(x, m.t + ph);
    ctx.lineTo(x, m.t + ph + 4 * dpr);
    ctx.stroke();
    ctx.fillText(Number(t).toPrecision(3), x - 10 * dpr, m.t + ph + 15 * dpr);
  }
  const yTicks = niceTicks(yMin, yMax, 6);
  for (const t of yTicks) {
    const y = yToPx(t);
    ctx.beginPath();
    ctx.moveTo(m.l - 4 * dpr, y);
    ctx.lineTo(m.l, y);
    ctx.stroke();
    ctx.fillText(Number(t).toPrecision(3), 4 * dpr, y + 3 * dpr);
  }

  state.heatmapMeta = { dpr, m, pw, ph, xMin, xMax, yMin, yMax };
}

function pickHeatmapCellLegacy(px, py) {
  const hm = state.heatmap;
  const meta = state.heatmapMeta;
  if (!hm || !meta) return null;

  const x = meta.xMin + ((px - meta.m.l) / (meta.pw || 1)) * (meta.xMax - meta.xMin || 1);
  const y = meta.yMax - ((py - meta.m.t) / (meta.ph || 1)) * (meta.yMax - meta.yMin || 1);

  let c = nearestIndex(hm.centers_disp, x);
  let r = nearestIndex(hm.widths_disp, y);
  if (Number.isFinite(hm.score_grid[r]?.[c])) return { r, c };

  let best = null;
  for (let rr = 0; rr < hm.score_grid.length; rr++) {
    for (let cc = 0; cc < hm.score_grid[rr].length; cc++) {
      const v = hm.score_grid[rr][cc];
      if (!Number.isFinite(v)) continue;
      const d2 = (rr - r) ** 2 + (cc - c) ** 2;
      if (!best || d2 < best.d2) best = { r: rr, c: cc, d2 };
    }
  }
  return best ? { r: best.r, c: best.c } : null;
}

function makeStrictlyIncreasing(values) {
  const src = Array.isArray(values) ? values.map((v) => Number(v)) : [];
  if (!src.length) return { values: [], changed: false };
  const out = src.slice();
  const finite = out.filter((v) => Number.isFinite(v));
  const vmin = finite.length ? Math.min(...finite) : 0;
  const vmax = finite.length ? Math.max(...finite) : 1;
  const eps = Math.max(1e-12, Math.abs(vmax - vmin) * 1e-9);
  let changed = false;
  for (let i = 1; i < out.length; i++) {
    if (!(out[i] > out[i - 1])) {
      out[i] = out[i - 1] + eps;
      changed = true;
    }
  }
  return { values: out, changed };
}

function domainBoundaryContourTrace(domain, hm, color = '#111827', contourAxes = null) {
  const centers = hm?.centers_disp || [];
  const widthsDisp = hm?.widths_disp || [];
  if (!centers.length || !widthsDisp.length || !Array.isArray(domain?.cells) || !domain.cells.length) return null;
  const cx = contourAxes?.x || centers;
  const cy = contourAxes?.y || widthsDisp;
  const rows = widthsDisp.length;
  const cols = centers.length;
  const mask = Array.from({ length: rows }, () => new Array(cols).fill(0));
  for (const rc of domain.cells) {
    const rr = Number(rc?.[0]);
    const cc = Number(rc?.[1]);
    if (!Number.isFinite(rr) || !Number.isFinite(cc)) continue;
    if (rr < 0 || rr >= rows || cc < 0 || cc >= cols) continue;
    mask[rr][cc] = 1;
  }
  return {
    type: 'contour',
    x: cx,
    y: cy,
    z: mask,
    contours: { start: 0.5, end: 0.5, size: 1, coloring: 'none' },
    line: { color, width: 2 },
    hoverinfo: 'skip',
    showscale: false,
    connectgaps: false,
  };
}

function pickHeatmapCellByXY(hm, x, y) {
  if (!hm) return null;
  let c = nearestIndex(hm.centers_disp || [], Number(x));
  let r = nearestIndex(hm.widths_disp || [], Number(y));
  if (Number.isFinite(hm.score_grid?.[r]?.[c])) return { r, c };
  let best = null;
  for (let rr = 0; rr < (hm.score_grid || []).length; rr++) {
    for (let cc = 0; cc < (hm.score_grid[rr] || []).length; cc++) {
      const v = hm.score_grid[rr][cc];
      if (!Number.isFinite(v)) continue;
      const d2 = (rr - r) ** 2 + (cc - c) ** 2;
      if (!best || d2 < best.d2) best = { r: rr, c: cc, d2 };
    }
  }
  return best ? { r: best.r, c: best.c } : null;
}

function windowFeasibilityBoundaryTraces(hm) {
  if (!hm || !Array.isArray(hm.widths_disp) || !state.disp?.length) return [];
  const yVals = hm.widths_disp.filter((v) => Number.isFinite(v));
  if (!yVals.length) return [];
  const yMin = Math.min(...yVals);
  const yMax = Math.max(...yVals);
  const xStart = Number(state.disp[0]);
  const xEnd = Number(state.disp[state.disp.length - 1]);
  if (!Number.isFinite(xStart) || !Number.isFinite(xEnd) || xEnd <= xStart) return [];

  const xLeft = (w) => xStart + 0.5 * w;
  const xRight = (w) => xEnd - 0.5 * w;
  const xLMin = xLeft(yMin);
  const xRMin = xRight(yMin);
  const xLMax = xLeft(yMax);
  const xRMax = xRight(yMax);
  const traces = [];
  const lineStyle = { color: '#1f2937', width: 2 };

  traces.push({
    type: 'scatter',
    mode: 'lines',
    x: [xLMin, xLMax],
    y: [yMin, yMax],
    line: lineStyle,
    hoverinfo: 'skip',
    showlegend: false,
  });
  traces.push({
    type: 'scatter',
    mode: 'lines',
    x: [xRMin, xRMax],
    y: [yMin, yMax],
    line: lineStyle,
    hoverinfo: 'skip',
    showlegend: false,
  });
  traces.push({
    type: 'scatter',
    mode: 'lines',
    x: [xLMin, xRMin],
    y: [yMin, yMin],
    line: lineStyle,
    hoverinfo: 'skip',
    showlegend: false,
  });
  if (xLMax < xRMax - 1e-9) {
    traces.push({
      type: 'scatter',
      mode: 'lines',
      x: [xLMax, xRMax],
      y: [yMax, yMax],
      line: lineStyle,
      hoverinfo: 'skip',
      showlegend: false,
    });
  }
  return traces;
}

function drawHeatmap() {
  if (!els.heatmapPlot || !window.Plotly) {
    if (els.heatmapCanvas) drawHeatmapCanvasLegacy();
    return;
  }
  if (!state.heatmap) {
    els.heatmapPlot.innerHTML = '<div class="muted" style="padding:10px;">Heatmap unavailable. Load a replica.</div>';
    state.heatmapMeta = null;
    return;
  }

  const hm = state.heatmap;
  const centers = hm.centers_disp || [];
  const widthsDisp = hm.widths_disp || [];
  const grid = hm.score_grid || [];
  if (!centers.length || !widthsDisp.length || !grid.length) {
    els.heatmapPlot.innerHTML = '<div class="muted" style="padding:10px;">Heatmap unavailable.</div>';
    state.heatmapMeta = null;
    return;
  }

  const xStart = Number(state.disp?.[0]);
  const xEnd = Number(state.disp?.[state.disp.length - 1]);
  const z = grid.map((row, rr) =>
    row.map((v, cc) => {
      if (!Number.isFinite(v)) return null;
      const w = Number(widthsDisp[rr]);
      const x = Number(centers[cc]);
      if (Number.isFinite(xStart) && Number.isFinite(xEnd) && Number.isFinite(w) && Number.isFinite(x)) {
        const lo = xStart + 0.5 * w;
        const hi = xEnd - 0.5 * w;
        if (x < lo || x > hi) return null;
      }
      return Number(v);
    })
  );
  const rect = els.heatmapPlot.getBoundingClientRect();
  const hasRealSize = Number.isFinite(rect.width) && Number.isFinite(rect.height) && rect.width > 2 && rect.height > 2;
  if (!hasRealSize) {
    const inViz = document.getElementById('vizTab')?.classList.contains('active');
    if (inViz && !state.heatmapDrawRetryTimer) {
      state.heatmapDrawRetryTimer = setTimeout(() => {
        state.heatmapDrawRetryTimer = null;
        drawHeatmap();
      }, 90);
    }
    return;
  }
  const outerW = Math.floor(rect.width);
  const outerH = Math.floor(rect.height);
  const margins = { l: 74, r: 82, t: 36, b: 58 };
  const finite = [];
  for (const row of z) for (const v of row) if (Number.isFinite(v)) finite.push(v);
  let zmin = 0;
  let zmax = 1;
  if (finite.length) {
    zmin = Math.min(...finite);
    zmax = Math.max(...finite);
    if (!(zmax > zmin)) {
      zmin = 0;
      zmax = 1;
    }
  }

  const traces = [
    {
      type: 'heatmap',
      x: centers,
      y: widthsDisp,
      z,
      zmin,
      zmax,
      colorscale: [
        [0.0, '#deebff'],
        [0.25, '#a8c3ec'],
        [0.5, '#7fd6c9'],
        [0.75, '#74dd59'],
        [1.0, '#d8b129'],
      ],
      colorbar: {
        title: { text: 'Score' },
        len: 0.86,
        y: 0.5,
        yanchor: 'middle',
        thickness: 12,
        x: 1.04,
        xanchor: 'left',
        xpad: 6,
      },
      hovertemplate: 'Center: %{x:.4f} mm<br>Width: %{y:.4f} mm<br>Score: %{z:.4f}<extra></extra>',
      connectgaps: false,
      hoverongaps: false,
      zsmooth: false,
      showscale: true,
    },
  ];
  traces.push(...windowFeasibilityBoundaryTraces(hm));

  const cx = makeStrictlyIncreasing(centers);
  const cy = makeStrictlyIncreasing(widthsDisp);
  if (cx.changed || cy.changed) {
    console.info(
      `[heatmap] contour axis adjusted for strict monotonicity (x_changed=${cx.changed}, y_changed=${cy.changed})`
    );
  }
  const contourAxes = { x: cx.values, y: cy.values };

  if (state.domains && state.domains.length) {
    const palette = ['#111827', '#b91c1c', '#065f46', '#1d4ed8', '#7c3aed', '#a16207'];
    for (let i = 0; i < state.domains.length; i++) {
      const tr = domainBoundaryContourTrace(state.domains[i], hm, palette[i % palette.length], contourAxes);
      if (tr) traces.push(tr);
    }
  }

  if (state.disp.length && state.hi > state.lo) {
    const centerIdx = Number(els.centerSlider.value);
    const centerDisp = state.disp[clamp(centerIdx, 0, state.disp.length - 1)];
    const span = state.disp[state.hi - 1] - state.disp[state.lo];
    traces.push({
      type: 'scatter',
      mode: 'markers',
      x: [centerDisp],
      y: [span],
      marker: { color: '#e76f51', size: 8, symbol: 'cross' },
      hovertemplate: 'Selected window<br>Center: %{x:.4f} mm<br>Width: %{y:.4f} mm<extra></extra>',
      showlegend: false,
    });
  }

  const layout = {
    autosize: false,
    width: Math.max(280, Math.floor(outerW)),
    height: Math.max(220, Math.floor(outerH)),
    title: { text: 'Linearity Score Heatmap', x: 0.5, y: 0.98, font: { size: 18 } },
    margin: margins,
    xaxis: {
      title: { text: 'Window center displacement (mm)' },
      zeroline: false,
      showgrid: false,
      gridcolor: '#eef2f7',
      showline: true,
      mirror: true,
      linecolor: '#111827',
      linewidth: 1.2,
      constrain: 'domain',
    },
    yaxis: {
      title: { text: 'Window width (mm)' },
      zeroline: false,
      showgrid: false,
      gridcolor: '#eef2f7',
      showline: true,
      mirror: true,
      linecolor: '#111827',
      linewidth: 1.2,
      constrain: 'domain',
    },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    showlegend: false,
  };
  const config = { responsive: false, displayModeBar: false, staticPlot: false };

  window.Plotly.react(els.heatmapPlot, traces, layout, config).then(() => {
    if (!els.heatmapPlot) return;
    els.heatmapPlot.removeAllListeners?.('plotly_click');
    els.heatmapPlot.on?.('plotly_click', (evt) => {
      if (!state.heatmap || !state.disp.length) return;
      const p = evt?.points?.[0];
      if (!p) return;
      let cell = null;
      if (p.curveNumber === 0 && Array.isArray(p.pointNumber) && p.pointNumber.length >= 2) {
        const rr = Number(p.pointNumber[0]);
        const cc = Number(p.pointNumber[1]);
        if (Number.isFinite(hm.score_grid?.[rr]?.[cc])) cell = { r: rr, c: cc };
      }
      if (!cell) cell = pickHeatmapCellByXY(hm, p.x, p.y);
      if (!cell) return;
      const centerDisp = hm.centers_disp[cell.c];
      const centerIdx = nearestIndex(state.disp, centerDisp);
      const widthN = hm.widths_n[cell.r];
      els.centerSlider.value = String(centerIdx);
      els.widthSlider.value = String(clamp(widthN, Number(els.widthSlider.min), Number(els.widthSlider.max)));
      scheduleUpdate();
    });
  });

  state.heatmapMeta = null;
}

function hoverMode(px, py) {
  const p = state.plotMeta;
  if (!p) return null;
  const radius = 10 * p.dpr;
  const xToPx = (x) => p.m.l + ((x - p.xMin) / (p.xMax - p.xMin || 1)) * p.pw;
  const yToPx = (y) => p.m.t + (1 - (y - p.yMin) / (p.yMax - p.yMin || 1)) * p.ph;
  const useStressStrain = p.display_mode === 'stress_strain';
  const xDisp = (v) => dispToViewX(v, useStressStrain, p.thickness_mm) - (p.x_offset || 0);
  const yForce = (v) => forceToViewY(v, useStressStrain, p.area_mm2);

  if ((els.maxMode.value || 'global') === 'window' && state.disp.length) {
    const [mLo, mHi] = getMaxWindowBoundsFromControls();
    const lIdx = mLo;
    const rIdx = Math.max(mLo, mHi - 1);
    const xL = xToPx(xDisp(state.disp[lIdx]));
    const xR = xToPx(xDisp(state.disp[rIdx]));
    const yL = yToPx(yForce(state.force[lIdx]));
    const yR = yToPx(yForce(state.force[rIdx]));
    const dLeftM = Math.hypot(px - xL, py - yL);
    const dRightM = Math.hypot(px - xR, py - yR);
    const lineTol = 8 * p.dpr;
    if (Math.abs(px - xL) <= lineTol && py >= p.m.t && py <= p.m.t + p.ph) return { target: 'max', mode: 'left' };
    if (Math.abs(px - xR) <= lineTol && py >= p.m.t && py <= p.m.t + p.ph) return { target: 'max', mode: 'right' };
    if (dLeftM <= radius) return { target: 'max', mode: 'left' };
    if (dRightM <= radius) return { target: 'max', mode: 'right' };
    const x0m = Math.min(xL, xR);
    const x1m = Math.max(xL, xR);
    if (px >= x0m && px <= x1m && py >= p.m.t && py <= p.m.t + p.ph) return { target: 'max', mode: 'move' };
  }

  const dLeft = Math.hypot(px - p.left.x, py - p.left.y);
  const dRight = Math.hypot(px - p.right.x, py - p.right.y);
  const lineTol = 8 * p.dpr;
  if (Math.abs(px - p.left.x) <= lineTol && py >= p.m.t && py <= p.m.t + p.ph) return { target: 'fit', mode: 'left' };
  if (Math.abs(px - p.right.x) <= lineTol && py >= p.m.t && py <= p.m.t + p.ph) return { target: 'fit', mode: 'right' };
  if (dLeft <= radius) return { target: 'fit', mode: 'left' };
  if (dRight <= radius) return { target: 'fit', mode: 'right' };
  const x0 = Math.min(p.left.x, p.right.x);
  const x1 = Math.max(p.left.x, p.right.x);
  if (px >= x0 && px <= x1 && py >= p.m.t && py <= p.m.t + p.ph) return { target: 'fit', mode: 'move' };
  return null;
}

function xToIndex(px) {
  if (!state.plotMeta || !state.disp.length) return 0;
  const p = state.plotMeta;
  const xView = p.xMin + ((px - p.m.l) / (p.pw || 1)) * (p.xMax - p.xMin || 1);
  const useStressStrain = p.display_mode === 'stress_strain';
  const xDisp = viewXToDisp(xView + (p.x_offset || 0), useStressStrain, p.thickness_mm);
  return nearestIndex(state.disp, xDisp);
}

function updateThresholdLabel() {
  const v = Number(els.domainThreshold.value || 0.80);
  els.domainThresholdValue.textContent = v.toFixed(3);
}

function getEffectiveDomainThreshold(replica) {
  const gvRaw = optionalFiniteNumber(state.project?.analysis?.domain_threshold_default);
  const gv = Number.isFinite(gvRaw) ? gvRaw : 0.80;
  const ov = optionalFiniteNumber(replica?.domain_threshold_override);
  if (Number.isFinite(ov)) return ov;
  return gv;
}

function applyDomainThresholdForSelection() {
  const { replica } = getSelectedReplica();
  const thr = clamp(getEffectiveDomainThreshold(replica), 0.5, 0.999);
  els.domainThreshold.value = String(thr);
  updateThresholdLabel();
}

function scoreFromLinearFit(lf) {
  const r2 = Number(lf?.r2);
  const relRmse = Number(lf?.rel_rmse);
  if (!Number.isFinite(r2) || !Number.isFinite(relRmse)) return null;
  return r2 * Math.exp(-20 * relRmse);
}

async function fetchJson(url, payload) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) {
    const t = await resp.text();
    throw new Error(t || `${url} failed`);
  }
  return await resp.json();
}

async function releaseDataset(datasetId) {
  if (!datasetId) return;
  try {
    await fetchJson('/api/release-dataset', { dataset_id: datasetId });
  } catch (_) {
  }
}

function cloneDomainsLite(domains) {
  return Array.isArray(domains) ? JSON.parse(JSON.stringify(domains)) : [];
}

function normalizeReplicaVizUi(raw) {
  const v = (raw && typeof raw === 'object') ? raw : {};
  const maxModeRaw = String(v.max_mode || '').toLowerCase();
  const maxMode = ['global', 'window', 'point'].includes(maxModeRaw) ? maxModeRaw : null;
  const fitCenter = optionalFiniteNumber(v.fit_center_idx);
  const fitWidth = optionalFiniteNumber(v.fit_width_n);
  const maxCenter = optionalFiniteNumber(v.max_center_idx);
  const maxWidth = optionalFiniteNumber(v.max_width_n);
  const maxPoint = optionalFiniteNumber(v.max_point_idx);
  const out = {
    fit_center_idx: Number.isFinite(fitCenter) ? Math.round(fitCenter) : null,
    fit_width_n: Number.isFinite(fitWidth) ? Math.round(fitWidth) : null,
    max_mode: maxMode,
    max_center_idx: Number.isFinite(maxCenter) ? Math.round(maxCenter) : null,
    max_width_n: Number.isFinite(maxWidth) ? Math.round(maxWidth) : null,
    max_point_idx: Number.isFinite(maxPoint) ? Math.round(maxPoint) : null,
  };
  const hasAny = Object.values(out).some((x) => x !== null);
  return hasAny ? out : null;
}

function normalizeReplicaCache(raw) {
  const c = (raw && typeof raw === 'object') ? raw : {};
  const status = String(c.status || 'none');
  return {
    status: (status === 'ok' || status === 'error' || status === 'running') ? status : 'none',
    updated_at: c.updated_at || null,
    threshold: Number.isFinite(Number(c.threshold)) ? Number(c.threshold) : null,
    n_points: Number.isFinite(Number(c.n_points)) ? Number(c.n_points) : null,
    n_domains: Number.isFinite(Number(c.n_domains)) ? Number(c.n_domains) : null,
    best_domain_id: Number.isFinite(Number(c.best_domain_id)) ? Number(c.best_domain_id) : null,
    representative: c.representative && typeof c.representative === 'object' ? c.representative : null,
    domains: cloneDomainsLite(c.domains || []),
    metrics: c.metrics && typeof c.metrics === 'object' ? c.metrics : null,
    score: Number.isFinite(Number(c.score)) ? Number(c.score) : null,
    compressive_strength_n: Number.isFinite(Number(c.compressive_strength_n)) ? Number(c.compressive_strength_n) : null,
    compressive_disp_mm: Number.isFinite(Number(c.compressive_disp_mm)) ? Number(c.compressive_disp_mm) : null,
    compressive_pressure_mpa: Number.isFinite(Number(c.compressive_pressure_mpa)) ? Number(c.compressive_pressure_mpa) : null,
    strain_to_fmax_pct: Number.isFinite(Number(c.strain_to_fmax_pct)) ? Number(c.strain_to_fmax_pct) : null,
    compressive_energy_mj: Number.isFinite(Number(c.compressive_energy_mj)) ? Number(c.compressive_energy_mj) : null,
    compressive_idx: Number.isFinite(Number(c.compressive_idx)) ? Number(c.compressive_idx) : null,
    compressive_mode: c.compressive_mode ? String(c.compressive_mode) : null,
    toe_disp_mm: Number.isFinite(Number(c.toe_disp_mm)) ? Number(c.toe_disp_mm) : null,
    toe_force_n: Number.isFinite(Number(c.toe_force_n)) ? Number(c.toe_force_n) : null,
    toe_d2_n_per_mm2: Number.isFinite(Number(c.toe_d2_n_per_mm2)) ? Number(c.toe_d2_n_per_mm2) : null,
    toe_idx: Number.isFinite(Number(c.toe_idx)) ? Number(c.toe_idx) : null,
    toe_mode: c.toe_mode ? String(c.toe_mode) : null,
    young_modulus_mpa: Number.isFinite(Number(c.young_modulus_mpa)) ? Number(c.young_modulus_mpa) : null,
    heatmap: c.heatmap && typeof c.heatmap === 'object' ? c.heatmap : null,
    curve_ref: c.curve_ref && typeof c.curve_ref === 'object' ? c.curve_ref : null,
    viz_ui: normalizeReplicaVizUi(c.viz_ui),
    error: c.error ? String(c.error) : null,
  };
}

function hasUsableCurveCache(data) {
  return Boolean(
    data
      && Array.isArray(data.disp)
      && Array.isArray(data.force)
      && data.disp.length >= 2
      && data.disp.length === data.force.length
  );
}

function rebuildReplicaDataCacheFromProject() {
  state.replicaDataCache = {};
  for (const s of state.project?.samples || []) {
    for (const r of s.replicas || []) {
      const cref = r?.cache?.curve_ref;
      if (!cref || typeof cref !== 'object') continue;
      const disp = Array.isArray(cref.disp) ? cref.disp : [];
      const force = Array.isArray(cref.force) ? cref.force : [];
      if (disp.length < 2 || force.length < 2 || disp.length !== force.length) continue;
      const d2x = Array.isArray(cref.d2_x) ? cref.d2_x : [];
      const d2y = Array.isArray(cref.d2_y) ? cref.d2_y : [];
      const data = {
        cfg_key: String(cref.cfg_key || ''),
        n_points: Number.isFinite(Number(cref.n_points)) ? Number(cref.n_points) : disp.length,
        disp,
        force,
      };
      if (d2x.length && d2x.length === d2y.length) data.d2 = { x: d2x, d2: d2y };
      state.replicaDataCache[replicaDataCacheKey(s.id, r.id)] = data;
    }
  }
}

function setReplicaCache(replica, next) {
  replica.cache = normalizeReplicaCache({ ...(replica.cache || {}), ...(next || {}) });
  markProjectChanged('replica cache');
  queueProjectAutosave('replica cache');
}

function persistSelectedReplicaVizUiState(reason = 'viz ui') {
  const { sample, replica } = getSelectedReplica();
  if (!sample || !replica || !state.disp?.length) return;
  const n = state.disp.length;
  const fitCenter = clamp(Math.round(Number(els.centerSlider?.value || 0)), 0, Math.max(0, n - 1));
  const fitWidth = clamp(Math.round(Number(els.widthSlider?.value || 3)), 3, Math.max(3, n));
  const maxMode = ['global', 'window', 'point'].includes(String(els.maxMode?.value || 'global'))
    ? String(els.maxMode.value)
    : 'global';
  const maxCenter = clamp(Math.round(Number(els.maxCenterSlider?.value || 0)), 0, Math.max(0, n - 1));
  const maxWidth = clamp(Math.round(Number(els.maxWidthSlider?.value || 1)), 1, Math.max(1, n));
  const maxPoint = clamp(Math.round(Number(els.maxPointSlider?.value || 0)), 0, Math.max(0, n - 1));
  const snapshot = normalizeReplicaVizUi({
    fit_center_idx: fitCenter,
    fit_width_n: fitWidth,
    max_mode: maxMode,
    max_center_idx: maxCenter,
    max_width_n: maxWidth,
    max_point_idx: maxPoint,
  });
  const prev = normalizeReplicaVizUi(replica?.cache?.viz_ui);
  if (JSON.stringify(prev) === JSON.stringify(snapshot)) return;
  replica.cache = normalizeReplicaCache({ ...(replica.cache || {}), viz_ui: snapshot });
  markProjectChanged(reason);
  queueProjectAutosave(reason);
}

function applyReplicaVizUiState(replica) {
  const ui = normalizeReplicaVizUi(replica?.cache?.viz_ui);
  if (!ui || !state.disp?.length) return { fitApplied: false, maxApplied: false };
  const n = state.disp.length;
  let fitApplied = false;
  let maxApplied = false;
  if (Number.isFinite(ui.fit_center_idx)) {
    els.centerSlider.value = String(clamp(ui.fit_center_idx, Number(els.centerSlider.min), Number(els.centerSlider.max)));
    fitApplied = true;
  }
  if (Number.isFinite(ui.fit_width_n)) {
    els.widthSlider.value = String(clamp(ui.fit_width_n, Number(els.widthSlider.min), Number(els.widthSlider.max)));
    fitApplied = true;
  }
  if (ui.max_mode) {
    els.maxMode.value = ui.max_mode;
    state.maxModePrev = ui.max_mode;
    maxApplied = true;
  }
  if (Number.isFinite(ui.max_center_idx)) {
    els.maxCenterSlider.value = String(clamp(ui.max_center_idx, Number(els.maxCenterSlider.min), Number(els.maxCenterSlider.max)));
    maxApplied = true;
  }
  if (Number.isFinite(ui.max_width_n)) {
    els.maxWidthSlider.value = String(clamp(ui.max_width_n, Number(els.maxWidthSlider.min), Number(els.maxWidthSlider.max)));
    maxApplied = true;
  }
  if (Number.isFinite(ui.max_point_idx)) {
    els.maxPointSlider.value = String(clamp(ui.max_point_idx, Number(els.maxPointSlider.min), Number(els.maxPointSlider.max)));
    maxApplied = true;
  }
  syncWindowFromControls();
  syncMaxControlsVisibility();
  syncMaxLabels();
  return { fitApplied, maxApplied };
}

async function refreshReplicaAfterGeometryChange(sample, replica) {
  if (!sample || !replica) return;
  markProjectChanged('replica geometry');
  queueProjectAutosave('replica geometry');

  const isSelected = els.vizSampleSelect.value === sample.id && els.vizReplicaSelect.value === replica.id;
  if (isSelected) {
    scheduleUpdate();
    if (state.datasetId && state.loadedSampleId === sample.id && state.loadedReplicaId === replica.id) {
      detectDomains().catch((err) => {
        setDomainsSummary(`Domains summary (error): ${err}`);
        renderDomainsTable([]);
      });
    }
  }

  if (replica.csv_text) {
    precomputeReplica(sample, replica).catch((err) => {
      setPrecomputeInfo(`Replica recompute failed: ${err}`);
    });
  } else {
    renderSummaryFromCache();
  }
}

function isUnknownDatasetError(err) {
  const s = String(err || '');
  return s.includes('Unknown dataset_id');
}

async function precomputeReplica(sample, replica) {
  ensureReplicaGeometryFromFilename(replica);
  if (!replica.csv_text) {
    setReplicaCache(replica, {
      status: 'error',
      updated_at: new Date().toISOString(),
      error: 'Missing CSV content',
    });
    renderSamplesList();
    return;
  }
  setReplicaCache(replica, { status: 'running', updated_at: new Date().toISOString(), error: null });
  renderSamplesList();

  let datasetId = null;
  try {
    const geom = getReplicaGeometry(replica);
    const analyze = await fetchJson('/api/analyze-csv', {
      csv_name: replica.file_name || replica.name,
      csv_text: replica.csv_text,
      io: state.project.io,
      analysis: state.project.analysis,
    });
    datasetId = analyze.dataset_id;
    state.replicaDataCache[replicaDataCacheKey(sample.id, replica.id)] = {
      ...analyze,
      dataset_id: null,
      cfg_key: analysisCacheKey(state.project),
    };

    const threshold = clamp(getEffectiveDomainThreshold(replica), 0.5, 0.999);
    const domainsRes = await fetchJson('/api/domains', {
      dataset_id: datasetId,
      min_score: threshold,
      area_mm2: geom.area_mm2,
      diameter_mm: geom.diameter_mm,
      thickness_mm: geom.thickness_mm,
    });

    const domains = domainsRes.domains || [];
    const best = domains.find((d) => d.id === domainsRes.best_domain_id) || domains[0] || null;
    const rep = best?.representative || null;

    let metrics = null;
    if (rep && Number.isFinite(Number(rep.center_idx)) && Number.isFinite(Number(rep.width_n))) {
      metrics = await fetchJson('/api/metrics', {
        dataset_id: datasetId,
        center_idx: Number(rep.center_idx),
        width_n: Number(rep.width_n),
        min_valid_points: Number(state.project.analysis.min_valid_points),
        area_mm2: geom.area_mm2,
        diameter_mm: geom.diameter_mm,
        thickness_mm: geom.thickness_mm,
      });
    }

    const score = scoreFromLinearFit(metrics?.linear_fit || best?.representative || {});
    const includeHeatmap = Boolean(state.project.ui?.include_heatmap_in_export);
    const gIdx = Array.isArray(analyze.force) && analyze.force.length ? findMaxIndexInRange(analyze.force, 0, analyze.force.length) : 0;
    const gForce = Array.isArray(analyze.force) ? Number(analyze.force[gIdx]) : null;
    const gDisp = Array.isArray(analyze.disp) ? Number(analyze.disp[gIdx]) : null;
    const gPressure = (Number.isFinite(gForce) && Number.isFinite(geom.area_mm2) && geom.area_mm2 > 0)
      ? (gForce / geom.area_mm2)
      : null;
    const gEnergy = (Array.isArray(analyze.disp) && Array.isArray(analyze.force))
      ? integrateEnergyToIndex(analyze.disp, analyze.force, gIdx)
      : null;
    const d2Series = (Array.isArray(analyze.disp) && Array.isArray(analyze.force))
      ? computeSecondDerivativeSeries(analyze.disp, analyze.force, 25)
      : { x: [], d2: [] };
    const cacheKey = replicaDataCacheKey(sample.id, replica.id);
    if (state.replicaDataCache[cacheKey]) {
      state.replicaDataCache[cacheKey].d2 = d2Series;
    }
    const toeIdx = d2Series.x.length ? getDefaultToeIndexCurvatureRise(d2Series.x, d2Series.d2) : null;
    const toeDisp = Number.isFinite(toeIdx) ? d2Series.x[toeIdx] : null;
    const toeRawIdx = Number.isFinite(toeDisp) ? nearestIndexAny(analyze.disp, toeDisp) : null;
    const toeForce = Number.isFinite(toeRawIdx) ? Number(analyze.force[toeRawIdx]) : null;
    const toeD2 = Number.isFinite(toeIdx) ? Number(d2Series.d2[toeIdx]) : null;
    const gDispFromToe = (Number.isFinite(gDisp) && Number.isFinite(toeDisp))
      ? Math.max(0, gDisp - toeDisp)
      : gDisp;
    const toeStrain = (Number.isFinite(gDisp) && Number.isFinite(toeDisp) && Number.isFinite(geom.thickness_mm) && geom.thickness_mm > 0)
      ? Math.max(0, 100 * (gDisp - toeDisp) / geom.thickness_mm)
      : null;

    setReplicaCache(replica, {
      status: 'ok',
      updated_at: new Date().toISOString(),
      threshold,
      n_points: Number(analyze.n_points),
      n_domains: Number(domainsRes.n_domains || 0),
      best_domain_id: Number.isFinite(Number(domainsRes.best_domain_id)) ? Number(domainsRes.best_domain_id) : null,
      representative: rep,
      domains,
      metrics,
      score,
      compressive_strength_n: Number.isFinite(gForce) ? gForce : null,
      compressive_disp_mm: Number.isFinite(gDispFromToe) ? gDispFromToe : null,
      compressive_pressure_mpa: Number.isFinite(gPressure) ? gPressure : null,
      strain_to_fmax_pct: Number.isFinite(toeStrain) ? toeStrain : null,
      compressive_energy_mj: Number.isFinite(gEnergy) ? gEnergy : null,
      compressive_idx: Number.isFinite(gIdx) ? gIdx : null,
      compressive_mode: 'global',
      toe_disp_mm: Number.isFinite(toeDisp) ? toeDisp : null,
      toe_force_n: Number.isFinite(toeForce) ? toeForce : null,
      toe_d2_n_per_mm2: Number.isFinite(toeD2) ? toeD2 : null,
      toe_idx: Number.isFinite(toeIdx) ? toeIdx : null,
      toe_mode: 'default_curvature_rise',
      young_modulus_mpa: Number(metrics?.young_modulus?.young_modulus_mpa),
      heatmap: includeHeatmap ? analyze.heatmap || null : null,
      error: null,
    });
  } catch (err) {
    setReplicaCache(replica, {
      status: 'error',
      updated_at: new Date().toISOString(),
      error: String(err),
    });
  } finally {
    await releaseDataset(datasetId);
    renderSamplesList();
    renderSummaryFromCache();
  }
}

function enqueuePrecomputeItems(items) {
  if (!Array.isArray(items) || !items.length) return;
  const seen = new Set(state.precomputeQueue.map((it) => `${it.sample.id}::${it.replica.id}`));
  for (const item of items) {
    if (!item?.sample?.id || !item?.replica?.id) continue;
    const key = `${item.sample.id}::${item.replica.id}`;
    if (seen.has(key)) continue;
    if (item.replica?.cache?.status === 'running') continue;
    state.precomputeQueue.push(item);
    seen.add(key);
  }
  runPrecomputeQueue().catch((err) => {
    setPrecomputeInfo(`Precompute queue failed: ${err}`);
    state.precomputeQueueRunning = false;
  });
}

async function runPrecomputeQueue() {
  if (state.precomputeQueueRunning) return;
  state.precomputeQueueRunning = true;
  try {
    while (state.precomputeQueue.length) {
      const item = state.precomputeQueue.shift();
      if (!item?.sample || !item?.replica) continue;
      const total = state.precomputeQueue.length + 1;
      setPrecomputeInfo(`Precomputing queued item (${total} pending): ${item.sample.name}/${item.replica.name}`);
      await precomputeReplica(item.sample, item.replica);
    }
    setPrecomputeInfo('Precompute queue complete.');
    renderSummaryFromCache();
  } finally {
    state.precomputeQueueRunning = false;
  }
}

async function waitForPrecomputeIdle(timeoutMs = 300000) {
  const t0 = Date.now();
  while (state.precomputeQueueRunning || state.precomputeQueue.length) {
    if (Date.now() - t0 > timeoutMs) throw new Error('Timed out waiting for precompute queue.');
    await new Promise((resolve) => setTimeout(resolve, 120));
  }
}

async function warmupMissingCurveCaches() {
  if (state.curveWarmupRunning || !state.project) return;
  const items = [];
  for (const s of state.project.samples || []) {
    for (const r of s.replicas || []) {
      const key = replicaDataCacheKey(s.id, r.id);
      if (hasUsableCurveCache(state.replicaDataCache[key])) continue;
      if (!r?.csv_text) continue;
      items.push({ sample: s, replica: r });
    }
  }
  if (!items.length) return;

  state.curveWarmupRunning = true;
  const cfgKey = analysisCacheKey(state.project);
  try {
    for (let i = 0; i < items.length; i++) {
      const { sample, replica } = items[i];
      setPrecomputeInfo(`Preparing curves ${i + 1}/${items.length}: ${sample.name}/${replica.name}`);
      try {
        const analyze = await fetchJson('/api/analyze-csv', {
          csv_name: replica.file_name || replica.name,
          csv_text: replica.csv_text,
          io: state.project.io,
          analysis: state.project.analysis,
        });
        const key = replicaDataCacheKey(sample.id, replica.id);
        const data = {
          cfg_key: cfgKey,
          n_points: Number(analyze.n_points),
          disp: Array.isArray(analyze.disp) ? analyze.disp : [],
          force: Array.isArray(analyze.force) ? analyze.force : [],
        };
        if (Array.isArray(analyze?.d2?.x) && Array.isArray(analyze?.d2?.d2) && analyze.d2.x.length === analyze.d2.d2.length) {
          data.d2 = analyze.d2;
        } else if (Array.isArray(data.disp) && Array.isArray(data.force) && data.disp.length > 1) {
          data.d2 = computeSecondDerivativeSeries(data.disp, data.force, 25);
        }
        state.replicaDataCache[key] = data;
        await releaseDataset(analyze.dataset_id || null);
      } catch (_) {
      }
    }
  } finally {
    state.curveWarmupRunning = false;
    setPrecomputeInfo('Ready.');
    renderSummaryFromCache();
    const inViz = document.getElementById('vizTab')?.classList.contains('active');
    if (inViz) maybeAutoLoadSelectedReplica();
  }
}

async function precomputeAllReplicas(replicas = null) {
  syncProjectFromConfigForm();
  const items = [];
  if (Array.isArray(replicas) && replicas.length) {
    for (const item of replicas) items.push(item);
  } else {
    for (const s of state.project.samples || []) {
      for (const r of s.replicas || []) items.push({ sample: s, replica: r });
    }
  }

  if (!items.length) {
    setPrecomputeInfo('No replicas to precompute.');
    return;
  }
  enqueuePrecomputeItems(items);
  await waitForPrecomputeIdle();
  setPrecomputeInfo(`Precompute complete for ${items.length} replica(s).`);
}

async function loadSelectedReplica() {
  syncProjectFromConfigForm();
  const { sample, replica } = getSelectedReplica();
  if (!sample || !replica) {
    els.vizInfo.textContent = 'Select a sample/replica first.';
    return;
  }
  const reqKey = replicaDataCacheKey(sample.id, replica.id);
  if (state.loadingReplicaKey === reqKey) return;
  state.loadingReplicaKey = reqKey;
  try {
    ensureReplicaGeometryFromFilename(replica);
    applyDomainThresholdForSelection();

    els.vizInfo.textContent = 'Loading replica...';
    const payload = {
      csv_name: replica.file_name || replica.name,
      csv_text: replica.csv_text,
      io: state.project.io,
      analysis: state.project.analysis,
    };

    const dataKey = replicaDataCacheKey(sample.id, replica.id);
    const cfgKey = analysisCacheKey(state.project);
    let data = state.replicaDataCache[dataKey];
    if (!data || data.cfg_key !== cfgKey || !Array.isArray(data.disp) || !Array.isArray(data.force) || !data.disp.length) {
      try {
        data = await fetchJson('/api/analyze-csv', payload);
        data.cfg_key = cfgKey;
        state.replicaDataCache[dataKey] = data;
      } catch (err) {
        els.metrics.textContent = `Error: ${err}`;
        return;
      }
    }

    const hasCachedMetrics = hasUsableCachedMetrics(replica);
    const hasCachedDomains = hasUsableCachedDomains(replica);
    const needBackendNow = !hasCachedMetrics || !hasCachedDomains;
    if (needBackendNow && !data.dataset_id) {
      try {
        data = await fetchJson('/api/analyze-csv', payload);
        data.cfg_key = cfgKey;
        state.replicaDataCache[dataKey] = data;
      } catch (err) {
        els.metrics.textContent = `Error: ${err}`;
        return;
      }
    }

    state.datasetId = data.dataset_id || null;
    state.loadedSampleId = sample.id;
    state.loadedReplicaId = replica.id;
    state.disp = data.disp;
    state.force = data.force;
    if (!data.d2 || !Array.isArray(data.d2.x) || !Array.isArray(data.d2.d2) || !data.d2.x.length) {
      data.d2 = computeSecondDerivativeSeries(state.disp, state.force, 25);
      state.replicaDataCache[dataKey] = data;
    }
    state.d2 = data.d2;
    drawPlot();
    state.heatmap = data.heatmap || replica.cache?.heatmap || null;
    state.domains = [];
    if (state.project.ui?.include_heatmap_in_export && state.heatmap) {
      setReplicaCache(replica, { heatmap: state.heatmap });
    }

    const n = state.disp.length;
    els.centerSlider.min = '0';
    els.centerSlider.max = String(Math.max(0, n - 1));
    els.centerSlider.step = '1';
    els.centerSlider.value = String(Math.floor(n / 2));

    const widthDefault = Math.max(3, Number(state.project.analysis.window_step_n || 10) * 20);
    els.widthSlider.min = '3';
    els.widthSlider.max = String(Math.max(3, n));
    els.widthSlider.step = '1';
    els.widthSlider.value = String(Math.min(n, widthDefault));

    els.maxCenterSlider.min = '0';
    els.maxCenterSlider.max = String(Math.max(0, n - 1));
    els.maxCenterSlider.step = '1';
    els.maxCenterSlider.value = String(Math.floor(n / 2));

    els.maxWidthSlider.min = '1';
    els.maxWidthSlider.max = String(Math.max(1, n));
    els.maxWidthSlider.step = '1';
    els.maxWidthSlider.value = String(Math.max(1, Math.round(0.2 * n)));

    const n2 = state.d2?.x?.length || 0;
    els.toePointSlider.min = '0';
    els.toePointSlider.max = String(Math.max(0, n2 - 1));
    els.toePointSlider.step = '1';
    const toeDefaultIdx = getDefaultToeIndexCurvatureRise(state.d2?.x || [], state.d2?.d2 || []);
    els.toePointSlider.value = String(toeDefaultIdx);

    let globalMaxIdx = 0;
    let globalMaxVal = -Infinity;
    for (let i = 0; i < n; i++) {
      if (state.force[i] > globalMaxVal) {
        globalMaxVal = state.force[i];
        globalMaxIdx = i;
      }
    }
    els.maxPointSlider.min = '0';
    els.maxPointSlider.max = String(Math.max(0, n - 1));
    els.maxPointSlider.step = '1';
    els.maxPointSlider.value = String(globalMaxIdx);
    setMaxWindowAroundIndex(globalMaxIdx);
    state.maxModePrev = els.maxMode.value || 'global';
    syncMaxControlsVisibility();
    syncMaxLabels();
    state.toeModePrev = els.toeMode.value || 'global';
    syncToeControlsVisibility();
    syncToeLabels();

    const restoredUi = applyReplicaVizUiState(replica);
    if (!restoredUi.fitApplied && replica.cache?.status === 'ok' && replica.cache?.representative) {
      const rep = replica.cache.representative;
      const ci = clamp(Number(rep.center_idx), Number(els.centerSlider.min), Number(els.centerSlider.max));
      const wn = clamp(Number(rep.width_n), Number(els.widthSlider.min), Number(els.widthSlider.max));
      if (Number.isFinite(ci) && Number.isFinite(wn)) {
        els.centerSlider.value = String(ci);
        els.widthSlider.value = String(wn);
      }
    }
    if (replica.cache?.status === 'ok' && Number.isFinite(Number(replica.cache.toe_idx))) {
      const ti = clamp(Number(replica.cache.toe_idx), Number(els.toePointSlider.min), Number(els.toePointSlider.max));
      els.toePointSlider.value = String(ti);
      if (replica.cache.toe_mode && ['global', 'point'].includes(replica.cache.toe_mode)) {
        els.toeMode.value = replica.cache.toe_mode;
      }
      syncToeLabels();
      syncToeControlsVisibility();
    }

    els.vizInfo.textContent = `${sample.name} / ${replica.name} (${n} points)`;
    if (replica.cache?.status === 'ok' && replica.cache?.metrics) {
      syncWindowFromControls();
      drawPlot();
      els.metrics.textContent = metricsTextFromResult(replica.cache.metrics);
    } else {
      await updateMetrics();
    }

    if (hasUsableCachedDomains(replica)) {
      state.domains = cloneDomainsLite(replica.cache.domains);
      drawHeatmap();
      setDomainsSummary(
        `Domains summary: ${replica.cache.n_domains || state.domains.length} domain(s), threshold=${format(replica.cache.threshold, 4)} (cached)`
      );
      renderDomainsTable(state.domains);
    } else {
      await detectDomains();
    }
  } finally {
    state.loadingReplicaKey = null;
  }
}

function metricsTextFromResult(m) {
  const lf = m?.linear_fit || {};
  const ym = m?.young_modulus || {};
  const w = m?.window || {};
  const score = scoreFromLinearFit(lf);
  const ms = getCompressiveStrengthSelection();
  const ts = getToeSelection() || getDefaultToeSelectionFromState();
  const energyToMax = ms ? integrateEnergyToIndex(state.disp, state.force, ms.idx) : null;
  const pressureAtFmax = getPressureAtFmaxMpa(ms);
  const dispToFmax = (Number.isFinite(ms?.disp) && Number.isFinite(ts?.disp)) ? Math.max(0, ms.disp - ts.disp) : ms?.disp ?? null;
  const strainToFmax = getStrainToFmaxPct(ms, ts);
  const modeLabel = ms ? (ms.mode === 'window' ? 'window' : ms.mode === 'point' ? 'point' : 'global') : 'n/a';
  const toeModeStr = ts ? toeModeLabel(ts.mode) : 'n/a';
  return [
    `Window: idx ${w.lo_idx ?? 'n/a'}..${Number.isFinite(w.hi_idx) ? (w.hi_idx - 1) : 'n/a'} (${w.n_points ?? 'n/a'} pts)`,
    `Disp range: ${format(w.disp_lo, 6)} .. ${format(w.disp_hi, 6)} mm`,
    '',
    `slope dF/ddisp: ${format(lf.slope_n_per_mm, 6)} N/mm`,
    `intercept:      ${format(lf.intercept_n, 6)} N`,
    `linear R2:      ${format(lf.r2, 6)}`,
    `rel RMSE:       ${format(lf.rel_rmse, 6)}`,
    `score:          ${format(score, 6)}  (R2 * exp(-20*rel_rmse))`,
    '',
    `E (MPa):       ${format(ym.young_modulus_mpa, 6)}`,
    `area used:     ${format(ym.area_mm2_used, 6)} mm^2`,
    `thickness used:${format(ym.thickness_mm, 6)} mm`,
    '',
    `compressive mode: ${modeLabel}`,
    `Fmax:            ${format(ms?.force, 6)} N`,
    `at disp:         ${format(ms?.disp, 6)} mm (idx ${ms?.idx ?? 'n/a'})`,
    `disp from toe:   ${format(dispToFmax, 6)} mm`,
    `P@Fmax:          ${format(pressureAtFmax, 6)} MPa`,
    `strain to Fmax:  ${format(strainToFmax, 6)} %`,
    `energy to Fmax:  ${format(energyToMax, 6)} mJ`,
    ...(ms?.mode === 'window'
      ? [`window range:   ${format(state.disp[ms.lo], 6)}..${format(state.disp[Math.max(ms.lo, ms.hi - 1)], 6)} mm`]
      : []),
    '',
    `toe mode:        ${toeModeStr}`,
    `toe end disp:    ${format(ts?.disp, 6)} mm (idx ${ts?.idx ?? 'n/a'})`,
    `toe end force:   ${format(ts?.force, 6)} N`,
    `toe d2:          ${format(ts?.d2, 6)} N/mm^2`,
  ].join('\n');
}

async function updateMetrics() {
  if (!state.disp.length) return;
  if (!state.datasetId) {
    try {
      const ok = await ensureDatasetForSelectedReplica();
      if (!ok) return;
    } catch (err) {
      els.metrics.textContent = `Error: ${err}`;
      return;
    }
  }

  syncWindowFromControls();
  drawPlot();
  drawHeatmap();

  const a = state.project.analysis;
  const { replica } = getSelectedReplica();
  const geom = getReplicaGeometry(replica);
  const payload = {
    dataset_id: state.datasetId,
    center_idx: Number(els.centerSlider.value),
    width_n: Number(els.widthSlider.value),
    min_valid_points: Number(a.min_valid_points),
    area_mm2: geom.area_mm2,
    diameter_mm: geom.diameter_mm,
    thickness_mm: geom.thickness_mm,
  };

  let m;
  try {
    m = await fetchJson('/api/metrics', payload);
  } catch (err) {
    if (isUnknownDatasetError(err)) {
      const { sample, replica } = getSelectedReplica();
      if (sample && replica) {
        delete state.replicaDataCache[replicaDataCacheKey(sample.id, replica.id)];
      }
      await loadSelectedReplica();
      return;
    }
    els.metrics.textContent = `Error: ${err}`;
    return;
  }
  const lf = m.linear_fit || {};
  const ym = m.young_modulus || {};
  const score = scoreFromLinearFit(lf);
  const ms = getCompressiveStrengthSelection();
  const ts = getToeSelection() || getDefaultToeSelectionFromState();
  const energyToMax = ms ? integrateEnergyToIndex(state.disp, state.force, ms.idx) : null;
  const pressureAtFmax = getPressureAtFmaxMpa(ms);
  const dispToFmax = (Number.isFinite(ms?.disp) && Number.isFinite(ts?.disp)) ? Math.max(0, ms.disp - ts.disp) : ms?.disp ?? null;
  const strainToFmax = getStrainToFmaxPct(ms, ts);
  els.metrics.textContent = metricsTextFromResult(m);

  if (replica) {
    setReplicaCache(replica, {
      status: 'ok',
      updated_at: new Date().toISOString(),
      metrics: m,
      score,
      compressive_strength_n: ms?.force ?? null,
      compressive_disp_mm: Number.isFinite(dispToFmax) ? dispToFmax : null,
      compressive_pressure_mpa: Number.isFinite(pressureAtFmax) ? pressureAtFmax : null,
      strain_to_fmax_pct: Number.isFinite(strainToFmax) ? strainToFmax : null,
      compressive_energy_mj: Number.isFinite(energyToMax) ? energyToMax : null,
      compressive_idx: ms?.idx ?? null,
      compressive_mode: ms?.mode ?? null,
      toe_disp_mm: ts?.disp ?? null,
      toe_force_n: ts?.force ?? null,
      toe_d2_n_per_mm2: ts?.d2 ?? null,
      toe_idx: ts?.idx ?? null,
      toe_mode: ts?.mode ?? null,
      young_modulus_mpa: Number(ym.young_modulus_mpa),
      representative: {
        ...(replica.cache?.representative || {}),
        center_idx: Number(els.centerSlider.value),
        width_n: Number(els.widthSlider.value),
        disp_lo: m.window?.disp_lo,
        disp_hi: m.window?.disp_hi,
        r2: lf.r2,
        rel_rmse: lf.rel_rmse,
        slope_n_per_mm: lf.slope_n_per_mm,
        intercept_n: lf.intercept_n,
      },
    });
    if (document.getElementById('summaryTab')?.classList.contains('active')) {
      renderSummaryFromCache();
    }
  }
}

async function detectDomains() {
  if (!state.datasetId) {
    try {
      const ok = await ensureDatasetForSelectedReplica();
      if (!ok) return;
    } catch (err) {
      setDomainsSummary(`Domains summary (error): ${err}`);
      renderDomainsTable([]);
      return;
    }
  }
  const a = state.project.analysis;
  const { replica } = getSelectedReplica();
  const geom = getReplicaGeometry(replica);
  const payload = {
    dataset_id: state.datasetId,
    min_score: Number(els.domainThreshold.value || 0.80),
    area_mm2: geom.area_mm2,
    diameter_mm: geom.diameter_mm,
    thickness_mm: geom.thickness_mm,
  };

  let data;
  try {
    data = await fetchJson('/api/domains', payload);
  } catch (err) {
    if (isUnknownDatasetError(err)) {
      const { sample, replica } = getSelectedReplica();
      if (sample && replica) {
        delete state.replicaDataCache[replicaDataCacheKey(sample.id, replica.id)];
      }
      await loadSelectedReplica();
      return;
    }
    setDomainsSummary(`Domains summary (error): ${err}`);
    renderDomainsTable([]);
    if (replica) {
      setReplicaCache(replica, { status: 'error', error: String(err), updated_at: new Date().toISOString() });
      renderSamplesList();
    }
    return;
  }
  state.domains = data.domains || [];
  drawHeatmap();

  if (!state.domains.length) {
    setDomainsSummary(`Domains summary: none above ${payload.min_score.toFixed(3)}`);
    renderDomainsTable([]);
    if (replica) {
      setReplicaCache(replica, {
        status: 'ok',
        updated_at: new Date().toISOString(),
        threshold: Number(payload.min_score),
        n_domains: 0,
        best_domain_id: null,
        representative: null,
        domains: [],
      });
      renderSamplesList();
    }
    return;
  }

  setDomainsSummary(
    `Domains summary: ${state.domains.length} domain(s), threshold=${payload.min_score.toFixed(3)}, best id=${data.best_domain_id}`
  );
  renderDomainsTable(state.domains);

  const best = state.domains.find((d) => d.id === data.best_domain_id) || state.domains[0];
  if (replica) {
    setReplicaCache(replica, {
      status: 'ok',
      updated_at: new Date().toISOString(),
      threshold: Number(payload.min_score),
      n_domains: Number(state.domains.length),
      best_domain_id: Number.isFinite(Number(data.best_domain_id)) ? Number(data.best_domain_id) : null,
      representative: best?.representative || null,
      domains: cloneDomainsLite(state.domains),
    });
    renderSamplesList();
  }
  if (best && best.representative) {
    applyDomainRepresentative(best.representative);
  }
}

function buildCacheRow(sampleName, replica) {
  const c = replica?.cache || {};
  const rep = c.representative || {};
  const metrics = c.metrics || {};
  const win = metrics.window || {};
  const lf = metrics.linear_fit || {};
  const ym = metrics.young_modulus || {};
  const effAreaMm2 = effectiveAreaMm2(replica);
  const effThicknessMm = effectiveThicknessMm(replica);
  const areaCm2 = toFiniteOrNull(Number.isFinite(effAreaMm2) ? effAreaMm2 / 100.0 : null);
  const thicknessMm = toFiniteOrNull(effThicknessMm);
  const energyMj = toFiniteOrNull(c.compressive_energy_mj);
  const toeForceN = toFiniteOrNull(c.toe_force_n);
  const volumeCm3 = (Number.isFinite(areaCm2) && Number.isFinite(thicknessMm) && areaCm2 > 0 && thicknessMm > 0)
    ? areaCm2 * (thicknessMm / 10.0)
    : null;
  const energyDensity = (Number.isFinite(energyMj) && Number.isFinite(volumeCm3) && volumeCm3 > 0)
    ? (energyMj / volumeCm3)
    : null;

  return {
    sample: sampleName,
    replica: replica?.name || 'Replica',
    width_n: toFiniteOrNull(rep.width_n),
    disp_lo: toFiniteOrNull(win.disp_lo ?? rep.disp_lo),
    disp_hi: toFiniteOrNull(win.disp_hi ?? rep.disp_hi),
    thickness_mm: thicknessMm,
    area_cm2: areaCm2,
    score: toFiniteOrNull(c.score ?? scoreFromLinearFit(lf)),
    r2: toFiniteOrNull(lf.r2 ?? rep.r2),
    rel_rmse: toFiniteOrNull(lf.rel_rmse ?? rep.rel_rmse),
    compressive_strength_n: toFiniteOrNull(c.compressive_strength_n),
    compressive_disp_mm: toFiniteOrNull(c.compressive_disp_mm),
    compressive_pressure_mpa: toFiniteOrNull(c.compressive_pressure_mpa),
    strain_to_fmax_pct: toFiniteOrNull(c.strain_to_fmax_pct),
    compressive_energy_mj: energyMj,
    energy_density_mj_per_cm3: toFiniteOrNull(energyDensity),
    toe_disp_mm: toFiniteOrNull(c.toe_disp_mm),
    toe_force_n: toeForceN,
    toe_force_mn: toFiniteOrNull(Number.isFinite(toeForceN) ? (toeForceN * 1000.0) : null),
    young_modulus_mpa: toFiniteOrNull(c.young_modulus_mpa ?? ym.young_modulus_mpa),
  };
}

function buildCachedReplicaRows() {
  const rows = [];
  for (const s of state.project.samples || []) {
    for (const r of s.replicas || []) {
      rows.push(buildCacheRow(s.name, r));
    }
  }
  return rows;
}

function buildSampleAggregateRows(replicaRows) {
  const out = [];
  for (const s of state.project.samples || []) {
    const rows = (replicaRows || []).filter((r) => r.sample === s.name);
    const agg = { sample: s.name, n_replicas: rows.length };
    for (const c of SUMMARY_METRIC_COLUMNS) {
      const ms = meanSem(rows.map((r) => r[c.key]));
      agg[`${c.key}_mean`] = ms.mean;
      agg[`${c.key}_sem`] = ms.sem;
    }
    out.push(agg);
  }
  return out;
}

function summaryRangeText(r) {
  if (!Number.isFinite(r?.disp_lo) || !Number.isFinite(r?.disp_hi)) return 'n/a';
  return `${r.disp_lo}..${r.disp_hi}`;
}

function summaryRangeTextDisplay(r) {
  if (!Number.isFinite(r?.disp_lo) || !Number.isFinite(r?.disp_hi)) return 'n/a';
  return `${formatFixed(r.disp_lo, 2)}..${formatFixed(r.disp_hi, 2)}`;
}

function getVisibleSummaryMetricColumns() {
  const showFit = Boolean(els.summaryShowFitDetails?.checked);
  return SUMMARY_METRIC_COLUMNS.filter((c) => showFit || !c.optional_fit);
}

function renderSummaryTableHeaders() {
  const visible = getVisibleSummaryMetricColumns();
  const showFit = Boolean(els.summaryShowFitDetails?.checked);
  if (els.replicaHeadRow) {
    const fitHdr = showFit ? '<th>Width</th><th>Range (mm)</th>' : '';
    els.replicaHeadRow.innerHTML = `<th>Sample</th><th>Replica</th>${fitHdr}${visible.map((c) => `<th>${escapeHtml(c.label)}</th>`).join('')}`;
  }
  if (els.sampleHeadRow) {
    els.sampleHeadRow.innerHTML = `<th>Sample</th><th>n replicas</th>${visible.map((c) => `<th>${escapeHtml(c.label)}</th>`).join('')}`;
  }
}

function replicaSummaryExportRows(replicaRows) {
  return (replicaRows || []).map((r) => {
    const row = [r.sample, r.replica, r.width_n ?? 'n/a', summaryRangeText(r)];
    for (const c of SUMMARY_METRIC_COLUMNS) {
      row.push(r[c.key] ?? 'n/a');
    }
    return row;
  });
}

function sampleSummaryExportRows(sampleRows) {
  return (sampleRows || []).map((s) => {
    const row = [s.sample, s.n_replicas];
    for (const c of SUMMARY_METRIC_COLUMNS) {
      const mean = s[`${c.key}_mean`];
      const sem = s[`${c.key}_sem`];
      row.push(Number.isFinite(mean) ? `${mean}${Number.isFinite(sem) ? ` +- ${sem}` : ''}` : 'n/a');
    }
    return row;
  });
}

function getSummaryTableModels() {
  const rep = buildCachedReplicaRows();
  const sample = buildSampleAggregateRows(rep);
  const replicaHeaders = ['Sample', 'Replica', 'Width', 'Range (mm)', ...SUMMARY_METRIC_COLUMNS.map((c) => c.label)];
  const sampleHeaders = ['Sample', 'n replicas', ...SUMMARY_METRIC_COLUMNS.map((c) => c.label)];
  return {
    replicaHeaders,
    sampleHeaders,
    replicaRows: replicaSummaryExportRows(rep),
    sampleRows: sampleSummaryExportRows(sample),
  };
}

function renderSummaryTables(replicaRows, sourceLabel = '') {
  const rep = replicaRows || [];
  const sampleRows = buildSampleAggregateRows(rep);
  renderSummaryTableHeaders();
  const visible = getVisibleSummaryMetricColumns();
  const showFit = Boolean(els.summaryShowFitDetails?.checked);
  state.summaryData = { replicaRows: rep, sampleRows };
  const nSamples = (state.project.samples || []).length;
  const nReplicas = rep.length;

  els.summaryInfo.textContent = `${nSamples} sample(s), ${nReplicas} replica(s)${sourceLabel ? ` (${sourceLabel})` : ''}`;
  if (!rep.length) {
    els.replicaTbody.innerHTML = `<tr><td colspan="${2 + (showFit ? 2 : 0) + visible.length}">No results.</td></tr>`;
  } else {
    let prevSample = null;
    const rowsHtml = [];
    for (const r of rep) {
      const sepClass = prevSample !== null && prevSample !== r.sample ? ' class="sampleSep"' : '';
      prevSample = r.sample;
      const fitCells = showFit ? `<td>${r.width_n ?? 'n/a'}</td><td>${summaryRangeTextDisplay(r)}</td>` : '';
      const metricCells = visible.map((c) => `<td>${formatFixed(r[c.key], c.display_decimals ?? 2)}</td>`).join('');
      rowsHtml.push(`
      <tr${sepClass}>
        <td>${escapeHtml(r.sample)}</td>
        <td>${escapeHtml(r.replica)}</td>
        ${fitCells}
        ${metricCells}
      </tr>`);
    }
    els.replicaTbody.innerHTML = rowsHtml.join('');
  }

  if (!sampleRows.length) {
    els.sampleTbody.innerHTML = `<tr><td colspan="${2 + visible.length}">No aggregated results.</td></tr>`;
    return;
  }
  els.sampleTbody.innerHTML = sampleRows
    .map((s) => {
      const metricCells = visible
        .map((c) => `<td>${formatMeanSemFixed(s[`${c.key}_mean`], s[`${c.key}_sem`], c.display_decimals ?? 2)}</td>`)
        .join('');
      return `
      <tr>
        <td>${escapeHtml(s.sample)}</td>
        <td>${s.n_replicas}</td>
        ${metricCells}
      </tr>`;
    })
    .join('');
}

function renderSummaryFromCache() {
  const rows = buildCachedReplicaRows();
  renderSummaryTables(rows, 'data status');
  renderMetricExplorerSection();
  drawSummaryPlot();
  renderProjectInfo();
}

function directBlobDownload(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function fileExtFromName(name) {
  const s = String(name || '');
  const i = s.lastIndexOf('.');
  if (i < 0 || i === s.length - 1) return '';
  return s.slice(i).toLowerCase();
}

async function saveBlobWithPicker(filename, blob, mime = 'application/octet-stream') {
  const picker = window.showSaveFilePicker;
  if (typeof picker !== 'function') return false;
  const mimeMain = String(mime || 'application/octet-stream').split(';')[0];
  const ext = fileExtFromName(filename) || '.bin';
  try {
    const handle = await picker({
      suggestedName: filename,
      types: [{ description: 'Export file', accept: { [mimeMain]: [ext] } }],
    });
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return true;
  } catch (err) {
    if (err && err.name === 'AbortError') return true;
    console.warn('Save picker unavailable/failed, falling back to browser download.', err);
    return false;
  }
}

async function saveProjectBlob(blob, mode = 'save_as') {
  const filename = 'ld_project.stt';
  const mime = 'application/zip';
  const canFs = typeof window.showSaveFilePicker === 'function';
  const ext = '.stt';
  if (canFs) {
    try {
      let handle = null;
      if (mode === 'update' && state.projectSaveHandle) {
        handle = state.projectSaveHandle;
      } else {
        handle = await window.showSaveFilePicker({
          suggestedName: state.projectSaveName || filename,
          types: [{ description: 'State project file', accept: { [mime]: [ext] } }],
        });
      }
      if (handle) {
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        state.projectSaveHandle = handle;
        state.projectSaveName = handle.name || filename;
        state.projectSaveDir = '';
        updateProjectSaveUi();
        return true;
      }
    } catch (err) {
      if (!(err && err.name === 'AbortError')) {
        console.warn('Project save via picker failed; falling back to browser download.', err);
      }
      if (mode === 'update') return false;
      if (err && err.name === 'AbortError') return true;
    }
  }
  state.projectSaveName = filename;
  state.projectSaveDir = '';
  directBlobDownload(filename, blob);
  updateProjectSaveUi();
  return true;
}

function downloadBlobFile(filename, blob, mime = 'application/octet-stream') {
  saveBlobWithPicker(filename, blob, mime).then((ok) => {
    if (!ok) directBlobDownload(filename, blob);
  });
}

function downloadTextFile(filename, text, mime = 'application/json') {
  const blob = new Blob([text], { type: mime });
  downloadBlobFile(filename, blob, mime);
}

function csvEscape(v) {
  const s = String(v ?? '');
  if (s.includes('"') || s.includes(',') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function downloadCsv(filename, headers, rows) {
  const lines = [headers.map(csvEscape).join(',')];
  for (const r of rows || []) lines.push((r || []).map(csvEscape).join(','));
  downloadTextFile(filename, `${lines.join('\n')}\n`, 'text/csv;charset=utf-8');
}

function csvTextFromTable(headers, rows) {
  const lines = [headers.map(csvEscape).join(',')];
  for (const r of rows || []) lines.push((r || []).map(csvEscape).join(','));
  return `${lines.join('\n')}\n`;
}

function xmlEscape(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function buildSpreadsheetXml(sheets) {
  const ws = (sheets || [])
    .map((sheet) => {
      const outRows = [];
      if (sheet.note) {
        outRows.push(`<Row><Cell ss:StyleID="sNoteRed"><Data ss:Type="String">${xmlEscape(sheet.note)}</Data></Cell></Row>`);
      }
      const allRows = [sheet.headers || [], ...(sheet.rows || [])];
      for (const r of allRows) {
        outRows.push(
          `<Row>${(r || []).map((v) => `<Cell><Data ss:Type="String">${xmlEscape(v)}</Data></Cell>`).join('')}</Row>`
        );
      }
      const rows = outRows.join('');
      return `<Worksheet ss:Name="${xmlEscape(sheet.name || 'Sheet')}"><Table>${rows}</Table></Worksheet>`;
    })
    .join('');
  return [
    '<?xml version="1.0"?>',
    '<?mso-application progid="Excel.Sheet"?>',
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"',
    ' xmlns:o="urn:schemas-microsoft-com:office:office"',
    ' xmlns:x="urn:schemas-microsoft-com:office:excel"',
    ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"',
    ' xmlns:html="http://www.w3.org/TR/REC-html40">',
    '<Styles><Style ss:ID="sNoteRed"><Font ss:Color="#C00000" ss:Bold="1"/></Style></Styles>',
    ws,
    '</Workbook>',
  ].join('');
}

function exportReplicaSummaryCsv() {
  const t = getSummaryTableModels();
  downloadCsv('summary_all_files.csv', t.replicaHeaders, t.replicaRows);
}

function exportSampleSummaryCsv() {
  const t = getSummaryTableModels();
  downloadCsv('summary_sample_averages.csv', t.sampleHeaders, t.sampleRows);
}

function exportSummaryExcelWorkbook() {
  const t = getSummaryTableModels();
  const xml = buildSpreadsheetXml([
    { name: 'All Files', headers: t.replicaHeaders, rows: t.replicaRows },
    { name: 'Sample Averages', headers: t.sampleHeaders, rows: t.sampleRows },
  ]);
  downloadTextFile('summary_tables.xls', xml, 'application/vnd.ms-excel');
}

function metricExplorerDef(metricKey) {
  return METRIC_EXPLORER_METRIC_BY_KEY[metricKey] || METRIC_EXPLORER_METRICS[0];
}

function clampFontPx(v, fallback, minV = 8, maxV = 40) {
  const n = Number(v);
  if (!Number.isFinite(n)) return fallback;
  return clamp(Math.round(n), minV, maxV);
}

function sanitizeLegacyTypography(raw = {}) {
  const src = (raw && typeof raw === 'object') ? { ...raw } : {};
  delete src.base_font_size_px;
  delete src.base_font_px;
  delete src.base_font_size;
  delete src.font_size_base_px;
  return src;
}

function normalizeMetricTypography(raw = {}, metricKey = null) {
  const src = sanitizeLegacyTypography(raw);
  const def = metricExplorerDef(metricKey || src.metric_key);
  const globalOn = src.use_global_font_size !== false;
  const globalPx = clampFontPx(src.global_font_size_px, 14, 8, 40);
  const hasTitle = Object.prototype.hasOwnProperty.call(src, 'title_text');
  const hasX = Object.prototype.hasOwnProperty.call(src, 'x_axis_label');
  const hasY = Object.prototype.hasOwnProperty.call(src, 'y_axis_label');
  const titleRaw = hasTitle ? (src.title_text === null ? null : String(src.title_text)) : null;
  const xRaw = hasX ? (src.x_axis_label === null ? null : String(src.x_axis_label)) : 'Sample';
  const yRaw = hasY ? (src.y_axis_label === null ? null : String(src.y_axis_label)) : `${def.label} (${def.unit})`;
  return {
    use_global_font_size: globalOn,
    global_font_size_px: globalPx,
    font_family: String(src.font_family || 'Arial, sans-serif'),
    tick_font_size_px: globalOn ? globalPx : clampFontPx(src.tick_font_size_px, 12, 8, 32),
    title_font_size_px: globalOn ? globalPx : clampFontPx(src.title_font_size_px, 17, 10, 40),
    axis_title_font_size_px: globalOn ? globalPx : clampFontPx(src.axis_title_font_size_px, 14, 10, 36),
    title_text: titleRaw,
    x_axis_label: xRaw,
    y_axis_label: yRaw,
  };
}

function normalizeSummaryPlotStyle(raw = {}) {
  const src = sanitizeLegacyTypography(raw);
  const globalOn = src.use_global_font_size !== false;
  const globalPx = clampFontPx(src.global_font_size_px, 14, 8, 40);
  const hasTitle = Object.prototype.hasOwnProperty.call(src, 'title_text');
  const hasX = Object.prototype.hasOwnProperty.call(src, 'x_axis_label');
  const hasY = Object.prototype.hasOwnProperty.call(src, 'y_axis_label');
  const titleRaw = hasTitle ? (src.title_text === null ? null : String(src.title_text)) : 'All Load-Displacement Curves';
  const xRaw = hasX ? (src.x_axis_label === null ? null : String(src.x_axis_label)) : null;
  const yRaw = hasY ? (src.y_axis_label === null ? null : String(src.y_axis_label)) : null;
  return {
    use_global_font_size: globalOn,
    global_font_size_px: globalPx,
    font_family: String(src.font_family || 'Arial, sans-serif'),
    tick_font_size_px: globalOn ? globalPx : clampFontPx(src.tick_font_size_px, 12, 8, 32),
    title_font_size_px: globalOn ? globalPx : clampFontPx(src.title_font_size_px, 18, 10, 40),
    axis_title_font_size_px: globalOn ? globalPx : clampFontPx(src.axis_title_font_size_px, 14, 10, 36),
    title_text: titleRaw,
    x_axis_label: xRaw,
    y_axis_label: yRaw,
  };
}

function currentPlotPixelSize(el, fallbackW, fallbackH) {
  const rect = el?.getBoundingClientRect?.();
  return {
    width: Number.isFinite(rect?.width) && rect.width > 0 ? Math.round(rect.width) : fallbackW,
    height: Number.isFinite(rect?.height) && rect.height > 0 ? Math.round(rect.height) : fallbackH,
  };
}

function syncSettingsTabs(group, pane) {
  if (!group) return;
  const buttons = Array.from(document.querySelectorAll(`[data-settings-tabs="${group}"] .settingsTabBtn`));
  const panes = Array.from(document.querySelectorAll(`.settingsTabPane[data-settings-content="${group}"]`));
  if (!buttons.length || !panes.length) return;
  const allowed = new Set(buttons.map((btn) => String(btn.dataset.settingsPane || '')));
  const targetPane = allowed.has(String(pane || '')) ? String(pane) : String(buttons[0]?.dataset.settingsPane || 'display');
  buttons.forEach((btn) => {
    const active = String(btn.dataset.settingsPane || '') === targetPane;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
    btn.tabIndex = active ? 0 : -1;
  });
  panes.forEach((el) => {
    const active = String(el.dataset.settingsPane || '') === targetPane;
    el.classList.toggle('active', active);
    el.hidden = !active;
  });
}

function initializeSettingsTabs() {
  document.querySelectorAll('.settingsTabs').forEach((wrap, wrapIdx) => {
    if (!(wrap instanceof HTMLElement)) return;
    const group = String(wrap.dataset.settingsTabs || '').trim();
    if (!group) return;
    wrap.setAttribute('role', 'tablist');
    const buttons = Array.from(wrap.querySelectorAll('.settingsTabBtn'));
    buttons.forEach((btn, btnIdx) => {
      if (!(btn instanceof HTMLElement)) return;
      const paneName = String(btn.dataset.settingsPane || '').trim();
      if (!paneName) return;
      btn.setAttribute('role', 'tab');
      if (!btn.id) btn.id = `${group}TabBtn${wrapIdx + 1}_${btnIdx + 1}`;
      const pane = document.querySelector(`.settingsTabPane[data-settings-content="${group}"][data-settings-pane="${paneName}"]`);
      if (!(pane instanceof HTMLElement)) return;
      pane.setAttribute('role', 'tabpanel');
      if (!pane.id) pane.id = `${group}TabPane${wrapIdx + 1}_${btnIdx + 1}`;
      btn.setAttribute('aria-controls', pane.id);
      pane.setAttribute('aria-labelledby', btn.id);
    });
    const activeBtn = buttons.find((btn) => btn.classList.contains('active')) || buttons[0];
    syncSettingsTabs(group, activeBtn?.dataset.settingsPane || 'display');
  });
}

function normalizeMetricExplorerPin(raw) {
  const p = (raw && typeof raw === 'object') ? raw : {};
  const metric_key = METRIC_EXPLORER_METRIC_BY_KEY[p.metric_key] ? p.metric_key : METRIC_EXPLORER_METRICS[0].key;
  const style = p.style === 'bar' ? 'bar' : 'dot';
  const settings = {
    sort: ['original', 'mean_desc', 'mean_asc'].includes(p?.settings?.sort) ? p.settings.sort : 'original',
    y_zero: p?.settings?.y_zero !== false,
    show_grid: p?.settings?.show_grid !== false,
    show_labels: Boolean(p?.settings?.show_labels),
    ...normalizeMetricTypography(p?.settings || {}, metric_key),
  };
  return {
    id: String(p.id || uid('mpin')),
    metric_key,
    style,
    settings,
    created_at: p.created_at || new Date().toISOString(),
  };
}

function normalizeMetricExplorerState(raw) {
  const m = (raw && typeof raw === 'object') ? raw : {};
  const cur = (m.current && typeof m.current === 'object') ? m.current : {};
  const metric_key = METRIC_EXPLORER_METRIC_BY_KEY[cur.metric_key] ? cur.metric_key : METRIC_EXPLORER_METRICS[0].key;
  const style = cur.style === 'bar' ? 'bar' : 'dot';
  const sort = ['original', 'mean_desc', 'mean_asc'].includes(cur.sort) ? cur.sort : 'original';
  const activePinId = String(m.active_pin_id || '');
  const pinned = Array.isArray(m.pinned) ? m.pinned.map((p) => normalizeMetricExplorerPin(p)) : [];
  const hasActive = activePinId && pinned.some((p) => p.id === activePinId);
  return {
    current: {
      metric_key,
      style,
      sort,
      y_zero: cur.y_zero !== false,
      show_grid: cur.show_grid !== false,
      show_labels: Boolean(cur.show_labels),
      ...normalizeMetricTypography(cur || {}, metric_key),
      plot_width_px: Number.isFinite(Number(cur.plot_width_px)) ? Number(cur.plot_width_px) : 760,
      plot_height_px: Number.isFinite(Number(cur.plot_height_px)) ? Number(cur.plot_height_px) : 570,
    },
    pinned,
    active_pin_id: hasActive ? activePinId : null,
  };
}

function metricExplorerExportState() {
  return {
    current: { ...(state.metricExplorer?.current || {}) },
    pinned: Array.isArray(state.metricExplorer?.pinned) ? state.metricExplorer.pinned.map((p) => normalizeMetricExplorerPin(p)) : [],
    active_pin_id: state.metricExplorer?.active_pin_id || null,
  };
}

function syncCurrentToActivePinnedPlot(redrawPinned = true) {
  const pinId = String(state.metricExplorer?.active_pin_id || '');
  if (!pinId) return;
  const pin = (state.metricExplorer?.pinned || []).find((p) => p.id === pinId);
  if (!pin) {
    state.metricExplorer.active_pin_id = null;
    return;
  }
  const cur = state.metricExplorer.current || {};
  pin.metric_key = METRIC_EXPLORER_METRIC_BY_KEY[cur.metric_key] ? cur.metric_key : pin.metric_key;
  pin.style = cur.style === 'bar' ? 'bar' : 'dot';
  pin.settings = { ...metricExplorerCurrentSettings() };
  pin.updated_at = new Date().toISOString();
  if (redrawPinned) renderPinnedMetricPlots();
}

function canDirectProjectUpdate() {
  return typeof window.showSaveFilePicker === 'function' && Boolean(state.projectSaveHandle);
}

function markProjectChanged(_reason = '') {
  state.projectLastChangedAt = new Date().toISOString();
  state.projectDirty = true;
  renderProjectInfo();
}

function recordAutosaveEvent(kind, message = '') {
  const ts = new Date().toISOString();
  const arr = Array.isArray(state.projectAutosaveHistory) ? state.projectAutosaveHistory : [];
  arr.unshift({ ts, kind, message: String(message || '') });
  state.projectAutosaveHistory = arr.slice(0, 8);
}

function formatAutosaveTimestamp(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return '';
  return d.toLocaleString();
}

function renderAutosaveStatus() {
  if (!els.projectAutosaveStatus) return;
  const st = state.projectAutosaveStatus || {};
  const kind = String(st.kind || 'off');
  let text = String(st.message || '');
  if (!text) {
    if (kind === 'saved') {
      const ts = formatAutosaveTimestamp(st.last_saved_at);
      text = ts ? `Saved, last mod ${ts}` : 'Saved';
    } else if (kind === 'saving') {
      const dots = ['.', '..', '...'][Number(st.dots_idx || 0) % 3];
      text = `Saving${dots}`;
    } else if (kind === 'failed') {
      text = 'Failed';
    } else {
      text = 'Autosave off';
    }
  }
  els.projectAutosaveStatus.textContent = text;
  const dir = String(state.projectSaveDir || '').trim();
  const file = String(state.projectSaveName || '').trim();
  const fullPath = dir ? `${dir}/${file}` : (file || 'No linked file');
  els.projectAutosaveStatus.title = fullPath;
  els.projectAutosaveStatus.classList.toggle('status-err', kind === 'failed');
  els.projectAutosaveStatus.classList.toggle('status-run', kind === 'saving');
  els.projectAutosaveStatus.classList.toggle('status-ok', kind === 'saved');
}

function clearAutosaveAnimation() {
  const t = state.projectAutosaveStatus?.anim_timer;
  if (t) clearInterval(t);
  if (state.projectAutosaveStatus) state.projectAutosaveStatus.anim_timer = null;
}

function setAutosaveStatus(kind, opts = {}) {
  if (!state.projectAutosaveStatus || typeof state.projectAutosaveStatus !== 'object') {
    state.projectAutosaveStatus = { kind: 'off', last_saved_at: null, message: '', dots_idx: 0, anim_timer: null };
  }
  const st = state.projectAutosaveStatus;
  clearAutosaveAnimation();
  st.kind = kind;
  st.message = String(opts.message || '');
  if (opts.last_saved_at) st.last_saved_at = opts.last_saved_at;
  st.dots_idx = 0;
  if (kind === 'saving') {
    recordAutosaveEvent('saving', 'autosave started');
    st.anim_timer = setInterval(() => {
      st.dots_idx = (Number(st.dots_idx || 0) + 1) % 3;
      renderAutosaveStatus();
    }, 320);
  }
  if (kind === 'saved') recordAutosaveEvent('saved', st.message || 'saved');
  if (kind === 'failed') recordAutosaveEvent('failed', st.message || 'failed');
  renderAutosaveStatus();
  renderProjectInfo();
}

function queueProjectAutosave(reason = '') {
  if (!state.projectAutosaveEnabled || !canDirectProjectUpdate()) return;
  if (state.projectAutosaveBusy) return;
  if (state.projectAutosaveTimer) clearTimeout(state.projectAutosaveTimer);
  state.projectAutosaveTimer = setTimeout(async () => {
    state.projectAutosaveTimer = null;
    if (!state.projectAutosaveEnabled || !canDirectProjectUpdate()) return;
    state.projectAutosaveBusy = true;
    setAutosaveStatus('saving');
    try {
      await exportProject('update');
      const nowIso = new Date().toISOString();
      setAutosaveStatus('saved', { last_saved_at: nowIso });
      if (reason) setPrecomputeInfo(`Autosaved (${reason})`);
    } catch (err) {
      setAutosaveStatus('failed', { message: `Failed: ${String(err)}` });
    } finally {
      state.projectAutosaveBusy = false;
    }
  }, 1200);
}

async function setProjectAutosaveEnabled(enabled) {
  const want = Boolean(enabled);
  if (!want) {
    state.projectAutosaveEnabled = false;
    if (els.projectAutosaveToggle) els.projectAutosaveToggle.checked = false;
    if (state.projectAutosaveTimer) {
      clearTimeout(state.projectAutosaveTimer);
      state.projectAutosaveTimer = null;
    }
    setAutosaveStatus('off', { message: 'Autosave off' });
    updateProjectSaveUi();
    return;
  }
  if (!canDirectProjectUpdate()) {
    try {
      await exportProject('save_as');
    } catch (_) {
    }
  }
  state.projectAutosaveEnabled = canDirectProjectUpdate();
  if (els.projectAutosaveToggle) els.projectAutosaveToggle.checked = state.projectAutosaveEnabled;
  if (!state.projectAutosaveEnabled) {
    setPrecomputeInfo('Autosave requires a linked project file (save with picker).');
    setAutosaveStatus('failed', { message: 'Failed: autosave file not linked' });
  } else {
    const nowIso = state.projectAutosaveStatus?.last_saved_at || new Date().toISOString();
    setAutosaveStatus('saved', { last_saved_at: nowIso });
  }
  updateProjectSaveUi();
  renderProjectInfo();
}

function updateMetricPinButtonsUi() {
  if (!els.updateMetricPlotBtn) return;
  const hasActive = Boolean(state.metricExplorer?.active_pin_id);
  els.updateMetricPlotBtn.disabled = !hasActive;
  els.updateMetricPlotBtn.title = hasActive ? 'Update selected pinned plot' : 'Select a pinned plot first';
}

function updateProjectSaveUi() {
  if (!els.updateProjectBtn) return;
  const hasDirectUpdate = canDirectProjectUpdate();
  els.updateProjectBtn.disabled = !hasDirectUpdate || state.projectAutosaveEnabled;
  const label = hasDirectUpdate ? `Update saved project file (${state.projectSaveName || 'ld_project.stt'})` : 'Update saved project file';
  const finalLabel = state.projectAutosaveEnabled ? 'Manual save disabled while autosave is enabled' : label;
  els.updateProjectBtn.title = finalLabel;
  els.updateProjectBtn.setAttribute('aria-label', finalLabel);
  if (els.projectAutosaveToggle) {
    els.projectAutosaveToggle.disabled = !hasDirectUpdate;
    if (!hasDirectUpdate) {
      els.projectAutosaveToggle.checked = false;
      state.projectAutosaveEnabled = false;
      setAutosaveStatus('off', { message: 'Autosave off (no linked file)' });
    }
  }
  if (!hasDirectUpdate && !state.projectAutosaveEnabled) {
    renderAutosaveStatus();
  }
  renderProjectInfo();
}

function formatBytes(n) {
  const v = Number(n);
  if (!Number.isFinite(v) || v < 0) return 'n/a';
  if (v < 1024) return `${Math.round(v)} B`;
  if (v < 1024 * 1024) return `${(v / 1024).toFixed(1)} KB`;
  if (v < 1024 * 1024 * 1024) return `${(v / (1024 * 1024)).toFixed(2)} MB`;
  return `${(v / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function inferDirectoryFromName(name) {
  const s = String(name || '');
  if (!s) return '';
  const i = Math.max(s.lastIndexOf('/'), s.lastIndexOf('\\'));
  if (i <= 0) return '';
  return s.slice(0, i);
}

function renderProjectInfo() {
  if (!els.projectInfoContent) return;
  const samples = Array.isArray(state.project?.samples) ? state.project.samples : [];
  let nReplicas = 0;
  let nWithCache = 0;
  let nCsv = 0;
  let bytesCsv = 0;
  let bytesDomains = 0;
  let bytesHeatmap = 0;
  let bytesCurves = 0;
  for (const s of samples) {
    for (const r of s.replicas || []) {
      nReplicas += 1;
      if (r?.cache?.status === 'ok') nWithCache += 1;
      const csvTxt = String(r?.csv_text || '');
      if (csvTxt.length) {
        nCsv += 1;
        bytesCsv += csvTxt.length;
      }
      const domains = Array.isArray(r?.cache?.domains) ? r.cache.domains : [];
      if (domains.length) bytesDomains += JSON.stringify(domains).length;
      const hm = r?.cache?.heatmap;
      if (hm && Array.isArray(hm.centers_disp) && Array.isArray(hm.widths_disp) && Array.isArray(hm.score_grid)) {
        const rowsHm = hm.score_grid.length;
        const colsHm = rowsHm && Array.isArray(hm.score_grid[0]) ? hm.score_grid[0].length : 0;
        bytesHeatmap += (hm.centers_disp.length + hm.widths_disp.length + rowsHm * colsHm) * 8;
      }
      const curve = state.replicaDataCache[replicaDataCacheKey(s.id, r.id)];
      if (curve && Array.isArray(curve.disp) && Array.isArray(curve.force)) {
        bytesCurves += (curve.disp.length + curve.force.length) * 8;
        if (curve?.d2?.x?.length && curve?.d2?.d2?.length) {
          bytesCurves += (curve.d2.x.length + curve.d2.d2.length) * 8;
        }
      }
    }
  }
  const fsApi = typeof window.showSaveFilePicker === 'function';
  const openApi = typeof window.showOpenFilePicker === 'function';
  const linked = Boolean(state.projectSaveHandle);
  const linkedFile = state.projectSaveName || 'n/a';
  const linkedDirRaw = state.projectSaveDir || inferDirectoryFromName(linkedFile) || '';
  const linkedDir = linked
    ? (linkedDirRaw || '(directory not exposed by browser API)')
    : 'n/a';
  const fullPathHint = linked
    ? (linkedDirRaw ? `${linkedDirRaw}/${linkedFile}` : `${linkedFile} (linked file-handle, directory hidden)`)
    : 'no linked file';
  const lastSaved = state.projectLastSavedAt || state.projectAutosaveStatus?.last_saved_at || null;
  const lastSavedText = lastSaved ? formatAutosaveTimestamp(lastSaved) : 'n/a';
  const lastChangedText = state.projectLastChangedAt ? formatAutosaveTimestamp(state.projectLastChangedAt) : 'n/a';
  const statusText = String(els.projectAutosaveStatus?.textContent || 'n/a');
  const meta = normalizeProjectMeta(state.project?.project_meta || {});
  state.project.project_meta = meta;
  const info = [
    ['Linked file', linked ? linkedFile : 'no'],
    ['Directory', linked ? linkedDir : 'n/a'],
    ['Path hint', fullPathHint],
    ['Direct save available', canDirectProjectUpdate() ? 'yes' : 'no'],
    ['Autosave', state.projectAutosaveEnabled ? 'on' : 'off'],
    ['Autosave status', statusText],
    ['Last save timestamp', lastSavedText],
    ['Last saved size', formatBytes(state.projectLastSavedBytes)],
    ['Samples', String(samples.length)],
    ['Replicas', String(nReplicas)],
    ['Replicas with CSV loaded', String(nCsv)],
    ['Replicas with computed cache', String(nWithCache)],
    ['Browser save picker API', fsApi ? 'yes' : 'no'],
    ['Browser open picker API', openApi ? 'yes' : 'no'],
  ];
  const rows = info
    .map(([k, v]) => `<div>${escapeHtml(k)}</div><div>${escapeHtml(v)}</div>`)
    .join('');
  const commentsRows = (meta.comments || [])
    .map(
      (c) => `
        <tr>
          <td>${escapeHtml(c.author || 'unknown')}</td>
          <td>${escapeHtml(formatTs(c.created_at))}</td>
          <td class="commentTextCell">${escapeHtml(c.text)}</td>
          <td>
            <button class="editProjectCommentBtn" data-cid="${c.id}" type="button">Edit</button>
            <button class="deleteProjectCommentBtn" data-cid="${c.id}" type="button">Delete</button>
          </td>
        </tr>`
    )
    .join('');
  const historyRows = (state.projectAutosaveHistory || [])
    .map((h) => `<tr><td>${escapeHtml(formatTs(h.ts))}</td><td>${escapeHtml(h.kind)}</td><td>${escapeHtml(h.message || '')}</td></tr>`)
    .join('');
  els.projectInfoContent.innerHTML = `
    <div class="projectInfoLayout">
      <div class="projectInfoCol">
        <div class="panel">
          <h4>Project Metadata</h4>
          <div class="projectMetaForm">
            <label>Project title
              <input id="projectMetaTitleInput" type="text" value="${escapeHtml(meta.project_title || '')}" placeholder="Compression campaign 2026" />
            </label>
            <label>Project code
              <input id="projectMetaCodeInput" type="text" value="${escapeHtml(meta.project_code || '')}" placeholder="GEL-COMP-01" />
            </label>
            <label>User name
              <input id="projectOwnerInput" type="text" value="${escapeHtml(meta.owner_name || '')}" placeholder="Your name" />
            </label>
            <label>Email
              <input id="projectMetaEmailInput" type="text" value="${escapeHtml(meta.operator_email || '')}" placeholder="name@lab.org" />
            </label>
            <label>Institution
              <input id="projectMetaInstitutionInput" type="text" value="${escapeHtml(meta.institution || '')}" placeholder="Lab / University / Company" />
            </label>
            <label>Experiment type
              <input id="projectMetaExperimentTypeInput" type="text" value="${escapeHtml(meta.experiment_type || '')}" placeholder="Unconfined compression" />
            </label>
            <label>Sample family
              <input id="projectMetaSampleFamilyInput" type="text" value="${escapeHtml(meta.sample_family || '')}" placeholder="Crosslinked gels" />
            </label>
            <label>Batch ID
              <input id="projectMetaBatchInput" type="text" value="${escapeHtml(meta.batch_id || '')}" placeholder="Batch-07" />
            </label>
            <label>Test date
              <input id="projectMetaDateInput" type="date" value="${escapeHtml(meta.test_date || '')}" />
            </label>
            <label class="metaWide">Objective / Notes
              <input id="projectMetaObjectiveInput" type="text" value="${escapeHtml(meta.objective || '')}" placeholder="Study crosslink ratio effect on modulus" />
            </label>
          </div>
          <div class="row compact wrap">
            <button id="saveProjectMetaBtn" type="button">Save Metadata</button>
          </div>
        </div>
      </div>

      <div class="projectInfoCol">
        <details class="panel collapsiblePanel projectInfoGeek">
          <summary>
            <span class="collapsibleCaret">▸</span>
            <span>Storage Info</span>
          </summary>
          <div class="panelBody">
            <div class="projectInfoGrid">${rows}</div>
          </div>
        </details>

        <details class="panel collapsiblePanel projectInfoGeek">
          <summary>
            <span class="collapsibleCaret">▸</span>
            <span>Diagnostics</span>
          </summary>
          <div class="panelBody">
            <div class="projectInfoGrid">
              <div>Schema version</div><div>${escapeHtml(String(state.projectSchemaVersion || 1))}</div>
              <div>App build</div><div>${escapeHtml(String(state.projectBuildVersion || 'n/a'))}</div>
              <div>Unsaved changes</div><div>${state.projectDirty ? 'yes' : 'no'}</div>
              <div>Last change timestamp</div><div>${escapeHtml(lastChangedText)}</div>
              <div>Cache bytes: curves</div><div>${escapeHtml(formatBytes(bytesCurves))}</div>
              <div>Cache bytes: heatmap</div><div>${escapeHtml(formatBytes(bytesHeatmap))}</div>
              <div>Cache bytes: domains</div><div>${escapeHtml(formatBytes(bytesDomains))}</div>
              <div>Raw CSV bytes loaded</div><div>${escapeHtml(formatBytes(bytesCsv))}</div>
            </div>
            <h4 style="margin-top:10px;">Autosave history</h4>
            <div class="sampleCommentsList">
              <table class="sampleCommentsTable">
                <thead><tr><th>Timestamp</th><th>Status</th><th>Message</th></tr></thead>
                <tbody>${historyRows || '<tr><td colspan="3">No autosave events yet.</td></tr>'}</tbody>
              </table>
            </div>
          </div>
        </details>
      </div>
    </div>
    <details class="panel collapsiblePanel projectInfoCommentsFull" open>
      <summary>
        <span class="collapsibleCaret">▸</span>
        <span>Project Comments</span>
      </summary>
      <div class="panelBody">
        <div class="projectCommentForm">
          <label>Author
            <input id="projectCommentAuthorInput" type="text" placeholder="Your name" value="${escapeHtml(meta.owner_name || '')}" />
          </label>
          <label>Comment
            <input id="projectCommentTextInput" type="text" placeholder="Add project-level note..." />
          </label>
          <button id="addProjectCommentBtn" type="button">Submit</button>
        </div>
        <div class="sampleCommentsList">
          <table class="sampleCommentsTable">
            <thead><tr><th>Author</th><th>Date</th><th>Comment</th><th>Action</th></tr></thead>
            <tbody>${commentsRows || '<tr><td colspan="4">No comments yet.</td></tr>'}</tbody>
          </table>
        </div>
      </div>
    </details>`;
}

function ensureMetricExplorerControls() {
  if (!els.metricExplorerMetric || !els.metricExplorerStyle) return;
  if (els.metricExplorerMetric.options.length !== METRIC_EXPLORER_METRICS.length) {
    els.metricExplorerMetric.innerHTML = METRIC_EXPLORER_METRICS
      .map((m) => `<option value="${m.key}">${escapeHtml(m.label)} (${escapeHtml(m.unit)})</option>`)
      .join('');
  }
  const cur = state.metricExplorer?.current || {};
  const key = METRIC_EXPLORER_METRIC_BY_KEY[cur.metric_key] ? cur.metric_key : METRIC_EXPLORER_METRICS[0].key;
  const style = cur.style === 'bar' ? 'bar' : 'dot';
  const sort = ['original', 'mean_desc', 'mean_asc'].includes(cur.sort) ? cur.sort : 'original';
  const yZero = cur.y_zero !== false;
  const showGrid = cur.show_grid !== false;
  const showLabels = Boolean(cur.show_labels);
  const plotWidth = Number.isFinite(Number(cur.plot_width_px)) ? Number(cur.plot_width_px) : 760;
  const plotHeight = Number.isFinite(Number(cur.plot_height_px)) ? Number(cur.plot_height_px) : 570;
  const typo = normalizeMetricTypography(cur, key);
  state.metricExplorer.current = {
    metric_key: key,
    style,
    sort,
    y_zero: yZero,
    show_grid: showGrid,
    show_labels: showLabels,
    ...typo,
    plot_width_px: plotWidth,
    plot_height_px: plotHeight,
  };
  els.metricExplorerMetric.value = key;
  els.metricExplorerStyle.value = style;
  if (els.metricExplorerSort) els.metricExplorerSort.value = sort;
  if (els.metricExplorerZeroY) els.metricExplorerZeroY.checked = yZero;
  if (els.metricExplorerShowGrid) els.metricExplorerShowGrid.checked = showGrid;
  if (els.metricExplorerShowLabels) els.metricExplorerShowLabels.checked = showLabels;
  if (els.metricExplorerFontFamily) els.metricExplorerFontFamily.value = state.metricExplorer.current.font_family;
  if (els.metricExplorerUseGlobalFontSize) els.metricExplorerUseGlobalFontSize.checked = Boolean(state.metricExplorer.current.use_global_font_size);
  if (els.metricExplorerGlobalFontSize) els.metricExplorerGlobalFontSize.value = String(state.metricExplorer.current.global_font_size_px);
  if (els.metricExplorerTickFontSize) els.metricExplorerTickFontSize.value = String(state.metricExplorer.current.tick_font_size_px);
  if (els.metricExplorerTitleFontSize) els.metricExplorerTitleFontSize.value = String(state.metricExplorer.current.title_font_size_px);
  if (els.metricExplorerAxisTitleFontSize) els.metricExplorerAxisTitleFontSize.value = String(state.metricExplorer.current.axis_title_font_size_px);
  if (els.metricExplorerTitleText) els.metricExplorerTitleText.value = state.metricExplorer.current.title_text ?? '';
  if (els.metricExplorerXAxisLabel) els.metricExplorerXAxisLabel.value = state.metricExplorer.current.x_axis_label ?? '';
  if (els.metricExplorerYAxisLabel) els.metricExplorerYAxisLabel.value = state.metricExplorer.current.y_axis_label ?? '';
  syncMetricGlobalFontUi();
}

function syncMetricGlobalFontUi() {
  const on = Boolean(els.metricExplorerUseGlobalFontSize?.checked);
  const globalCombo = els.metricExplorerGlobalFontSize?.closest('.fontSizeCombo');
  if (globalCombo instanceof HTMLElement) globalCombo.style.display = on ? '' : 'none';
  [els.metricExplorerTickFontSize, els.metricExplorerTitleFontSize, els.metricExplorerAxisTitleFontSize].forEach((el) => {
    if (!(el instanceof HTMLInputElement)) return;
    const label = el.closest('label');
    if (label instanceof HTMLElement) label.style.display = on ? 'none' : '';
    el.disabled = on;
    el.readOnly = on;
  });
}

function clampMetricExplorerPlotWidth(px) {
  const v = Number(px);
  if (!Number.isFinite(v)) return 760;
  return clamp(v, 520, 1120);
}

function applyMetricExplorerPlotSize() {
  if (!els.metricExplorerPlotWrap) return;
  ensureMetricExplorerControls();
  const w = clampMetricExplorerPlotWidth(state.metricExplorer.current.plot_width_px);
  const h = clamp(Number(state.metricExplorer.current.plot_height_px), 320, 900);
  state.metricExplorer.current.plot_width_px = w;
  state.metricExplorer.current.plot_height_px = h;
  els.metricExplorerPlotWrap.style.setProperty('--metricExplorerPlotW', `${w}px`);
  els.metricExplorerPlotWrap.style.height = `${h}px`;
}

function metricExplorerCurrentSettings() {
  const cur = state.metricExplorer?.current || {};
  return {
    sort: ['original', 'mean_desc', 'mean_asc'].includes(cur.sort) ? cur.sort : 'original',
    y_zero: cur.y_zero !== false,
    show_grid: cur.show_grid !== false,
    show_labels: Boolean(cur.show_labels),
    ...normalizeMetricTypography(cur, cur.metric_key),
  };
}

function getMetricExplorerRows(metricKey, settings = {}) {
  const rows = getMetricExplorerSampleRows();
  const colorBySample = new Map((state.project.samples || []).map((s) => [String(s.name || ''), normalizeHexColor(s.color_hex, '#a9d0f5')]));
  const pts = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const mean = optionalFiniteNumber(r?.[`${metricKey}_mean`]);
    if (!Number.isFinite(mean)) continue;
    const sem = optionalFiniteNumber(r?.[`${metricKey}_sem`]);
    pts.push({
      i,
      sample: String(r?.sample || 'Sample'),
      color: colorBySample.get(String(r?.sample || '')) || '#a9d0f5',
      mean,
      sem: Number.isFinite(sem) ? sem : null,
    });
  }
  const sort = ['original', 'mean_desc', 'mean_asc'].includes(settings.sort) ? settings.sort : 'original';
  if (sort === 'mean_desc') pts.sort((a, b) => b.mean - a.mean || a.i - b.i);
  else if (sort === 'mean_asc') pts.sort((a, b) => a.mean - b.mean || a.i - b.i);
  else pts.sort((a, b) => a.i - b.i);
  return pts;
}

function setMetricExplorerMessage(msg) {
  if (!els.metricExplorerPlot) return;
  els.metricExplorerPlot.innerHTML = `<div class="muted" style="padding:10px;">${escapeHtml(msg)}</div>`;
}

function getMetricExplorerSampleRows() {
  return Array.isArray(state.summaryData?.sampleRows) ? state.summaryData.sampleRows : [];
}

function buildMetricExplorerSpec(metricKey, style, settings = {}, title = null) {
  const def = metricExplorerDef(metricKey);
  const cfg = {
    sort: ['original', 'mean_desc', 'mean_asc'].includes(settings.sort) ? settings.sort : 'original',
    y_zero: settings.y_zero !== false,
    show_grid: settings.show_grid !== false,
    show_labels: Boolean(settings.show_labels),
  };
  const pts = getMetricExplorerRows(metricKey, cfg).map((p) => ({
    ...p,
    semTxt: Number.isFinite(optionalFiniteNumber(p.sem)) ? format(p.sem, 4) : 'n/a',
  }));
  if (!pts.length) return { hasData: false, data: [], layout: {} };

  const x = pts.map((p) => p.sample);
  const y = pts.map((p) => p.mean);
  const colors = pts.map((p) => p.color || '#a9d0f5');
  const lineColors = colors.map((c) => colorWithAdjustedLightness(c, -0.24));
  const err = pts.map((p) => Number.isFinite(optionalFiniteNumber(p.sem)) ? Number(p.sem) : 0);
  const hover = pts.map((p) => `Sample: ${p.sample}<br>Mean: ${format(p.mean, 6)} ${def.unit}<br>SEM: ${p.semTxt} ${def.unit}`);
  const labels = pts.map((p) => format(p.mean, 4));

  const traceCommon = {
    x,
    y,
    customdata: hover,
    hovertemplate: '%{customdata}<extra></extra>',
    error_y: {
      type: 'data',
      array: err,
      visible: true,
      thickness: 1.2,
      width: 4,
      color: '#475569',
    },
  };

  const data = style === 'bar'
    ? [{
        type: 'bar',
        ...traceCommon,
        marker: { color: colors, line: { color: lineColors, width: 0.8 } },
        text: cfg.show_labels ? labels : undefined,
        textposition: cfg.show_labels ? 'auto' : undefined,
      }]
    : [{
        type: 'scatter',
        mode: cfg.show_labels ? 'markers+text' : 'markers',
        ...traceCommon,
        marker: { color: colors, size: 10, line: { color: lineColors, width: 0.8 } },
        text: cfg.show_labels ? labels : undefined,
        textposition: cfg.show_labels ? 'top center' : undefined,
      }];

  const chartLabel = style === 'bar' ? 'Bar + SEM' : 'Dot + SEM';
  const typo = normalizeMetricTypography(settings, metricKey);
  const resolvePlotText = (value, fallback) => {
    if (value === null || value === undefined) return fallback;
    const s = String(value);
    return s.trim() ? s : '\u00A0';
  };
  const resolvedTitle = title === null || title === undefined
    ? resolvePlotText(typo.title_text, `${def.label} (${def.unit})`)
    : title;
  const resolvedXLabel = resolvePlotText(typo.x_axis_label, 'Sample');
  const resolvedYLabel = resolvePlotText(typo.y_axis_label, `${def.label} (${def.unit})`);
  const layout = {
    font: { family: typo.font_family },
    title: { text: resolvedTitle, font: { family: typo.font_family, size: typo.title_font_size_px } },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    hovermode: 'closest',
    margin: { l: 74, r: 18, t: 58, b: 70 },
    xaxis: {
      title: { text: resolvedXLabel, font: { family: typo.font_family, size: typo.axis_title_font_size_px } },
      tickfont: { family: typo.font_family, size: typo.tick_font_size_px },
      showline: true,
      mirror: true,
      ticks: 'outside',
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: { text: resolvedYLabel, font: { family: typo.font_family, size: typo.axis_title_font_size_px } },
      tickfont: { family: typo.font_family, size: typo.tick_font_size_px },
      showline: true,
      mirror: true,
      ticks: 'outside',
      showgrid: cfg.show_grid,
      zeroline: false,
      rangemode: cfg.y_zero ? 'tozero' : 'normal',
    },
    showlegend: false,
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0.0,
      y: 1.12,
      xanchor: 'left',
      yanchor: 'bottom',
      showarrow: false,
      text: chartLabel,
      font: { family: typo.font_family, size: Math.max(10, typo.tick_font_size_px - 1), color: '#6b7280' },
    }],
  };
  return { hasData: true, data, layout };
}

function drawMetricExplorerPlot() {
  if (!els.metricExplorerPlot) return;
  ensureMetricExplorerControls();
  applyMetricExplorerPlotSize();
  if (!window.Plotly) {
    setMetricExplorerMessage('Plotly is not available. Check network access and reload.');
    return;
  }
  const cur = state.metricExplorer.current;
  const spec = buildMetricExplorerSpec(cur.metric_key, cur.style, metricExplorerCurrentSettings(), null);
  if (!spec.hasData) {
    setMetricExplorerMessage('No aggregate sample metrics available yet.');
    return;
  }
  const config = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['select2d', 'lasso2d'],
  };
  window.Plotly.react(els.metricExplorerPlot, spec.data, spec.layout, config);
  setTimeout(() => {
    if (window.Plotly && els.metricExplorerPlot) window.Plotly.Plots.resize(els.metricExplorerPlot);
  }, 0);
}

function downloadMetricExplorerSvg() {
  if (!window.Plotly || !els.metricExplorerPlot) return;
  drawMetricExplorerPlot();
  const size = currentPlotPixelSize(els.metricExplorerPlot, state.metricExplorer.current?.plot_width_px || 760, state.metricExplorer.current?.plot_height_px || 570);
  window.Plotly.downloadImage(els.metricExplorerPlot, {
    format: 'svg',
    filename: 'metric_explorer',
    width: size.width,
    height: size.height,
    scale: 1,
  });
}

function downloadMetricExplorerCsv() {
  ensureMetricExplorerControls();
  const cur = state.metricExplorer.current;
  const def = metricExplorerDef(cur.metric_key);
  const rows = getMetricExplorerRows(cur.metric_key, metricExplorerCurrentSettings());
  const headers = ['sample', 'mean', 'sem', 'metric_key', 'metric_label', 'unit', 'style', 'sort'];
  const outRows = rows.map((r) => [
    r.sample,
    Number.isFinite(r.mean) ? String(r.mean) : '',
    Number.isFinite(optionalFiniteNumber(r.sem)) ? String(r.sem) : '',
    cur.metric_key,
    def.label,
    def.unit,
    cur.style,
    metricExplorerCurrentSettings().sort,
  ]);
  downloadCsv('metric_explorer.csv', headers, outRows);
}

function newMetricExplorerPlot() {
  ensureMetricExplorerControls();
  const cur = state.metricExplorer.current;
  const pin = {
    id: uid('mpin'),
    metric_key: cur.metric_key,
    style: cur.style,
    settings: { ...metricExplorerCurrentSettings() },
    created_at: new Date().toISOString(),
  };
  state.metricExplorer.pinned.push(pin);
  state.metricExplorer.active_pin_id = pin.id;
  markProjectChanged('metric plot added');
  renderPinnedMetricPlots();
  updateMetricPinButtonsUi();
  queueProjectAutosave('metric plot added');
}

function updateActiveMetricExplorerPlot() {
  if (!state.metricExplorer?.active_pin_id) return;
  syncCurrentToActivePinnedPlot(true);
  markProjectChanged('metric plot updated');
  updateMetricPinButtonsUi();
  queueProjectAutosave('metric plot updated');
}

function drawPinnedMetricPlot(pin) {
  if (!pin || !window.Plotly) return;
  const host = document.getElementById(`pinnedMetricPlot_${pin.id}`);
  if (!host) return;
  const def = metricExplorerDef(pin.metric_key);
  const spec = buildMetricExplorerSpec(pin.metric_key, pin.style, pin.settings || {}, `${def.label} (${def.unit})`);
  if (!spec.hasData) {
    host.innerHTML = '<div class="muted" style="padding:8px;">No data for this metric.</div>';
    return;
  }
  const h = Math.max(180, Math.floor(host.clientHeight || 220));
  const layout = {
    ...spec.layout,
    title: { text: '', font: { size: 11 } },
    margin: { l: 38, r: 8, t: 8, b: 28 },
    height: h,
    annotations: [],
    xaxis: {
      ...(spec.layout.xaxis || {}),
      title: '',
      tickfont: { size: 9 },
    },
    yaxis: {
      ...(spec.layout.yaxis || {}),
      title: '',
      tickfont: { size: 9 },
    },
  };
  const config = {
    responsive: true,
    staticPlot: true,
    displayModeBar: false,
    displaylogo: false,
  };
  window.Plotly.react(host, spec.data, layout, config);
}

function renderPinnedMetricPlots() {
  if (!els.pinnedMetricPlots) return;
  const pins = Array.isArray(state.metricExplorer?.pinned) ? state.metricExplorer.pinned : [];
  if (!pins.length) {
    state.metricExplorer.active_pin_id = null;
    els.pinnedMetricPlots.innerHTML = '<div class="muted">No pinned metric plots.</div>';
    updateMetricPinButtonsUi();
    return;
  }

  els.pinnedMetricPlots.innerHTML = pins
    .map((pin, i) => {
      const def = metricExplorerDef(pin.metric_key);
      const styleLabel = pin.style === 'bar' ? 'Bar + SEM' : 'Dot + SEM';
      return `
      <div class="pinnedMetricCard${state.metricExplorer?.active_pin_id === pin.id ? ' activePin' : ''}" data-pin-id="${pin.id}" role="button" tabindex="0" title="Load into Metric Explorer">
        <div class="pinnedMetricHead">
          <span class="pinnedMetricTitle">#${i + 1} ${escapeHtml(def.label)} · ${styleLabel}</span>
          <button type="button" class="removePinnedMetricPlotBtn" data-pin-id="${pin.id}">Remove</button>
        </div>
        <div class="pinnedMetricBody">
          <div id="pinnedMetricPlot_${pin.id}" class="pinnedMetricPlot"></div>
        </div>
      </div>`;
    })
    .join('');

  if (!window.Plotly) return;
  for (const pin of pins) {
    drawPinnedMetricPlot(pin);
  }
  updateMetricPinButtonsUi();
}

function redrawVisiblePinnedMetricPlots() {
  if (!window.Plotly) return;
  for (const pin of state.metricExplorer?.pinned || []) {
    drawPinnedMetricPlot(pin);
  }
}

function loadPinnedMetricToExplorer(pinId) {
  const pin = (state.metricExplorer.pinned || []).find((p) => p.id === pinId);
  if (!pin) return;
  state.metricExplorer.active_pin_id = pin.id;
  const typo = normalizeMetricTypography(pin.settings || {}, pin.metric_key);
  state.metricExplorer.current = {
    metric_key: pin.metric_key,
    style: pin.style,
    sort: pin.settings?.sort || 'original',
    y_zero: pin.settings?.y_zero !== false,
    show_grid: pin.settings?.show_grid !== false,
    show_labels: Boolean(pin.settings?.show_labels),
    ...typo,
    plot_width_px: state.metricExplorer.current?.plot_width_px || 760,
    plot_height_px: state.metricExplorer.current?.plot_height_px || 570,
  };
  ensureMetricExplorerControls();
  drawMetricExplorerPlot();
  renderPinnedMetricPlots();
  updateMetricPinButtonsUi();
}

function setupMetricExplorerResizeHandles() {
  if (!els.metricExplorerPlotWrap) return;
  const edgePx = 14;
  let ghost = null;

  const setGhostRect = (left, top, width, height) => {
    if (!ghost) {
      ghost = document.createElement('div');
      ghost.className = 'metricExplorerResizeGhost';
      document.body.appendChild(ghost);
    }
    ghost.style.left = `${left}px`;
    ghost.style.top = `${top}px`;
    ghost.style.width = `${Math.max(80, width)}px`;
    ghost.style.height = `${Math.max(80, height)}px`;
  };

  const clearGhost = () => {
    if (!ghost) return;
    ghost.remove();
    ghost = null;
  };

  const startDrag = (mode, evt) => {
    if (!(evt instanceof MouseEvent)) return;
    evt.preventDefault();
    const rect = els.metricExplorerPlotWrap.getBoundingClientRect();
    state.metricExplorerResize = {
      mode,
      startX: evt.clientX,
      startY: evt.clientY,
      startW: rect.width,
      startH: rect.height,
      rectLeft: rect.left,
      rectTop: rect.top,
      nextW: rect.width,
      nextH: rect.height,
    };
    setGhostRect(rect.left, rect.top, rect.width, rect.height);
    document.body.style.userSelect = 'none';
  };

  const detectEdgeMode = (evt) => {
    const rect = els.metricExplorerPlotWrap.getBoundingClientRect();
    const nearR = rect.right - evt.clientX <= edgePx;
    const nearB = rect.bottom - evt.clientY <= edgePx;
    if (nearR && !nearB) return 'right';
    if (nearB && !nearR) return 'bottom';
    if (nearR && nearB) return 'right';
    return null;
  };

  els.metricExplorerResizeRight?.addEventListener('mousedown', (evt) => startDrag('right', evt));
  els.metricExplorerResizeBottom?.addEventListener('mousedown', (evt) => startDrag('bottom', evt));
  els.metricExplorerPlotWrap.addEventListener('mousedown', (evt) => {
    if (!(evt instanceof MouseEvent)) return;
    const mode = detectEdgeMode(evt);
    if (!mode) return;
    startDrag(mode, evt);
  });

  window.addEventListener('mousemove', (evt) => {
    const d = state.metricExplorerResize;
    if (!d) {
      if (!els.metricExplorerPlotWrap) return;
      const mode = detectEdgeMode(evt);
      if (mode === 'right') els.metricExplorerPlotWrap.style.cursor = 'ew-resize';
      else if (mode === 'bottom') els.metricExplorerPlotWrap.style.cursor = 'ns-resize';
      else els.metricExplorerPlotWrap.style.cursor = 'default';
      return;
    }
    let w = d.startW;
    if (d.mode === 'right') w = d.startW + (evt.clientX - d.startX);
    else w = d.startW;
    if (d.mode === 'right') {
      d.nextW = clampMetricExplorerPlotWidth(w);
    } else {
      d.nextH = clamp(d.startH + (evt.clientY - d.startY), 320, 900);
    }
    setGhostRect(d.rectLeft, d.rectTop, d.nextW, d.nextH);
  });

  window.addEventListener('mouseup', () => {
    if (!state.metricExplorerResize) return;
    const d = state.metricExplorerResize;
    state.metricExplorer.current.plot_width_px = clampMetricExplorerPlotWidth(d.nextW);
    state.metricExplorer.current.plot_height_px = clamp(d.nextH, 320, 900);
    applyMetricExplorerPlotSize();
    if (window.Plotly && els.metricExplorerPlot) window.Plotly.Plots.resize(els.metricExplorerPlot);
    state.metricExplorerResize = null;
    clearGhost();
    if (els.metricExplorerPlotWrap) els.metricExplorerPlotWrap.style.cursor = 'default';
    document.body.style.userSelect = '';
  });
}

function setupSummaryPlotResizeHandles() {
  if (!els.summaryPlotWrap) return;
  const edgePx = 14;
  let ghost = null;

  const setGhostRect = (left, top, width, height) => {
    if (!ghost) {
      ghost = document.createElement('div');
      ghost.className = 'metricExplorerResizeGhost';
      document.body.appendChild(ghost);
    }
    ghost.style.left = `${left}px`;
    ghost.style.top = `${top}px`;
    ghost.style.width = `${Math.max(80, width)}px`;
    ghost.style.height = `${Math.max(80, height)}px`;
  };

  const clearGhost = () => {
    if (!ghost) return;
    ghost.remove();
    ghost = null;
  };

  const startDrag = (mode, evt) => {
    if (!(evt instanceof MouseEvent)) return;
    evt.preventDefault();
    const rect = els.summaryPlotWrap.getBoundingClientRect();
    state.summaryPlotResize = {
      mode,
      startX: evt.clientX,
      startY: evt.clientY,
      startW: rect.width,
      startH: rect.height,
      rectLeft: rect.left,
      rectTop: rect.top,
      nextW: rect.width,
      nextH: rect.height,
    };
    setGhostRect(rect.left, rect.top, rect.width, rect.height);
    document.body.style.userSelect = 'none';
  };

  const detectEdgeMode = (evt) => {
    const rect = els.summaryPlotWrap.getBoundingClientRect();
    const nearR = rect.right - evt.clientX <= edgePx;
    const nearB = rect.bottom - evt.clientY <= edgePx;
    if (nearR && !nearB) return 'right';
    if (nearB && !nearR) return 'bottom';
    if (nearR && nearB) return 'right';
    return null;
  };

  els.summaryPlotResizeRight?.addEventListener('mousedown', (evt) => startDrag('right', evt));
  els.summaryPlotResizeBottom?.addEventListener('mousedown', (evt) => startDrag('bottom', evt));
  els.summaryPlotWrap.addEventListener('mousedown', (evt) => {
    if (!(evt instanceof MouseEvent)) return;
    if (evt.target instanceof HTMLElement && evt.target.closest('.summaryLegendTab')) return;
    const mode = detectEdgeMode(evt);
    if (!mode) return;
    startDrag(mode, evt);
  });

  window.addEventListener('mousemove', (evt) => {
    const d = state.summaryPlotResize;
    if (!d) {
      if (!els.summaryPlotWrap) return;
      const mode = detectEdgeMode(evt);
      if (mode === 'right') els.summaryPlotWrap.style.cursor = 'ew-resize';
      else if (mode === 'bottom') els.summaryPlotWrap.style.cursor = 'ns-resize';
      else els.summaryPlotWrap.style.cursor = 'default';
      return;
    }
    if (d.mode === 'right') d.nextW = clampSummaryPlotWidth(d.startW + (evt.clientX - d.startX));
    else d.nextH = clampSummaryPlotHeight(d.startH + (evt.clientY - d.startY));
    setGhostRect(d.rectLeft, d.rectTop, d.nextW, d.nextH);
  });

  window.addEventListener('mouseup', () => {
    if (!state.summaryPlotResize) return;
    const d = state.summaryPlotResize;
    applySummaryPlotSize(d.nextW, d.nextH);
    if (window.Plotly && els.summaryPlot) window.Plotly.Plots.resize(els.summaryPlot);
    state.summaryPlotResize = null;
    clearGhost();
    if (els.summaryPlotWrap) els.summaryPlotWrap.style.cursor = 'default';
    document.body.style.userSelect = '';
  });
}

function renderMetricExplorerSection() {
  ensureMetricExplorerControls();
  drawMetricExplorerPlot();
  renderPinnedMetricPlots();
}

function getSummaryCurveSeries() {
  const out = [];
  for (const s of state.project.samples || []) {
    const reps = s.replicas || [];
    const baseColor = normalizeHexColor(s.color_hex, '#a9d0f5');
    for (let ri = 0; ri < reps.length; ri++) {
      const r = reps[ri];
      const key = replicaDataCacheKey(s.id, r.id);
      const cached = state.replicaDataCache[key] || r?.cache?.curve_ref || null;
      if (!cached || !Array.isArray(cached.disp) || !Array.isArray(cached.force) || cached.disp.length < 2) continue;
      const geom = getReplicaGeometry(r);
      out.push({
        sample_id: s.id,
        sample: s.name,
        replica: r.name,
        file_name: r.file_name || '',
        color: getReplicaShadeColor(baseColor, ri, reps.length),
        area_mm2: geom.area_mm2,
        thickness_mm: geom.thickness_mm,
        disp: cached.disp,
        force: cached.force,
        toe_disp_mm: optionalFiniteNumber(r.cache?.toe_disp_mm),
      });
    }
  }
  return out;
}

function setSummaryPlotMessage(msg) {
  if (!els.summaryPlot) return;
  els.summaryPlot.innerHTML = `<div class="muted" style="padding:10px;">${escapeHtml(msg)}</div>`;
  state.summaryPlotData = null;
}

function clampSummaryPlotWidth(px) {
  const v = Number(px);
  if (!Number.isFinite(v)) return 900;
  return clamp(v, 620, 1500);
}

function clampSummaryPlotHeight(px) {
  const v = Number(px);
  if (!Number.isFinite(v)) return 540;
  return clamp(v, 360, 980);
}

function applySummaryPlotSize(widthPx, heightPx) {
  if (!els.summaryPlotWrap) return;
  const w = clampSummaryPlotWidth(widthPx ?? state.summaryPlotSize?.w ?? 900);
  const h = clampSummaryPlotHeight(heightPx ?? state.summaryPlotSize?.h ?? 540);
  state.summaryPlotSize = { w, h };
  els.summaryPlotWrap.style.setProperty('--summaryPlotW', `${w}px`);
  els.summaryPlotWrap.style.height = `${h}px`;
}

function syncSummaryLegendTab() {
  if (!els.summaryLegendTab) return;
  els.summaryLegendTab.textContent = state.summaryLegendExpanded ? 'Hide Legend' : 'Show Legend';
}

function interpolateLinear(xArr, yArr, x) {
  if (!Array.isArray(xArr) || !Array.isArray(yArr) || xArr.length < 2 || yArr.length < 2) return null;
  if (x < xArr[0] || x > xArr[xArr.length - 1]) return null;
  let lo = 0;
  let hi = xArr.length - 1;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (xArr[mid] <= x) lo = mid;
    else hi = mid;
  }
  const xa = xArr[lo];
  const xb = xArr[hi];
  const ya = yArr[lo];
  const yb = yArr[hi];
  if (!Number.isFinite(xa) || !Number.isFinite(xb) || xb === xa) return null;
  const t = (x - xa) / (xb - xa);
  return ya * (1 - t) + yb * t;
}

function buildSummarySeriesCurves(rawSeries, includeToe, wantStressStrain) {
  const curves = [];
  let skippedForGeometry = 0;
  for (let si = 0; si < rawSeries.length; si++) {
    const s = rawSeries[si];
    const disp = s.disp;
    const force = s.force;
    const canStressStrain = s.area_mm2 > 0 && s.thickness_mm > 0;
    if (wantStressStrain && !canStressStrain) {
      skippedForGeometry += 1;
      continue;
    }
    const useStressStrain = wantStressStrain && canStressStrain;
    let start = 0;
    if (!includeToe && Number.isFinite(s.toe_disp_mm)) {
      while (start < disp.length - 1 && Number(disp[start]) < s.toe_disp_mm) start += 1;
    }
    if (start >= disp.length - 1) continue;
    const xStartVal = dispToViewX(Number(disp[start]), useStressStrain, s.thickness_mm);
    const xOffset = includeToe ? 0 : xStartVal;
    const xVals = [];
    const yVals = [];
    for (let i = start; i < disp.length; i++) {
      const x = dispToViewX(Number(disp[i]), useStressStrain, s.thickness_mm) - xOffset;
      const y = forceToViewY(Number(force[i]), useStressStrain, s.area_mm2);
      if (Number.isFinite(x) && Number.isFinite(y)) {
        xVals.push(x);
        yVals.push(y);
      }
    }
    if (xVals.length < 2) continue;
    curves.push({
      ...s,
      curve_x: xVals,
      curve_y: yVals,
    });
  }
  return { curves, skippedForGeometry };
}


function summaryPlotTypography() {
  return normalizeSummaryPlotStyle(state.summaryPlotStyle || {});
}

function applySummaryTypographyControls() {
  const st = summaryPlotTypography();
  state.summaryPlotStyle = { ...st };
  if (els.summaryFontFamily) els.summaryFontFamily.value = st.font_family;
  if (els.summaryUseGlobalFontSize) els.summaryUseGlobalFontSize.checked = Boolean(st.use_global_font_size);
  if (els.summaryGlobalFontSize) els.summaryGlobalFontSize.value = String(st.global_font_size_px);
  if (els.summaryTickFontSize) els.summaryTickFontSize.value = String(st.tick_font_size_px);
  if (els.summaryTitleFontSize) els.summaryTitleFontSize.value = String(st.title_font_size_px);
  if (els.summaryAxisTitleFontSize) els.summaryAxisTitleFontSize.value = String(st.axis_title_font_size_px);
  if (els.summaryTitleText) els.summaryTitleText.value = st.title_text ?? '';
  if (els.summaryXAxisLabel) els.summaryXAxisLabel.value = st.x_axis_label ?? '';
  if (els.summaryYAxisLabel) els.summaryYAxisLabel.value = st.y_axis_label ?? '';
  syncSummaryGlobalFontUi();
}

function syncSummaryGlobalFontUi() {
  const on = Boolean(els.summaryUseGlobalFontSize?.checked);
  const globalCombo = els.summaryGlobalFontSize?.closest('.fontSizeCombo');
  if (globalCombo instanceof HTMLElement) globalCombo.style.display = on ? '' : 'none';
  [els.summaryTickFontSize, els.summaryTitleFontSize, els.summaryAxisTitleFontSize].forEach((el) => {
    if (!(el instanceof HTMLInputElement)) return;
    const label = el.closest('label');
    if (label instanceof HTMLElement) label.style.display = on ? 'none' : '';
    el.disabled = on;
    el.readOnly = on;
  });
}
function buildSampleAverageTraces(curves, showShadow, lineWidth) {
  const bySample = new Map();
  for (const c of curves) {
    if (!bySample.has(c.sample)) bySample.set(c.sample, []);
    bySample.get(c.sample).push(c);
  }
  const traces = [];
  for (const [sampleName, arr] of bySample.entries()) {
    if (!arr.length) continue;
    const xmin = Math.max(...arr.map((c) => c.curve_x[0]));
    const xmax = Math.min(...arr.map((c) => c.curve_x[c.curve_x.length - 1]));
    if (!(xmax > xmin)) continue;
    const nGrid = clamp(Math.min(...arr.map((c) => c.curve_x.length)), 80, 350);
    const xg = new Array(nGrid);
    const mean = new Array(nGrid);
    const sem = new Array(nGrid);
    for (let i = 0; i < nGrid; i++) {
      const x = xmin + (i / (nGrid - 1)) * (xmax - xmin);
      xg[i] = x;
      const vals = [];
      for (const c of arr) {
        const y = interpolateLinear(c.curve_x, c.curve_y, x);
        if (Number.isFinite(y)) vals.push(y);
      }
      if (!vals.length) {
        mean[i] = NaN;
        sem[i] = NaN;
        continue;
      }
      const m = vals.reduce((a, b) => a + b, 0) / vals.length;
      mean[i] = m;
      if (vals.length < 2) {
        sem[i] = 0;
      } else {
        const varS = vals.reduce((s, v) => s + (v - m) ** 2, 0) / (vals.length - 1);
        sem[i] = Math.sqrt(varS / vals.length);
      }
    }
    const color = normalizeHexColor(arr[0].color, '#1d4ed8');
    const meanName = `${sampleName} | mean`;
    const legendGroup = `avg_${sampleName}`;
    traces.push({
      type: 'scattergl',
      mode: 'lines',
      x: xg,
      y: mean,
      name: meanName,
      legendgroup: legendGroup,
      line: { color, width: lineWidth },
      hovertemplate: '%{x:.5g}, %{y:.5g}<extra>%{fullData.name}</extra>',
    });
    if (showShadow) {
      const upper = mean.map((v, i) => (Number.isFinite(v) && Number.isFinite(sem[i])) ? v + sem[i] : NaN);
      const lower = mean.map((v, i) => (Number.isFinite(v) && Number.isFinite(sem[i])) ? v - sem[i] : NaN);
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: xg,
        y: upper,
        legendgroup: legendGroup,
        line: { color: 'rgba(0,0,0,0)', width: 0 },
        hoverinfo: 'skip',
        showlegend: false,
      });
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: xg,
        y: lower,
        fill: 'tonexty',
        fillcolor: hexToRgba(colorWithAdjustedLightness(color, 0.16), 0.22),
        legendgroup: legendGroup,
        line: { color: 'rgba(0,0,0,0)', width: 0 },
        name: `${sampleName} SEM`,
        hoverinfo: 'skip',
        showlegend: false,
      });
    }
  }
  return traces;
}

function drawSummaryPlot() {
  if (!els.summaryPlot) return;
  if (!document.getElementById('summaryTab')?.classList.contains('active')) return;
  if (!window.Plotly) {
    setSummaryPlotMessage('Plotly is not available. Check network access and reload.');
    return;
  }

  const series = getSummaryCurveSeries();
  if (!series.length) {
    setSummaryPlotMessage('No precomputed curves available yet.');
    return;
  }

  const includeToe = Boolean(els.summaryShowToeRegion?.checked);
  const wantStressStrain = Boolean(els.summaryUseStressStrain?.checked);
  const useSampleAverage = Boolean(els.summaryUseSampleAverage?.checked);
  const showAverageShadow = Boolean(els.summaryShowAverageShadow?.checked);
  const lineWidth = clamp(Number(els.summaryLineWidth?.value || 1.8), 0.8, 6.0);
  const { curves, skippedForGeometry } = buildSummarySeriesCurves(series, includeToe, wantStressStrain);
  const traces = [];
  if (useSampleAverage) {
    traces.push(...buildSampleAverageTraces(curves, showAverageShadow, lineWidth));
  } else {
    for (const s of curves) {
      traces.push({
        type: 'scattergl',
        mode: 'lines',
        x: s.curve_x,
        y: s.curve_y,
        name: `${s.sample} | ${s.file_name || s.replica || 'replica'}`,
        line: { color: s.color || '#1d4ed8', width: lineWidth },
        hovertemplate: '%{x:.5g}, %{y:.5g}<extra>%{fullData.name}</extra>',
      });
    }
  }
  if (!traces.length) {
    if (wantStressStrain && skippedForGeometry > 0) {
      setSummaryPlotMessage('No curves have valid area/thickness for stress-strain view.');
    } else {
      setSummaryPlotMessage('No curves available for current toe-region filter.');
    }
    return;
  }
  const defaultXAxisLabel = wantStressStrain
    ? (includeToe ? 'Strain (%)' : 'Strain from toe end (%)')
    : (includeToe ? 'Displacement (mm)' : 'Displacement from toe end (mm)');
  const defaultYAxisLabel = wantStressStrain ? 'Stress (MPa)' : 'Load / Force (N)';
  const typo = summaryPlotTypography();
  const resolvePlotText = (value, fallback) => {
    if (value === null || value === undefined) return fallback;
    const s = String(value);
    return s.trim() ? s : '\u00A0';
  };
  const xAxisLabel = resolvePlotText(typo.x_axis_label, defaultXAxisLabel);
  const yAxisLabel = resolvePlotText(typo.y_axis_label, defaultYAxisLabel);

  const layout = {
    font: { family: typo.font_family },
    title: { text: resolvePlotText(typo.title_text, 'All Load-Displacement Curves'), font: { family: typo.font_family, size: typo.title_font_size_px } },
    paper_bgcolor: '#ffffff',
    plot_bgcolor: '#ffffff',
    hovermode: 'closest',
    margin: { l: 80, r: state.summaryLegendExpanded ? 250 : 28, t: 58, b: 68 },
    xaxis: { title: { text: xAxisLabel, font: { family: typo.font_family, size: typo.axis_title_font_size_px } }, tickfont: { family: typo.font_family, size: typo.tick_font_size_px }, showline: true, mirror: true, ticks: 'outside', showgrid: true, zeroline: false },
    yaxis: { title: { text: yAxisLabel, font: { family: typo.font_family, size: typo.axis_title_font_size_px } }, tickfont: { family: typo.font_family, size: typo.tick_font_size_px }, showline: true, mirror: true, ticks: 'outside', showgrid: true, zeroline: false },
    showlegend: state.summaryLegendExpanded,
    legend: {
      x: 1.02, y: 1, xanchor: 'left', yanchor: 'top',
      bgcolor: 'rgba(255,255,255,0.9)',
      groupclick: 'togglegroup',
    },
    annotations: skippedForGeometry > 0
      ? [{
          xref: 'paper',
          yref: 'paper',
          x: 0.0,
          y: 1.12,
          xanchor: 'left',
          yanchor: 'bottom',
          showarrow: false,
          text: wantStressStrain
            ? `Excluded ${skippedForGeometry} curve(s) without area/thickness.`
            : '',
          font: { family: typo.font_family, size: Math.max(10, typo.tick_font_size_px - 1), color: '#6b7280' },
        }]
      : [],
  };
  const config = {
    responsive: true,
    displaylogo: false,
    toImageButtonOptions: {
      format: 'svg',
      filename: 'summary_load_displacement',
      width: currentPlotPixelSize(els.summaryPlot, state.summaryPlotSize?.w || 900, state.summaryPlotSize?.h || 540).width,
      height: currentPlotPixelSize(els.summaryPlot, state.summaryPlotSize?.w || 900, state.summaryPlotSize?.h || 540).height,
      scale: 1,
    },
  };
  window.Plotly.react(els.summaryPlot, traces, layout, config);
  state.summaryPlotData = {
    traces: traces.map((t) => ({ name: String(t.name || ''), x: Array.from(t.x || []), y: Array.from(t.y || []) })),
    x_label: xAxisLabel,
    y_label: yAxisLabel,
  };
}

function downloadSummaryPlotSvg() {
  if (!els.summaryPlot || !window.Plotly) return;
  drawSummaryPlot();
  const size = currentPlotPixelSize(els.summaryPlot, state.summaryPlotSize?.w || 900, state.summaryPlotSize?.h || 540);
  window.Plotly.downloadImage(els.summaryPlot, {
    format: 'svg',
    filename: 'summary_load_displacement',
    width: size.width,
    height: size.height,
    scale: 1,
  });
}

function uniqueSortedXGrid(curves) {
  const seen = new Set();
  const x = [];
  for (const c of curves || []) {
    for (const v of c.curve_x || []) {
      if (!Number.isFinite(v)) continue;
      const key = Number(v).toPrecision(12);
      if (seen.has(key)) continue;
      seen.add(key);
      x.push(Number(v));
    }
  }
  x.sort((a, b) => a - b);
  return x;
}

function buildCurveExportSheets(curves, xLabel, yLabel, sheetPrefix) {
  const note = `Note: curves are interpolated onto a common ${xLabel} grid before export (${yLabel}).`;
  if (!Array.isArray(curves) || !curves.length) {
    return [
      { name: `${sheetPrefix} All Replicas`, note, headers: [xLabel], rows: [['No data']] },
      { name: `${sheetPrefix} Means`, note, headers: [xLabel], rows: [['No data']] },
    ];
  }

  const xGrid = uniqueSortedXGrid(curves);
  const replicaHeaders = [xLabel, ...curves.map((c) => `${c.sample} | ${c.file_name || c.replica || 'replica'}`)];
  const replicaRows = xGrid.map((xv) => {
    const row = [xv];
    for (const c of curves) {
      const y = interpolateLinear(c.curve_x, c.curve_y, xv);
      row.push(Number.isFinite(y) ? y : '');
    }
    return row;
  });

  const bySample = new Map();
  for (const c of curves) {
    if (!bySample.has(c.sample)) bySample.set(c.sample, []);
    bySample.get(c.sample).push(c);
  }
  const sampleNames = Array.from(bySample.keys());
  const meanHeaders = [xLabel, ...sampleNames];
  const meanRows = xGrid.map((xv) => {
    const row = [xv];
    for (const sName of sampleNames) {
      const vals = [];
      for (const c of bySample.get(sName) || []) {
        const y = interpolateLinear(c.curve_x, c.curve_y, xv);
        if (Number.isFinite(y)) vals.push(y);
      }
      row.push(vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length) : '');
    }
    return row;
  });

  return [
    { name: `${sheetPrefix} All Replicas`, note, headers: replicaHeaders, rows: replicaRows },
    { name: `${sheetPrefix} Means`, note, headers: meanHeaders, rows: meanRows },
  ];
}

function downloadSummaryPlotCsv() {
  const includeToe = Boolean(els.summaryShowToeRegion?.checked);
  const rawSeries = getSummaryCurveSeries();
  const ld = buildSummarySeriesCurves(rawSeries, includeToe, false).curves;
  const ss = buildSummarySeriesCurves(rawSeries, includeToe, true).curves;
  const sheets = [
    ...buildCurveExportSheets(ld, includeToe ? 'Displacement (mm)' : 'Displacement from toe (mm)', 'Load / Force (N)', 'Load-Disp'),
    ...buildCurveExportSheets(ss, includeToe ? 'Strain (%)' : 'Strain from toe (%)', 'Stress (MPa)', 'Stress-Strain'),
  ];
  const xml = buildSpreadsheetXml(sheets);
  downloadTextFile('summary_curves.xls', xml, 'application/vnd.ms-excel');
}

const ZIP_CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = ZIP_CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function u16le(x) {
  return Uint8Array.from([x & 0xff, (x >>> 8) & 0xff]);
}

function u32le(x) {
  return Uint8Array.from([x & 0xff, (x >>> 8) & 0xff, (x >>> 16) & 0xff, (x >>> 24) & 0xff]);
}

function concatBytes(parts) {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const p of parts) {
    out.set(p, off);
    off += p.length;
  }
  return out;
}

function textToBytes(s) {
  return new TextEncoder().encode(String(s ?? ''));
}

function bytesToText(b) {
  return new TextDecoder('utf-8').decode(b);
}

function float64ToBytes(arr) {
  const src = Array.isArray(arr) ? arr : [];
  const out = new Uint8Array(src.length * 8);
  const dv = new DataView(out.buffer);
  for (let i = 0; i < src.length; i++) {
    dv.setFloat64(i * 8, Number(src[i]), true);
  }
  return out;
}

function bytesToFloat64Array(bytes) {
  const n = Math.floor((bytes?.length || 0) / 8);
  const out = new Array(n);
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  for (let i = 0; i < n; i++) out[i] = dv.getFloat64(i * 8, true);
  return out;
}

function flatten2d(arr2d) {
  const rows = Array.isArray(arr2d) ? arr2d.length : 0;
  const cols = rows ? (Array.isArray(arr2d[0]) ? arr2d[0].length : 0) : 0;
  const flat = [];
  for (let r = 0; r < rows; r++) {
    const row = Array.isArray(arr2d[r]) ? arr2d[r] : [];
    for (let c = 0; c < cols; c++) flat.push(Number(row[c]));
  }
  return { flat, rows, cols };
}

function unflatten2d(flat, rows, cols) {
  const out = new Array(rows);
  let k = 0;
  for (let r = 0; r < rows; r++) {
    const row = new Array(cols);
    for (let c = 0; c < cols; c++) row[c] = Number(flat[k++]);
    out[r] = row;
  }
  return out;
}

function createZipStore(entries) {
  const enc = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;
  for (const e of entries || []) {
    const nameBytes = enc.encode(String(e.name || 'file.txt'));
    const dataBytes = (e.data instanceof Uint8Array) ? e.data : enc.encode(String(e.data ?? ''));
    const crc = crc32(dataBytes);
    const localHeader = concatBytes([
      u32le(0x04034b50),
      u16le(20), u16le(0), u16le(0),
      u16le(0), u16le(0),
      u32le(crc), u32le(dataBytes.length), u32le(dataBytes.length),
      u16le(nameBytes.length), u16le(0),
      nameBytes,
    ]);
    localParts.push(localHeader, dataBytes);

    const centralHeader = concatBytes([
      u32le(0x02014b50),
      u16le(20), u16le(20), u16le(0), u16le(0),
      u16le(0), u16le(0),
      u32le(crc), u32le(dataBytes.length), u32le(dataBytes.length),
      u16le(nameBytes.length), u16le(0), u16le(0),
      u16le(0), u16le(0), u32le(0),
      u32le(offset),
      nameBytes,
    ]);
    centralParts.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  }
  const centralDir = concatBytes(centralParts);
  const end = concatBytes([
    u32le(0x06054b50),
    u16le(0), u16le(0),
    u16le(centralParts.length), u16le(centralParts.length),
    u32le(centralDir.length),
    u32le(offset),
    u16le(0),
  ]);
  return new Blob([concatBytes(localParts), centralDir, end], { type: 'application/zip' });
}

function parseZipStore(bytes) {
  const data = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const dv = new DataView(data.buffer, data.byteOffset, data.byteLength);
  const dec = new TextDecoder('utf-8');
  let off = 0;
  const files = new Map();
  while (off + 30 <= data.length) {
    const sig = dv.getUint32(off, true);
    if (sig !== 0x04034b50) break;
    const method = dv.getUint16(off + 8, true);
    const compSize = dv.getUint32(off + 18, true);
    const uncompSize = dv.getUint32(off + 22, true);
    const nameLen = dv.getUint16(off + 26, true);
    const extraLen = dv.getUint16(off + 28, true);
    const nameStart = off + 30;
    const nameEnd = nameStart + nameLen;
    const dataStart = nameEnd + extraLen;
    const dataEnd = dataStart + compSize;
    if (dataEnd > data.length) break;
    const name = dec.decode(data.subarray(nameStart, nameEnd));
    const payload = data.slice(dataStart, dataEnd);
    if (method !== 0 || compSize !== uncompSize) {
      throw new Error(`Unsupported zip entry compression for ${name}; expected stored method.`);
    }
    files.set(name, payload);
    off = dataEnd;
  }
  return files;
}

async function downloadSummaryPlotPackageZip() {
  const includeToe = Boolean(els.summaryShowToeRegion?.checked);
  const rawSeries = getSummaryCurveSeries();
  const ld = buildCurveExportSheets(
    buildSummarySeriesCurves(rawSeries, includeToe, false).curves,
    includeToe ? 'Displacement (mm)' : 'Displacement from toe (mm)',
    'Load / Force (N)',
    'Load-Disp'
  );
  const ss = buildCurveExportSheets(
    buildSummarySeriesCurves(rawSeries, includeToe, true).curves,
    includeToe ? 'Strain (%)' : 'Strain from toe (%)',
    'Stress (MPa)',
    'Stress-Strain'
  );

  const files = [
    { name: 'load_disp_all_replicas.csv', sheet: ld[0] },
    { name: 'load_disp_means.csv', sheet: ld[1] },
    { name: 'stress_strain_all_replicas.csv', sheet: ss[0] },
    { name: 'stress_strain_means.csv', sheet: ss[1] },
  ];
  const scriptPy = [
    "import argparse",
    "from pathlib import Path",
    "import pandas as pd",
    "import plotly.graph_objects as go",
    "",
    "def plot_csv(path: Path, title: str):",
    "    df = pd.read_csv(path)",
    "    x_col = df.columns[0]",
    "    fig = go.Figure()",
    "    for col in df.columns[1:]:",
    "        y = pd.to_numeric(df[col], errors='coerce')",
    "        x = pd.to_numeric(df[x_col], errors='coerce')",
    "        mask = x.notna() & y.notna()",
    "        fig.add_trace(go.Scattergl(x=x[mask], y=y[mask], mode='lines', name=str(col)))",
    "    fig.update_layout(title=title, xaxis_title=x_col, yaxis_title='Value', hovermode='closest')",
    "    out_html = path.with_suffix('.html')",
    "    fig.write_html(out_html, include_plotlyjs='cdn')",
    "    print(f'Wrote {out_html}')",
    "",
    "def main():",
    "    ap = argparse.ArgumentParser(description='Plot exported summary curves CSV files with Plotly.')",
    "    ap.add_argument('--dir', default='.', help='Directory with CSV files')",
    "    args = ap.parse_args()",
    "    base = Path(args.dir)",
    "    targets = [",
    "        ('load_disp_all_replicas.csv', 'Load-Displacement (All Replicas)'),",
    "        ('load_disp_means.csv', 'Load-Displacement (Means)'),",
    "        ('stress_strain_all_replicas.csv', 'Stress-Strain (All Replicas)'),",
    "        ('stress_strain_means.csv', 'Stress-Strain (Means)'),",
    "    ]",
    "    for fn, title in targets:",
    "        p = base / fn",
    "        if p.exists():",
    "            plot_csv(p, title)",
    "        else:",
    "            print(f'Skipping missing file: {p}')",
    "",
    "if __name__ == '__main__':",
    "    main()",
    "",
  ].join('\n');
  const readme = [
    'Summary Plot Python Package',
    '',
    'Files:',
    '- plot_curves.py',
    '- load_disp_all_replicas.csv',
    '- load_disp_means.csv',
    '- stress_strain_all_replicas.csv',
    '- stress_strain_means.csv',
    '',
    'Note:',
    '- CSV curves are interpolated onto a common x-grid before export.',
    '',
    'Usage:',
    '1) pip install pandas plotly',
    '2) python plot_curves.py --dir .',
  ].join('\n');

  const zipEntries = [
    { name: 'plot_curves.py', data: scriptPy },
    { name: 'README.txt', data: readme },
    ...files.map((f) => ({
      name: f.name,
      data: csvTextFromTable(f.sheet.headers || [], f.sheet.rows || []),
    })),
  ];
  const zipBlob = createZipStore(zipEntries);
  downloadBlobFile('summary_plot_python_package.zip', zipBlob, 'application/zip');
}

function buildProjectZipBlob() {
  syncProjectFromConfigForm();
  const projectOut = JSON.parse(JSON.stringify(state.project));
  projectOut.ui = projectOut.ui || {};
  projectOut.ui.autosave_enabled = Boolean(state.projectAutosaveEnabled);
  projectOut.ui.metric_explorer = metricExplorerExportState();
  const includeHeatmap = Boolean(projectOut.ui?.include_heatmap_in_export);
  const entries = [];
  const manifest = {
    format: 'stt',
    version: 1,
    created_at: new Date().toISOString(),
    note: 'Project state with binary numeric arrays.',
  };

  for (const s of projectOut.samples || []) {
    for (const r of s.replicas || []) {
      const cacheKey = replicaDataCacheKey(s.id, r.id);
      const curveData = state.replicaDataCache[cacheKey];
      if (hasUsableCurveCache(curveData)) {
        const base = `curves/${s.id}/${r.id}`;
        const dispPath = `${base}_disp_f64.bin`;
        const forcePath = `${base}_force_f64.bin`;
        entries.push({ name: dispPath, data: float64ToBytes(curveData.disp) });
        entries.push({ name: forcePath, data: float64ToBytes(curveData.force) });
        const curveRef = {
          _bin_ref: true,
          cfg_key: String(curveData.cfg_key || ''),
          n_points: Number.isFinite(Number(curveData.n_points)) ? Number(curveData.n_points) : curveData.disp.length,
          disp_path: dispPath,
          force_path: forcePath,
        };
        if (
          curveData.d2
          && Array.isArray(curveData.d2.x)
          && Array.isArray(curveData.d2.d2)
          && curveData.d2.x.length
          && curveData.d2.x.length === curveData.d2.d2.length
        ) {
          const d2xPath = `${base}_d2x_f64.bin`;
          const d2yPath = `${base}_d2y_f64.bin`;
          entries.push({ name: d2xPath, data: float64ToBytes(curveData.d2.x) });
          entries.push({ name: d2yPath, data: float64ToBytes(curveData.d2.d2) });
          curveRef.d2_x_path = d2xPath;
          curveRef.d2_y_path = d2yPath;
        }
        if (!(r.cache && typeof r.cache === 'object')) r.cache = {};
        r.cache.curve_ref = curveRef;
      } else if (r.cache && typeof r.cache === 'object') {
        r.cache.curve_ref = null;
      }

      const csvText = String(r.csv_text || '');
      if (csvText) {
        const rawPath = `raw/${s.id}/${r.id}.csv`;
        entries.push({ name: rawPath, data: textToBytes(csvText) });
        r.csv_path = rawPath;
        r.csv_text = '';
      }
      if (!(r.cache && typeof r.cache === 'object')) continue;

      const domains = Array.isArray(r.cache.domains) ? r.cache.domains : [];
      if (domains.length) {
        const domPath = `domains/${s.id}/${r.id}.json`;
        entries.push({ name: domPath, data: textToBytes(JSON.stringify(domains)) });
        r.cache.domains_path = domPath;
        r.cache.domains = [];
      }

      if (!includeHeatmap) {
        r.cache.heatmap = null;
        continue;
      }
      const hm = r.cache.heatmap;
      if (!hm || typeof hm !== 'object') continue;
      const centers = Array.isArray(hm.centers_disp) ? hm.centers_disp : null;
      const widths = Array.isArray(hm.widths_disp) ? hm.widths_disp : null;
      const grid = Array.isArray(hm.score_grid) ? hm.score_grid : null;
      if (!centers || !widths || !grid) continue;

      const { flat, rows, cols } = flatten2d(grid);
      const base = `arrays/${s.id}/${r.id}/heatmap`;
      const centersPath = `${base}_centers_f64.bin`;
      const widthsPath = `${base}_widths_f64.bin`;
      const gridPath = `${base}_score_f64.bin`;
      entries.push({ name: centersPath, data: float64ToBytes(centers) });
      entries.push({ name: widthsPath, data: float64ToBytes(widths) });
      entries.push({ name: gridPath, data: float64ToBytes(flat) });

      r.cache.heatmap = {
        _bin_ref: true,
        centers_path: centersPath,
        widths_path: widthsPath,
        score_path: gridPath,
        score_shape: [rows, cols],
      };
    }
  }

  const payload = {
    manifest,
    project: projectOut,
  };
  entries.push({ name: 'manifest.json', data: JSON.stringify(manifest, null, 2) });
  entries.push({ name: 'project.json', data: JSON.stringify(payload, null, 2) });
  return createZipStore(entries);
}

async function exportProject(mode = 'save_as') {
  const zipBlob = buildProjectZipBlob();
  if (mode === 'update' && state.projectAutosaveEnabled) {
    setAutosaveStatus('saving');
  }
  const ok = await saveProjectBlob(zipBlob, mode);
  if (ok) {
    const nowIso = new Date().toISOString();
    state.projectLastSavedAt = nowIso;
    state.projectLastSavedBytes = Number(zipBlob.size) || null;
    state.projectDirty = false;
    if (mode === 'update') {
      setAutosaveStatus('saved', { last_saved_at: nowIso });
    }
    setPrecomputeInfo(
      mode === 'update'
        ? `Project updated: ${state.projectSaveName || 'ld_project.stt'}`
        : `Project saved: ${state.projectSaveName || 'ld_project.stt'}`
    );
    renderProjectInfo();
  }
}

async function importProjectFromFile(file) {
  if (file) {
    state.projectLastSavedBytes = Number(file.size) || null;
    state.projectLastSavedAt = Number(file.lastModified)
      ? new Date(file.lastModified).toISOString()
      : null;
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const looksZip = bytes.length >= 4
    && bytes[0] === 0x50
    && bytes[1] === 0x4b
    && (bytes[2] === 0x03 || bytes[2] === 0x05 || bytes[2] === 0x07)
    && (bytes[3] === 0x04 || bytes[3] === 0x06 || bytes[3] === 0x08);
  if (!looksZip) {
    throw new Error('Invalid project file. Expected .stt zip package.');
  }
  const zipFiles = parseZipStore(bytes);
  const projectBytes = zipFiles.get('project.json');
  if (!projectBytes) throw new Error('Invalid .stt file: missing project.json');
  const obj = JSON.parse(bytesToText(projectBytes));
  state.projectSchemaVersion = Number(obj?.manifest?.version) || 1;
  const projTmp = obj.project || obj;
  for (const s of projTmp.samples || []) {
    for (const r of s.replicas || []) {
      const csvPath = String(r.csv_path || '');
      if (csvPath) {
        const raw = zipFiles.get(csvPath);
        r.csv_text = raw ? bytesToText(raw) : '';
      }
      const domPath = String(r?.cache?.domains_path || '');
      if (domPath && r?.cache && typeof r.cache === 'object') {
        const domRaw = zipFiles.get(domPath);
        if (domRaw) {
          try {
            const parsed = JSON.parse(bytesToText(domRaw));
            r.cache.domains = Array.isArray(parsed) ? parsed : [];
          } catch (_) {
            r.cache.domains = [];
          }
        } else {
          r.cache.domains = [];
        }
      }
      const cref = r?.cache?.curve_ref;
      if (cref && cref._bin_ref) {
        const dispB = zipFiles.get(cref.disp_path);
        const forceB = zipFiles.get(cref.force_path);
        if (dispB && forceB) {
          cref.disp = bytesToFloat64Array(dispB);
          cref.force = bytesToFloat64Array(forceB);
          const d2xB = cref.d2_x_path ? zipFiles.get(cref.d2_x_path) : null;
          const d2yB = cref.d2_y_path ? zipFiles.get(cref.d2_y_path) : null;
          if (d2xB && d2yB) {
            cref.d2_x = bytesToFloat64Array(d2xB);
            cref.d2_y = bytesToFloat64Array(d2yB);
          }
        } else {
          r.cache.curve_ref = null;
        }
      }
      const hm = r?.cache?.heatmap;
      if (!hm || !hm._bin_ref) continue;
      const centersB = zipFiles.get(hm.centers_path);
      const widthsB = zipFiles.get(hm.widths_path);
      const scoreB = zipFiles.get(hm.score_path);
      const shape = Array.isArray(hm.score_shape) ? hm.score_shape : [0, 0];
      const rows = Number(shape[0]) || 0;
      const cols = Number(shape[1]) || 0;
      if (!centersB || !widthsB || !scoreB || rows <= 0 || cols <= 0) {
        r.cache.heatmap = null;
        continue;
      }
      const centers = bytesToFloat64Array(centersB);
      const widths = bytesToFloat64Array(widthsB);
      const scoreFlat = bytesToFloat64Array(scoreB);
      r.cache.heatmap = {
        centers_disp: centers,
        widths_disp: widths,
        score_grid: unflatten2d(scoreFlat, rows, cols),
      };
    }
  }
  const proj = obj.project || obj;
  if (!proj || !Array.isArray(proj.samples)) {
    throw new Error('Invalid project file.');
  }

  proj.samples = proj.samples.map((s) => ({
    id: s.id || uid('sample'),
    name: s.name || 'Sample',
    color_hex: normalizeHexColor(s.color_hex, ''),
    comments_expanded: Boolean(s.comments_expanded),
    collapsed: Boolean(s.collapsed),
    comments: Array.isArray(s.comments) ? s.comments.map((c) => normalizeSampleComment(c)) : [],
    replicas: (s.replicas || []).map((r) => ({
      id: r.id || uid('rep'),
      name: r.name || r.file_name || 'Replica',
      file_name: r.file_name || '',
      csv_text: r.csv_text || '',
      thickness_mm: optionalFiniteNumber(r.thickness_mm),
      ...normalizeGeometryChoice({
        areaCm2: optionalFiniteNumber(r.area_cm2),
        diameterMm: optionalFiniteNumber(r.diameter_mm),
      }),
      domain_threshold_override: optionalFiniteNumber(r.domain_threshold_override),
      cache: normalizeReplicaCache(r.cache),
    })),
  }));

  state.project = {
    io: { ...(defaultProject().io), ...(proj.io || {}) },
    analysis: { ...(defaultProject().analysis), ...(proj.analysis || {}) },
    ui: { ...(defaultProject().ui), ...(proj.ui || {}) },
    project_meta: normalizeProjectMeta(proj.project_meta || defaultProject().project_meta),
    samples: proj.samples,
  };
  state.metricExplorer = normalizeMetricExplorerState(proj?.ui?.metric_explorer || state.metricExplorer);
  state.projectDirty = false;
  state.projectLastChangedAt = null;
  if (!state.projectSaveName) state.projectSaveName = 'ld_project.stt';
  updateProjectSaveUi();
  rebuildReplicaDataCacheFromProject();
  state.datasetId = null;
  state.loadedSampleId = null;
  state.loadedReplicaId = null;

  writeConfigForm(state.project);
  renderSamplesList();
  refreshVizSelectors();
  applyDomainThresholdForSelection();
  setPrecomputeInfo(`Imported project with ${state.project.samples.length} sample(s).`);
  renderSummaryFromCache();
  warmupMissingCurveCaches().catch(() => {});
  const wantAutosave = Boolean(state.project?.ui?.autosave_enabled);
  if (wantAutosave && canDirectProjectUpdate()) {
    await setProjectAutosaveEnabled(true);
  }
}

async function addReplicaFilesToSample(sampleId, files) {
  syncProjectFromConfigForm();
  const sample = (state.project.samples || []).find((s) => s.id === sampleId);
  if (!sample) return;

  for (const file of files) {
    const text = await file.text();
    const nameNoExt = file.name.replace(/\.[^/.]+$/, '');
    const geom = parseGeometryFromFilename(file.name);
    sample.replicas.push({
      id: uid('rep'),
      name: nameNoExt,
      file_name: file.name,
      csv_text: text,
      thickness_mm: geom.thickness_mm,
      area_cm2: geom.area_cm2,
      diameter_mm: geom.diameter_mm,
      domain_threshold_override: null,
      cache: normalizeReplicaCache(null),
    });
  }
  markProjectChanged('replica upload');

  renderSamplesList();
  refreshVizSelectors();

  if (state.project.ui?.auto_precompute_on_upload) {
    const sampleRef = (state.project.samples || []).find((s) => s.id === sampleId);
    if (sampleRef) {
      const pending = (sampleRef.replicas || []).slice(-files.length).map((r) => ({ sample: sampleRef, replica: r }));
      enqueuePrecomputeItems(pending);
    }
  }
}

async function createNewProjectWorkflow() {
  const confirmBlank = confirm('Create a new blank project? This will clear all current samples, replicas, and analysis state.');
  if (!confirmBlank) return;

  if (state.projectSaveHandle) {
    const askSave = confirm('Current project is linked to a file. Save before creating a new project?');
    if (askSave) {
      try {
        await exportProject('update');
      } catch (err) {
        const proceed = confirm(`Save failed (${String(err)}). Continue without saving?`);
        if (!proceed) return;
      }
    }
  }

  if (state.datasetId) {
    await releaseDataset(state.datasetId);
  }
  clearAutosaveAnimation();
  if (state.projectAutosaveTimer) {
    clearTimeout(state.projectAutosaveTimer);
    state.projectAutosaveTimer = null;
  }

  state.project = defaultProject();
  state.metricExplorer = normalizeMetricExplorerState(null);
  state.replicaDataCache = {};
  state.precomputeQueue = [];
  state.precomputeQueueRunning = false;
  state.curveWarmupRunning = false;
  state.projectSaveHandle = null;
  state.projectSaveName = 'ld_project.stt';
  state.projectSaveDir = '';
  state.projectAutosaveEnabled = false;
  state.projectAutosaveBusy = false;
  state.projectLastSavedAt = null;
  state.projectLastSavedBytes = null;
  state.projectSchemaVersion = 1;
  state.projectDirty = false;
  state.projectLastChangedAt = null;

  state.datasetId = null;
  state.loadedSampleId = null;
  state.loadedReplicaId = null;
  state.disp = [];
  state.force = [];
  state.d2 = null;
  state.heatmap = null;
  state.domains = [];
  state.lo = 0;
  state.hi = 0;

  writeConfigForm(state.project);
  updateNewSampleNameSuggestion(true);
  renderSamplesList();
  refreshVizSelectors();
  clearVisualizationState('Select a sample/replica first.');
  renderSummaryFromCache();
  renderPinnedMetricPlots();
  updateMetricPinButtonsUi();
  setAutosaveStatus('off', { message: 'Autosave off' });
  updateProjectSaveUi();
  switchTab('configTab');
  setPrecomputeInfo('New blank project created.');
}

let tHandle = null;
function scheduleUpdate() {
  clearTimeout(tHandle);
  tHandle = setTimeout(() => {
    updateMetrics().catch((err) => {
      els.metrics.textContent = `Error: ${err}`;
    });
  }, 80);
}

let dHandle = null;
function scheduleDomainDetect(opts = {}) {
  const persistOverride = opts.persistOverride !== false;
  clearTimeout(dHandle);
  dHandle = setTimeout(() => {
    const v = Number(els.domainThreshold.value || 0.80);
    if (persistOverride) {
      setSelectedReplicaThresholdOverride(Number.isFinite(v) ? v : null);
    }
    updateThresholdLabel();
    detectDomains().catch((err) => {
      setDomainsSummary(`Domains summary (error): ${err}`);
      renderDomainsTable([]);
    });
  }, 120);
}

function setupEvents() {
  const appShell = document.querySelector('.appShell');
  els.appSidebarToggle?.addEventListener('click', () => {
    if (!(appShell instanceof HTMLElement)) return;
    const collapsed = appShell.classList.toggle('sidebarCollapsed');
    els.appSidebarToggle.setAttribute('aria-label', collapsed ? 'Expand app menu' : 'Collapse app menu');
    els.appSidebarToggle.setAttribute('title', collapsed ? 'Expand app menu' : 'Collapse app menu');
  });

  els.tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  els.addSampleBtn.addEventListener('click', () => {
    const name = (els.newSampleName.value || '').trim() || nextSampleDefaultName();
    syncProjectFromConfigForm();
    const used = (state.project.samples || []).map((s) => normalizeHexColor(s.color_hex, '')).filter((c) => /^#[0-9a-f]{6}$/.test(c));
    const idx = (state.project.samples || []).length;
    state.project.samples.push({
      id: uid('sample'),
      name,
      color_hex: generateDistinctPastelColor(used, idx),
      comments: [],
      comments_expanded: false,
      collapsed: false,
      replicas: [],
    });
    markProjectChanged('sample add');
    updateNewSampleNameSuggestion(true);
    renderSamplesList();
    refreshVizSelectors();
  });
  els.expandAllSamplesBtn?.addEventListener('click', () => setAllSamplesCollapsed(false));
  els.collapseAllSamplesBtn?.addEventListener('click', () => setAllSamplesCollapsed(true));
  els.newSampleName.addEventListener('focus', () => {
    const isAutofill = els.newSampleName.dataset.autofill === '1';
    if (isAutofill) {
      els.newSampleName.value = '';
      els.newSampleName.dataset.autofill = '0';
    }
  });
  els.newSampleName.addEventListener('input', () => {
    els.newSampleName.dataset.autofill = '0';
  });
  els.newSampleName.addEventListener('blur', () => {
    if (!(els.newSampleName.value || '').trim()) {
      updateNewSampleNameSuggestion(true);
    }
  });
  els.precomputeAllBtn.addEventListener('click', () => {
    precomputeAllReplicas().catch((err) => {
      setPrecomputeInfo(`Precompute failed: ${err}`);
    });
  });
  els.autoPrecomputeOnUpload.addEventListener('change', () => syncProjectFromConfigForm());
  els.includeHeatmapInExport.addEventListener('change', () => syncProjectFromConfigForm());
  [els.io_parse_geom_from_filename, els.io_geom_sep, els.io_geom_t_label, els.io_geom_d_label, els.io_geom_a_label].forEach((el) => {
    el?.addEventListener('change', () => {
      syncProjectFromConfigForm();
      renderSamplesList();
    });
  });
  [els.an_area_mm2, els.an_diameter_mm].forEach((el) => {
    el?.addEventListener('input', () => {
      handleGlobalGeometryEdit(el === els.an_area_mm2 ? 'area' : 'diameter');
    });
    el?.addEventListener('change', () => {
      handleGlobalGeometryEdit(el === els.an_area_mm2 ? 'area' : 'diameter');
      syncProjectFromConfigForm();
      renderSamplesList();
    });
  });
  els.an_domain_threshold_default.addEventListener('change', () => {
    syncProjectFromConfigForm();
    applyDomainThresholdForSelection();
    if (state.datasetId && state.loadedSampleId === els.vizSampleSelect.value && state.loadedReplicaId === els.vizReplicaSelect.value) {
      scheduleDomainDetect({ persistOverride: false });
    }
  });

  els.samplesList.addEventListener('click', (evt) => {
    const target = evt.target;
    if (!(target instanceof HTMLElement)) return;
    const sid = target.dataset.sid;

    const sampleColorBtn = target.closest('.sampleColorBtn');
    if (sampleColorBtn instanceof HTMLElement) {
      const sidBtn = sampleColorBtn.dataset.sid;
      if (!sidBtn) return;
      openSampleColorPicker(sidBtn, sampleColorBtn);
      return;
    }

    const editSampleNameBtn = target.closest('.editSampleNameBtn');
    if (editSampleNameBtn instanceof HTMLElement) {
      const sample = getSampleById(editSampleNameBtn.dataset.sid);
      if (!sample) return;
      const next = prompt('Rename sample', sample.name || '');
      if (next === null) return;
      const v = String(next).trim();
      if (!v) return;
      sample.name = v;
      markProjectChanged('sample rename');
      renderSamplesList();
      refreshVizSelectors();
      return;
    }

    const sampleToggle = target.closest('.sampleHeaderToggle');
    if (sampleToggle instanceof HTMLElement && !target.closest('.sampleHeaderActions')) {
      const sample = getSampleById(sampleToggle.dataset.sid);
      if (!sample) return;
      sample.collapsed = !sample.collapsed;
      renderSamplesList();
      return;
    }

    if (target.classList.contains('toggleSampleCommentsBtn')) {
      if (!sid) return;
      const sample = getSampleById(sid);
      if (!sample) return;
      sample.comments_expanded = !sample.comments_expanded;
      renderSamplesList();
      return;
    }

    if (target.classList.contains('addSampleCommentBtn')) {
      if (!sid) return;
      const sample = getSampleById(sid);
      if (!sample) return;
      const authorInput = els.samplesList.querySelector(`.sampleCommentAuthorInput[data-sid="${sid}"]`);
      const textInput = els.samplesList.querySelector(`.sampleCommentTextInput[data-sid="${sid}"]`);
      if (!(authorInput instanceof HTMLInputElement) || !(textInput instanceof HTMLInputElement)) return;
      const author = authorInput.value.trim();
      const text = textInput.value.trim();
      if (!author || !text) {
        alert('Author and comment are required.');
        return;
      }
      const now = new Date().toISOString();
      sample.comments = sample.comments || [];
      sample.comments.unshift(
        normalizeSampleComment({
          id: uid('cmt'),
          author,
          text,
          created_at: now,
          updated_at: now,
        })
      );
      sample.comments_expanded = true;
      markProjectChanged('sample comment add');
      textInput.value = '';
      renderSamplesList();
      return;
    }

    if (target.classList.contains('editSampleCommentBtn')) {
      if (!sid) return;
      const cid = target.dataset.cid;
      if (!cid) return;
      const sample = getSampleById(sid);
      const comment = sample?.comments?.find((c) => c.id === cid);
      if (!sample || !comment) return;
      const nextText = prompt('Edit comment text', comment.text || '');
      if (nextText === null) return;
      const nextAuthor = prompt('Edit comment author', comment.author || '');
      if (nextAuthor === null) return;
      const txt = String(nextText).trim();
      const auth = String(nextAuthor).trim();
      if (!txt || !auth) {
        alert('Author and comment are required.');
        return;
      }
      comment.text = txt;
      comment.author = auth;
      comment.updated_at = new Date().toISOString();
      sample.comments_expanded = true;
      markProjectChanged('sample comment edit');
      renderSamplesList();
      return;
    }

    if (target.classList.contains('deleteSampleCommentBtn')) {
      if (!sid) return;
      const cid = target.dataset.cid;
      if (!cid) return;
      const sample = getSampleById(sid);
      if (!sample) return;
      if (!confirm('Delete this comment?')) return;
      sample.comments = (sample.comments || []).filter((c) => c.id !== cid);
      sample.comments_expanded = true;
      markProjectChanged('sample comment delete');
      renderSamplesList();
      return;
    }

    if (target.classList.contains('removeSampleBtn')) {
      if (!sid) return;
      if (state.loadedSampleId === sid) {
        state.loadedSampleId = null;
        state.loadedReplicaId = null;
      }
      for (const key of Object.keys(state.replicaDataCache || {})) {
        if (key.startsWith(`${sid}::`)) delete state.replicaDataCache[key];
      }
      state.project.samples = state.project.samples.filter((s) => s.id !== sid);
      markProjectChanged('sample remove');
      renderSamplesList();
      refreshVizSelectors();
      return;
    }

    if (target.classList.contains('removeReplicaBtn')) {
      if (!sid) return;
      const rid = target.dataset.rid;
      const sample = getSampleById(sid);
      if (!sample) return;
      if (state.loadedSampleId === sid && state.loadedReplicaId === rid) {
        state.loadedReplicaId = null;
      }
      delete state.replicaDataCache[replicaDataCacheKey(sid, rid)];
      sample.replicas = sample.replicas.filter((r) => r.id !== rid);
      markProjectChanged('replica remove');
      renderSamplesList();
      refreshVizSelectors();
    }
  });

  els.samplesList.addEventListener('keydown', (evt) => {
    const target = evt.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.closest('.sampleHeaderActions')) return;
    const toggle = target.closest('.sampleHeaderToggle');
    if (!(toggle instanceof HTMLElement)) return;
    if (evt.key !== 'Enter' && evt.key !== ' ') return;
    evt.preventDefault();
    const sample = getSampleById(toggle.dataset.sid);
    if (!sample) return;
    sample.collapsed = !sample.collapsed;
    renderSamplesList();
  });

  els.samplesList.addEventListener('input', (evt) => {
    const target = evt.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.classList.contains('replicaAreaInput') && !target.classList.contains('replicaDiameterInput')) return;
    const row = target.closest('tr');
    if (!row) return;
    const areaInput = row.querySelector('.replicaAreaInput');
    const diameterInput = row.querySelector('.replicaDiameterInput');
    if (!(areaInput instanceof HTMLInputElement) || !(diameterInput instanceof HTMLInputElement)) return;
    const area = optionalFiniteNumber(areaInput.value);
    const diameter = optionalFiniteNumber(diameterInput.value);
    const hasArea = Number.isFinite(area) && area > 0;
    const hasDiameter = Number.isFinite(diameter) && diameter > 0;
    areaInput.disabled = hasDiameter && !hasArea;
    areaInput.classList.toggle('geoInputDisabled', areaInput.disabled);
    diameterInput.disabled = hasArea;
    diameterInput.classList.toggle('geoInputDisabled', diameterInput.disabled);
  });

  els.samplesList.addEventListener('change', async (evt) => {
    const target = evt.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.classList.contains('replicaUploadInput')) {
      const sid = target.dataset.sid;
      if (!sid || !target.files || !target.files.length) return;
      const files = Array.from(target.files);
      target.value = '';
      addReplicaFilesToSample(sid, files).catch((err) => {
        setPrecomputeInfo(`Upload failed: ${err}`);
      });
      return;
    }

    if (target.classList.contains('replicaThicknessInput') || target.classList.contains('replicaAreaInput') || target.classList.contains('replicaDiameterInput')) {
      const sid = target.dataset.sid;
      const rid = target.dataset.rid;
      const sample = (state.project.samples || []).find((s) => s.id === sid);
      const rep = sample?.replicas?.find((r) => r.id === rid);
      if (!rep) return;
      const raw = String(target.value ?? '').trim();
      const v = raw ? Number(raw) : NaN;
      const nv = Number.isFinite(v) && v > 0 ? v : null;
      if (target.classList.contains('replicaThicknessInput')) {
        rep.thickness_mm = nv;
      } else if (target.classList.contains('replicaAreaInput')) {
        rep.area_cm2 = nv;
        if (Number.isFinite(nv)) rep.diameter_mm = null;
      } else {
        rep.diameter_mm = nv;
        if (Number.isFinite(nv)) rep.area_cm2 = null;
      }
      const geom = normalizeGeometryChoice({ areaCm2: rep.area_cm2, diameterMm: rep.diameter_mm });
      rep.area_cm2 = geom.area_cm2;
      rep.diameter_mm = geom.diameter_mm;
      renderSamplesList();
      refreshReplicaAfterGeometryChange(sample, rep);
    }
  });

  els.exportProjectBtn.addEventListener('click', () => {
    exportProject('save_as').catch((err) => {
      alert(`Export failed: ${err}`);
    });
  });
  els.newProjectBtn?.addEventListener('click', () => {
    createNewProjectWorkflow().catch((err) => {
      alert(`New project failed: ${err}`);
    });
  });
  els.updateProjectBtn?.addEventListener('click', () => {
    exportProject('update').catch((err) => {
      alert(`Update failed: ${err}`);
    });
  });
  els.projectAutosaveToggle?.addEventListener('change', () => {
    setProjectAutosaveEnabled(Boolean(els.projectAutosaveToggle.checked)).catch((err) => {
      alert(`Autosave setup failed: ${err}`);
      if (els.projectAutosaveToggle) els.projectAutosaveToggle.checked = false;
    });
  });
  els.exportReplicaCsvBtn?.addEventListener('click', exportReplicaSummaryCsv);
  els.exportSampleCsvBtn?.addEventListener('click', exportSampleSummaryCsv);
  els.exportSummaryExcelBtn?.addEventListener('click', exportSummaryExcelWorkbook);
  els.downloadSummaryPlotSvgBtn?.addEventListener('click', downloadSummaryPlotSvg);
  els.downloadSummaryPlotCsvBtn?.addEventListener('click', downloadSummaryPlotCsv);
  els.downloadSummaryPlotZipBtn?.addEventListener('click', () => {
    downloadSummaryPlotPackageZip().catch((err) => {
      console.error(err);
      alert(`Plot package export failed: ${err}`);
    });
  });
  els.summaryShowToeRegion?.addEventListener('change', () => {
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  });
  els.summaryUseStressStrain?.addEventListener('change', () => {
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  });
  els.summaryUseSampleAverage?.addEventListener('change', () => {
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  });
  els.summaryShowAverageShadow?.addEventListener('change', () => {
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  });
  const syncLineWidthInputs = (fromRange = true) => {
    if (!els.summaryLineWidth || !els.summaryLineWidthValue) return;
    const raw = fromRange ? els.summaryLineWidth.value : els.summaryLineWidthValue.value;
    const v = clamp(Number(raw || 1.8), 0.8, 6.0);
    els.summaryLineWidth.value = String(v);
    els.summaryLineWidthValue.value = v.toFixed(1);
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  };
  els.summaryLineWidth?.addEventListener('input', () => syncLineWidthInputs(true));
  els.summaryLineWidthValue?.addEventListener('input', () => syncLineWidthInputs(false));
  els.summaryLegendTab?.addEventListener('click', () => {
    state.summaryLegendExpanded = !state.summaryLegendExpanded;
    syncSummaryLegendTab();
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  });
  els.summaryShowFitDetails?.addEventListener('change', () => {
    if (document.getElementById('summaryTab')?.classList.contains('active')) renderSummaryFromCache();
  });

  document.querySelectorAll('.settingsTabs').forEach((wrap) => {
    const group = String(wrap.dataset.settingsTabs || '').trim();
    if (!group) return;
    wrap.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.settingsTabBtn');
      if (!(btn instanceof HTMLElement)) return;
      const pane = String(btn.dataset.settingsPane || 'display');
      syncSettingsTabs(group, pane);
    });
    wrap.addEventListener('keydown', (evt) => {
      const target = evt.target;
      if (!(target instanceof HTMLElement) || !target.classList.contains('settingsTabBtn')) return;
      const buttons = Array.from(wrap.querySelectorAll('.settingsTabBtn'));
      if (!buttons.length) return;
      const idx = buttons.indexOf(target);
      if (idx < 0) return;
      let nextIdx = idx;
      if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') nextIdx = (idx + 1) % buttons.length;
      else if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') nextIdx = (idx - 1 + buttons.length) % buttons.length;
      else if (evt.key === 'Home') nextIdx = 0;
      else if (evt.key === 'End') nextIdx = buttons.length - 1;
      else return;
      evt.preventDefault();
      const btn = buttons[nextIdx];
      const pane = String(btn.dataset.settingsPane || 'display');
      syncSettingsTabs(group, pane);
      btn.focus();
    });
  });
  const onMetricTypographyChanged = () => {
    const useGlobal = Boolean(els.metricExplorerUseGlobalFontSize?.checked);
    const globalPx = clampFontPx(els.metricExplorerGlobalFontSize?.value, 14, 8, 40);
    state.metricExplorer.current.font_family = String(els.metricExplorerFontFamily?.value || 'Arial, sans-serif');
    state.metricExplorer.current.use_global_font_size = useGlobal;
    state.metricExplorer.current.global_font_size_px = globalPx;
    state.metricExplorer.current.tick_font_size_px = useGlobal ? globalPx : clampFontPx(els.metricExplorerTickFontSize?.value, 12, 8, 32);
    state.metricExplorer.current.title_font_size_px = useGlobal ? globalPx : clampFontPx(els.metricExplorerTitleFontSize?.value, 17, 10, 40);
    state.metricExplorer.current.axis_title_font_size_px = useGlobal ? globalPx : clampFontPx(els.metricExplorerAxisTitleFontSize?.value, 14, 10, 36);
    state.metricExplorer.current.title_text = String(els.metricExplorerTitleText?.value || '');
    state.metricExplorer.current.x_axis_label = String(els.metricExplorerXAxisLabel?.value ?? 'Sample');
    state.metricExplorer.current.y_axis_label = String(els.metricExplorerYAxisLabel?.value ?? '');
    syncMetricGlobalFontUi();
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  };
  [
    els.metricExplorerFontFamily,
    els.metricExplorerUseGlobalFontSize,
    els.metricExplorerGlobalFontSize,
    els.metricExplorerTickFontSize,
    els.metricExplorerTitleFontSize,
    els.metricExplorerAxisTitleFontSize,
    els.metricExplorerTitleText,
    els.metricExplorerXAxisLabel,
    els.metricExplorerYAxisLabel,
  ].forEach((el) => el?.addEventListener('input', onMetricTypographyChanged));
  const onSummaryTypographyChanged = () => {
    state.summaryPlotStyle = normalizeSummaryPlotStyle({
      font_family: String(els.summaryFontFamily?.value || 'Arial, sans-serif'),
      use_global_font_size: Boolean(els.summaryUseGlobalFontSize?.checked),
      global_font_size_px: els.summaryGlobalFontSize?.value,
      tick_font_size_px: els.summaryTickFontSize?.value,
      title_font_size_px: els.summaryTitleFontSize?.value,
      axis_title_font_size_px: els.summaryAxisTitleFontSize?.value,
      title_text: String(els.summaryTitleText?.value ?? ''),
      x_axis_label: String(els.summaryXAxisLabel?.value ?? ''),
      y_axis_label: String(els.summaryYAxisLabel?.value ?? ''),
    });
    syncSummaryGlobalFontUi();
    if (document.getElementById('summaryTab')?.classList.contains('active')) drawSummaryPlot();
  };
  [
    els.summaryFontFamily,
    els.summaryUseGlobalFontSize,
    els.summaryGlobalFontSize,
    els.summaryTickFontSize,
    els.summaryTitleFontSize,
    els.summaryAxisTitleFontSize,
    els.summaryTitleText,
    els.summaryXAxisLabel,
    els.summaryYAxisLabel,
  ].forEach((el) => el?.addEventListener('input', onSummaryTypographyChanged));
  els.metricExplorerMetric?.addEventListener('change', () => {
    const key = String(els.metricExplorerMetric.value || '');
    if (!METRIC_EXPLORER_METRIC_BY_KEY[key]) return;
    state.metricExplorer.current.metric_key = key;
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  });
  els.metricExplorerStyle?.addEventListener('change', () => {
    const style = els.metricExplorerStyle.value === 'bar' ? 'bar' : 'dot';
    state.metricExplorer.current.style = style;
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  });
  els.metricExplorerSort?.addEventListener('change', () => {
    state.metricExplorer.current.sort = String(els.metricExplorerSort.value || 'original');
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  });
  els.metricExplorerZeroY?.addEventListener('change', () => {
    state.metricExplorer.current.y_zero = Boolean(els.metricExplorerZeroY.checked);
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  });
  els.metricExplorerShowGrid?.addEventListener('change', () => {
    state.metricExplorer.current.show_grid = Boolean(els.metricExplorerShowGrid.checked);
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  });
  els.metricExplorerShowLabels?.addEventListener('change', () => {
    state.metricExplorer.current.show_labels = Boolean(els.metricExplorerShowLabels.checked);
    drawMetricExplorerPlot();
    queueProjectAutosave('metric explorer');
  });
  els.metricExplorerDownloadSvgBtn?.addEventListener('click', () => {
    downloadMetricExplorerSvg();
  });
  els.metricExplorerDownloadCsvBtn?.addEventListener('click', () => {
    downloadMetricExplorerCsv();
  });
  els.newMetricPlotBtn?.addEventListener('click', () => {
    newMetricExplorerPlot();
  });
  els.updateMetricPlotBtn?.addEventListener('click', () => {
    updateActiveMetricExplorerPlot();
  });
  els.pinnedMetricPlots?.addEventListener('click', (evt) => {
    const target = evt.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.classList.contains('removePinnedMetricPlotBtn')) {
      evt.preventDefault();
      evt.stopPropagation();
      const id = String(target.dataset.pinId || '');
      if (!id) return;
      state.metricExplorer.pinned = (state.metricExplorer.pinned || []).filter((p) => p.id !== id);
      if (state.metricExplorer.active_pin_id === id) state.metricExplorer.active_pin_id = null;
      renderPinnedMetricPlots();
      updateMetricPinButtonsUi();
      queueProjectAutosave('metric plot removed');
      return;
    }
    const card = target.closest('.pinnedMetricCard');
    if (!(card instanceof HTMLElement)) return;
    const id = String(card.dataset.pinId || '');
    if (!id) return;
    loadPinnedMetricToExplorer(id);
  });
  els.pinnedMetricPlots?.addEventListener('keydown', (evt) => {
    const target = evt.target;
    if (!(target instanceof HTMLElement)) return;
    const card = target.closest('.pinnedMetricCard');
    if (!(card instanceof HTMLElement)) return;
    if (evt.key !== 'Enter' && evt.key !== ' ') return;
    evt.preventDefault();
    const id = String(card.dataset.pinId || '');
    if (!id) return;
    loadPinnedMetricToExplorer(id);
  });
  els.projectInfoContent?.addEventListener('click', (evt) => {
    const t = evt.target;
    if (!(t instanceof HTMLElement)) return;
    const meta = normalizeProjectMeta(state.project?.project_meta || {});
    state.project.project_meta = meta;

    if (t.id === 'saveProjectMetaBtn') {
      const ownerI = document.getElementById('projectOwnerInput');
      const titleI = document.getElementById('projectMetaTitleInput');
      const codeI = document.getElementById('projectMetaCodeInput');
      const emailI = document.getElementById('projectMetaEmailInput');
      const instI = document.getElementById('projectMetaInstitutionInput');
      const expI = document.getElementById('projectMetaExperimentTypeInput');
      const famI = document.getElementById('projectMetaSampleFamilyInput');
      const batchI = document.getElementById('projectMetaBatchInput');
      const dateI = document.getElementById('projectMetaDateInput');
      const objI = document.getElementById('projectMetaObjectiveInput');
      meta.owner_name = ownerI instanceof HTMLInputElement ? String(ownerI.value || '').trim() : '';
      meta.project_title = titleI instanceof HTMLInputElement ? String(titleI.value || '').trim() : '';
      meta.project_code = codeI instanceof HTMLInputElement ? String(codeI.value || '').trim() : '';
      meta.operator_email = emailI instanceof HTMLInputElement ? String(emailI.value || '').trim() : '';
      meta.institution = instI instanceof HTMLInputElement ? String(instI.value || '').trim() : '';
      meta.experiment_type = expI instanceof HTMLInputElement ? String(expI.value || '').trim() : '';
      meta.sample_family = famI instanceof HTMLInputElement ? String(famI.value || '').trim() : '';
      meta.batch_id = batchI instanceof HTMLInputElement ? String(batchI.value || '').trim() : '';
      meta.test_date = dateI instanceof HTMLInputElement ? String(dateI.value || '').trim() : '';
      meta.objective = objI instanceof HTMLInputElement ? String(objI.value || '').trim() : '';
      state.project.project_meta = meta;
      markProjectChanged('project metadata');
      renderProjectInfo();
      queueProjectAutosave('project metadata');
      return;
    }

    if (t.id === 'addProjectCommentBtn') {
      const ai = document.getElementById('projectCommentAuthorInput');
      const ti = document.getElementById('projectCommentTextInput');
      const author = ai instanceof HTMLInputElement ? String(ai.value || '').trim() : '';
      const text = ti instanceof HTMLInputElement ? String(ti.value || '').trim() : '';
      if (!author || !text) {
        alert('Author and comment are required.');
        return;
      }
      const now = new Date().toISOString();
      meta.comments.unshift(normalizeSampleComment({
        id: uid('pcmt'),
        author,
        text,
        created_at: now,
        updated_at: now,
      }));
      if (!meta.owner_name) meta.owner_name = author;
      state.project.project_meta = meta;
      markProjectChanged('project comment add');
      renderProjectInfo();
      queueProjectAutosave('project comment');
      return;
    }

    if (t.classList.contains('editProjectCommentBtn')) {
      const cid = String(t.dataset.cid || '');
      if (!cid) return;
      const c = (meta.comments || []).find((x) => x.id === cid);
      if (!c) return;
      const nextText = prompt('Edit comment text', c.text || '');
      if (nextText === null) return;
      const nextAuthor = prompt('Edit comment author', c.author || '');
      if (nextAuthor === null) return;
      const txt = String(nextText).trim();
      const auth = String(nextAuthor).trim();
      if (!txt || !auth) {
        alert('Author and comment are required.');
        return;
      }
      c.text = txt;
      c.author = auth;
      c.updated_at = new Date().toISOString();
      state.project.project_meta = meta;
      markProjectChanged('project comment edit');
      renderProjectInfo();
      queueProjectAutosave('project comment edit');
      return;
    }

    if (t.classList.contains('deleteProjectCommentBtn')) {
      const cid = String(t.dataset.cid || '');
      if (!cid) return;
      if (!confirm('Delete this project comment?')) return;
      meta.comments = (meta.comments || []).filter((x) => x.id !== cid);
      state.project.project_meta = meta;
      markProjectChanged('project comment delete');
      renderProjectInfo();
      queueProjectAutosave('project comment delete');
    }
  });

  els.importProjectBtn.addEventListener('click', async () => {
    if (typeof window.showOpenFilePicker === 'function') {
      try {
        const [handle] = await window.showOpenFilePicker({
          multiple: false,
          types: [{ description: 'State project file', accept: { 'application/zip': ['.stt'] } }],
        });
        if (!handle) return;
        const file = await handle.getFile();
        state.projectSaveHandle = handle;
        state.projectSaveName = String(handle.name || file.name || 'ld_project.stt');
        state.projectSaveDir = '';
        updateProjectSaveUi();
        if (file?.lastModified) {
          setAutosaveStatus('saved', { last_saved_at: new Date(file.lastModified).toISOString() });
        } else {
          setAutosaveStatus('saved', { last_saved_at: new Date().toISOString() });
        }
        await importProjectFromFile(file);
        return;
      } catch (err) {
        if (!(err && err.name === 'AbortError')) {
          console.warn('showOpenFilePicker failed, falling back to file input.', err);
        } else {
          return;
        }
      }
    }
    els.importProjectInput.click();
  });
  els.importProjectInput.addEventListener('change', async () => {
    const file = els.importProjectInput.files?.[0];
    if (!file) return;
    state.projectSaveHandle = null;
    state.projectSaveName = String(file.name || '');
    state.projectSaveDir = inferDirectoryFromName(file.name || '');
    updateProjectSaveUi();
    setAutosaveStatus('off', { message: 'Autosave off (no linked file)' });
    try {
      await importProjectFromFile(file);
    } catch (err) {
      alert(`Import failed: ${err}`);
    }
    els.importProjectInput.value = '';
  });

  if (els.sampleColorPickerSurface instanceof HTMLCanvasElement) {
    els.sampleColorPickerSurface.addEventListener('mousedown', (evt) => {
      if (!state.sampleColorPicker.open) return;
      state.sampleColorPicker.dragging = true;
      sampleColorPickerSetFromSurfaceEvent(evt);
    });
  }
  window.addEventListener('mousemove', (evt) => {
    if (!state.sampleColorPicker.open || !state.sampleColorPicker.dragging) return;
    sampleColorPickerSetFromSurfaceEvent(evt);
  });
  window.addEventListener('mouseup', () => {
    state.sampleColorPicker.dragging = false;
  });
  els.sampleColorPickerLightness?.addEventListener('input', () => {
    if (!state.sampleColorPicker.open) return;
    const l = clamp(Number(els.sampleColorPickerLightness.value || 72), 15, 90) / 100;
    state.sampleColorPicker.l = l;
    els.sampleColorPickerHex.value = sampleColorPickerCurrentHex();
    drawSampleColorPickerSurface();
  });
  const onSampleColorHexChanged = () => {
    if (!state.sampleColorPicker.open) return;
    const raw = String(els.sampleColorPickerHex.value || '').trim();
    if (!/^#?[0-9a-fA-F]{6}$/.test(raw)) return;
    const hex = normalizeHexColor(raw, sampleColorPickerCurrentHex());
    const hsl = sampleColorPickerFromHex(hex);
    state.sampleColorPicker.h = hsl.h;
    state.sampleColorPicker.s = hsl.s;
    state.sampleColorPicker.l = hsl.l;
    els.sampleColorPickerHex.value = hex;
    els.sampleColorPickerLightness.value = String(Math.round(hsl.l * 100));
    drawSampleColorPickerSurface();
  };
  els.sampleColorPickerHex?.addEventListener('change', onSampleColorHexChanged);
  els.sampleColorPickerHex?.addEventListener('input', onSampleColorHexChanged);
  els.sampleColorPickerApplyBtn?.addEventListener('click', () => {
    applySampleColorPicker();
  });
  els.sampleColorPickerCancelBtn?.addEventListener('click', () => {
    closeSampleColorPicker();
  });
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && state.sampleColorPicker.open) closeSampleColorPicker();
  });
  window.addEventListener('mousedown', (evt) => {
    if (!state.sampleColorPicker.open) return;
    const t = evt.target;
    const pop = els.sampleColorPickerPopover;
    if (!(pop instanceof HTMLElement)) return;
    if (t instanceof HTMLElement && (pop.contains(t) || t.closest('.sampleColorBtn'))) return;
    closeSampleColorPicker();
  });

  els.vizSampleSelect.addEventListener('change', () => {
    refreshReplicaSelector();
    applyDomainThresholdForSelection();
    maybeAutoLoadSelectedReplica();
  });
  els.vizReplicaSelect.addEventListener('change', () => {
    applyDomainThresholdForSelection();
    maybeAutoLoadSelectedReplica();
  });

  els.domainThreshold.addEventListener('input', scheduleDomainDetect);
  els.detectDomainsBtn.addEventListener('click', () => {
    detectDomains().catch((err) => {
      setDomainsSummary(`Domains summary (error): ${err}`);
      renderDomainsTable([]);
    });
  });

  els.toggleDomainsBtn.addEventListener('click', () => {
    const collapsed = els.domainsPanel.classList.toggle('collapsed');
    els.toggleDomainsBtn.textContent = collapsed ? 'Show' : 'Hide';
  });

  els.centerSlider.addEventListener('input', () => {
    persistSelectedReplicaVizUiState('viz fit window');
    scheduleUpdate();
  });
  els.widthSlider.addEventListener('input', () => {
    persistSelectedReplicaVizUiState('viz fit window');
    scheduleUpdate();
  });
  els.plotUseStressStrain?.addEventListener('change', () => {
    drawPlot();
  });
  els.maxMode.addEventListener('change', () => {
    const prev = state.maxModePrev || 'global';
    const next = els.maxMode.value || 'global';
    if (next === 'window' && prev !== 'window' && state.disp.length) {
      const anchorIdx = prev === 'point'
        ? clamp(Number(els.maxPointSlider.value), 0, state.disp.length - 1)
        : getGlobalMaxIndex();
      setMaxWindowAroundIndex(anchorIdx);
    }
    state.maxModePrev = next;
    syncMaxControlsVisibility();
    syncMaxLabels();
    persistSelectedReplicaVizUiState('viz max controls');
    scheduleUpdate();
  });
  els.maxCenterSlider.addEventListener('input', () => {
    syncMaxLabels();
    persistSelectedReplicaVizUiState('viz max controls');
    scheduleUpdate();
  });
  els.maxWidthSlider.addEventListener('input', () => {
    syncMaxLabels();
    persistSelectedReplicaVizUiState('viz max controls');
    scheduleUpdate();
  });
  els.maxPointSlider.addEventListener('input', () => {
    syncMaxLabels();
    persistSelectedReplicaVizUiState('viz max controls');
    scheduleUpdate();
  });
  els.showD2.addEventListener('change', () => {
    drawPlot();
  });
  els.toeEnabled.addEventListener('change', () => {
    syncToeControlsVisibility();
    syncToeLabels();
    scheduleUpdate();
  });
  els.hideBeforeToe.addEventListener('change', () => {
    drawPlot();
  });
  els.toeMode.addEventListener('change', () => {
    const next = els.toeMode.value || 'global';
    state.toeModePrev = next;
    syncToeControlsVisibility();
    syncToeLabels();
    scheduleUpdate();
  });
  els.toePointSlider.addEventListener('input', () => {
    syncToeLabels();
    scheduleUpdate();
  });
  els.plotCanvas.addEventListener('mousedown', (evt) => {
    if (!state.disp.length) return;
    const p = canvasPoint(evt, els.plotCanvas);
    const hm = hoverMode(p.x, p.y);
    if (!hm) return;

    evt.preventDefault();
    els.plotCanvas.style.cursor = hm.mode === 'move' ? 'grabbing' : 'ew-resize';
    const [mLo, mHi] = getMaxWindowBoundsFromControls();
    state.drag = {
      target: hm.target,
      mode: hm.mode,
      startIdx: xToIndex(p.x),
      startLo: hm.target === 'fit' ? state.lo : mLo,
      startHi: hm.target === 'fit' ? state.hi : mHi,
      startClientX: Number(evt.clientX),
      startClientY: Number(evt.clientY),
      moved: false,
    };
  });

  window.addEventListener('mousemove', (evt) => {
    if (!state.disp.length) return;
    const p = canvasPoint(evt, els.plotCanvas);

    if (!state.drag) {
      const hm = hoverMode(p.x, p.y);
      if (hm?.mode === 'move') els.plotCanvas.style.cursor = 'grab';
      else if (hm?.mode === 'left' || hm?.mode === 'right') els.plotCanvas.style.cursor = 'ew-resize';
      else els.plotCanvas.style.cursor = 'default';
      return;
    }

    const drag = state.drag;
    const dragPx = Math.hypot(
      Number(evt.clientX) - Number(drag.startClientX ?? evt.clientX),
      Number(evt.clientY) - Number(drag.startClientY ?? evt.clientY)
    );
    if (dragPx > 3) drag.moved = true;
    const n = state.disp.length;
    const idx = xToIndex(p.x);

    if (drag.mode === 'move') {
      const delta = idx - drag.startIdx;
      const width = drag.startHi - drag.startLo;
      let lo = drag.startLo + delta;
      let hi = drag.startHi + delta;
      if (lo < 0) {
        lo = 0;
        hi = width;
      }
      if (hi > n) {
        hi = n;
        lo = n - width;
      }
      if (drag.target === 'fit') setWindowBounds(lo, hi);
      else setMaxWindowBounds(lo, hi);
    } else if (drag.mode === 'left') {
      if (drag.target === 'fit') {
        const lo = clamp(idx, 0, drag.startHi - 3);
        setWindowBounds(lo, drag.startHi);
      } else {
        const lo = clamp(idx, 0, drag.startHi - 1);
        setMaxWindowBounds(lo, drag.startHi);
      }
    } else if (drag.mode === 'right') {
      if (drag.target === 'fit') {
        const hi = clamp(idx + 1, drag.startLo + 3, n);
        setWindowBounds(drag.startLo, hi);
      } else {
        const hi = clamp(idx + 1, drag.startLo + 1, n);
        setMaxWindowBounds(drag.startLo, hi);
      }
    }

    scheduleUpdate();
  });

  window.addEventListener('mouseup', () => {
    if (state.drag) {
      state.suppressPlotClickOnce = Boolean(state.drag.moved);
      state.drag = null;
      els.plotCanvas.style.cursor = 'default';
      persistSelectedReplicaVizUiState('viz drag update');
      scheduleUpdate();
    }
  });

  // Legacy canvas click handler intentionally disabled (heatmap now rendered with Plotly).

  els.plotCanvas.addEventListener('click', (evt) => {
    if (!state.disp.length) return;
    if (state.suppressPlotClickOnce) {
      state.suppressPlotClickOnce = false;
      return;
    }
    const p = canvasPoint(evt, els.plotCanvas);
    if ((els.maxMode.value || 'global') === 'point') {
      const idx = xToIndex(p.x);
      els.maxPointSlider.value = String(clamp(idx, Number(els.maxPointSlider.min), Number(els.maxPointSlider.max)));
      syncMaxLabels();
      scheduleUpdate();
      return;
    }
    if (isToeSelectorActive() && (els.toeMode.value || 'global') === 'point' && state.d2?.x?.length) {
      const plotX = state.plotMeta;
      const xView = plotX.xMin + ((p.x - plotX.m.l) / (plotX.pw || 1)) * (plotX.xMax - plotX.xMin || 1);
      const useStressStrain = plotX.display_mode === 'stress_strain';
      const xDisp = viewXToDisp(xView + (plotX.x_offset || 0), useStressStrain, plotX.thickness_mm);
      const idx2 = nearestIndex(state.d2.x, xDisp);
      els.toePointSlider.value = String(clamp(idx2, Number(els.toePointSlider.min), Number(els.toePointSlider.max)));
      syncToeLabels();
      scheduleUpdate();
    }
  });

  window.addEventListener('resize', () => {
    drawPlot();
    drawHeatmap();
    drawSummaryPlot();
    drawMetricExplorerPlot();
    redrawVisiblePinnedMetricPlots();
  });

  setupMetricExplorerResizeHandles();
  setupSummaryPlotResizeHandles();
}

const COMMON_FONT_SIZES_PX = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40];

function closeAllFontSizeComboMenus(exceptCombo = null) {
  document.querySelectorAll('.fontSizeCombo').forEach((combo) => {
    if (!(combo instanceof HTMLElement)) return;
    if (exceptCombo && combo === exceptCombo) return;
    combo.classList.remove('open');
    const menu = combo.querySelector('.fontSizeComboMenu');
    if (menu instanceof HTMLElement) menu.hidden = true;
  });
}

function openFontSizeCombo(combo) {
  if (!(combo instanceof HTMLElement)) return;
  closeAllFontSizeComboMenus(combo);
  combo.classList.add('open');
  const menu = combo.querySelector('.fontSizeComboMenu');
  if (menu instanceof HTMLElement) menu.hidden = false;
}

function setupFontSizeCombos() {
  document.querySelectorAll('.fontSizeCombo').forEach((combo) => {
    if (!(combo instanceof HTMLElement)) return;
    if (combo.dataset.comboReady === '1') return;
    combo.dataset.comboReady = '1';
    const input = combo.querySelector('input');
    const toggle = combo.querySelector('.fontSizeComboToggle');
    const menu = combo.querySelector('.fontSizeComboMenu');
    if (!(input instanceof HTMLInputElement) || !(toggle instanceof HTMLButtonElement) || !(menu instanceof HTMLElement)) return;

    menu.innerHTML = COMMON_FONT_SIZES_PX
      .map((size) => `<button type="button" class="fontSizeComboOption" data-size="${size}">${size}</button>`)
      .join('');

    const open = () => openFontSizeCombo(combo);
    const close = () => {
      combo.classList.remove('open');
      menu.hidden = true;
    };

    input.addEventListener('click', open);
    input.addEventListener('focus', open);
    input.addEventListener('keydown', (evt) => {
      if (evt.key === 'ArrowDown' || (evt.key === 'Down' && !evt.altKey)) {
        evt.preventDefault();
        open();
      } else if (evt.key === 'Escape') {
        close();
      }
    });
    toggle.addEventListener('mousedown', (evt) => evt.preventDefault());
    toggle.addEventListener('click', () => {
      if (combo.classList.contains('open')) close();
      else open();
      input.focus();
    });
    menu.addEventListener('mousedown', (evt) => evt.preventDefault());
    menu.addEventListener('click', (evt) => {
      const btn = evt.target.closest('.fontSizeComboOption');
      if (!(btn instanceof HTMLElement)) return;
      const value = String(btn.dataset.size || '').trim();
      if (!value) return;
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      close();
      input.focus();
    });
  });

  document.addEventListener('click', (evt) => {
    const target = evt.target;
    if (!(target instanceof Node)) return;
    const inside = target instanceof Element ? target.closest('.fontSizeCombo') : null;
    if (!inside) closeAllFontSizeComboMenus(null);
  });
}

function init() {
  const appShell = document.querySelector('.appShell');
  if (appShell instanceof HTMLElement && els.appSidebarToggle) {
    const collapsed = appShell.classList.contains('sidebarCollapsed');
    els.appSidebarToggle.setAttribute('aria-label', collapsed ? 'Expand app menu' : 'Collapse app menu');
    els.appSidebarToggle.setAttribute('title', collapsed ? 'Expand app menu' : 'Collapse app menu');
  }
  state.project = defaultProject();
  state.projectSaveHandle = null;
  state.projectSaveName = 'ld_project.stt';
  state.projectSaveDir = '';
  setAutosaveStatus('off', { message: 'Autosave off' });
  updateProjectSaveUi();
  applyAnalysisSettingTooltips();
  writeConfigForm(state.project);
  renderSamplesList();
  updateNewSampleNameSuggestion(true);
  refreshVizSelectors();
  renderSummaryFromCache();
  maybeAutoLoadSelectedReplica();
  updateThresholdLabel();
  syncMaxControlsVisibility();
  syncMaxLabels();
  syncToeControlsVisibility();
  syncToeLabels();
  renderDomainsTable([]);
  ensureMetricExplorerControls();
  applyMetricExplorerPlotSize();
  applySummaryPlotSize();
  applySummaryTypographyControls();
  initializeSettingsTabs();
  if (els.summaryLineWidth && els.summaryLineWidthValue) {
    const v = clamp(Number(els.summaryLineWidth.value || 1.8), 0.8, 6.0);
    els.summaryLineWidth.value = String(v);
    els.summaryLineWidthValue.value = v.toFixed(1);
  }
  syncSummaryLegendTab();
  renderPinnedMetricPlots();
  updateMetricPinButtonsUi();
  setMetricExplorerMessage('No aggregate sample metrics available yet.');
  setSummaryPlotMessage('No precomputed curves available yet.');
  setPrecomputeInfo('Ready.');
  setupEvents();
  setupFontSizeCombos();
  syncGlobalGeometryInputsUi();
}

init();
