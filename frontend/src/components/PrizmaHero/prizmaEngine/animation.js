import { pickInitialTarget, pickNextTarget } from './targets';
import { MIN_ZOOM, MAX_ZOOM, zoomNormFor } from './quality';

const KALEIDO_SEGMENTS = 6;
const WEDGE_ANGULAR_SCALE = 2;
const WEDGE_RADIAL_SCALE = 2;

const COLOR_MODES = [0, 2, 3];
const TAPESTRY_STYLES = [1, 2, 4, 5];

const COLOR_MODE_HOLD_SEC = 52;
const COLOR_MODE_BLEND_SEC = 8;
const TAPESTRY_HOLD_SEC = 48;
const TAPESTRY_BLEND_SEC = 10;

const PIVOT_AMP = 0.1;
const PIVOT_SPEED_X = 0.11;
const PIVOT_SPEED_Y = 0.083;

const PHASE = {
  PAN: 'pan',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
};

const PAN_SPEED = 0.05;
const ZOOM_IN_SPEED = 0.18;
const ZOOM_OUT_SPEED = 0.24;
const ROTATION_SPEED = 0.012;
const PAN_ARRIVAL_EPS = 0.003;
const ZOOM_EPS = 0.015;

function pickNextInCycle(list, current) {
  const idx = list.indexOf(current);
  return list[(idx + 1) % list.length];
}

function startColorModeBlend(state, to) {
  state.colorModeFrom = state.colorModeTo;
  state.colorModeTo = to;
  state.colorModeBlend = 0;
}

function startTapestryBlend(state, to) {
  state.tapestryStyleFrom = state.tapestryStyleTo;
  state.tapestryStyleTo = to;
  state.tapestryStyleBlend = 0;
}

function updateColorModes(state, dt) {
  if (state.colorModeBlend < 1) {
    state.colorModeBlend = Math.min(1, state.colorModeBlend + dt / COLOR_MODE_BLEND_SEC);
    return;
  }

  state.colorModeHoldTimer += dt;
  if (state.colorModeHoldTimer >= COLOR_MODE_HOLD_SEC) {
    state.colorModeHoldTimer = 0;
    startColorModeBlend(state, pickNextInCycle(COLOR_MODES, state.colorModeTo));
  }
}

function updateTapestryStyles(state, dt) {
  if (state.tapestryStyleBlend < 1) {
    state.tapestryStyleBlend = Math.min(1, state.tapestryStyleBlend + dt / TAPESTRY_BLEND_SEC);
    return;
  }

  state.tapestryHoldTimer += dt;
  if (state.tapestryHoldTimer >= TAPESTRY_HOLD_SEC) {
    state.tapestryHoldTimer = 0;
    startTapestryBlend(state, pickNextInCycle(TAPESTRY_STYLES, state.tapestryStyleTo));
  }
}

function updatePivotDrift(state) {
  const t = state.symmetryTime;
  state.pivotX = PIVOT_AMP * Math.sin(t * PIVOT_SPEED_X);
  state.pivotY = PIVOT_AMP * Math.cos(t * PIVOT_SPEED_Y);
}

function startPanToTarget(state) {
  const target = pickNextTarget(state.centerX, state.centerY);
  state.centerFromX = state.centerX;
  state.centerFromY = state.centerY;
  state.centerToX = target.x;
  state.centerToY = target.y;
  state.phase = PHASE.PAN;

  const dist = Math.hypot(
    state.centerToX - state.centerFromX,
    state.centerToY - state.centerFromY,
  );

  if (dist < PAN_ARRIVAL_EPS) {
    state.centerX = state.centerToX;
    state.centerY = state.centerToY;
    state.phase = PHASE.ZOOM_IN;
  }
}

export function createAnimationState() {
  const initial = pickInitialTarget();
  const initialColorMode = COLOR_MODES[0];
  const initialTapestryStyle = TAPESTRY_STYLES[0];

  return {
    phase: PHASE.ZOOM_IN,
    centerX: initial.x,
    centerY: initial.y,
    centerFromX: initial.x,
    centerFromY: initial.y,
    centerToX: initial.x,
    centerToY: initial.y,
    zoomExponent: MIN_ZOOM,
    rotation: Math.random() * Math.PI * 2,
    pivotX: 0,
    pivotY: 0,
    colorModeFrom: initialColorMode,
    colorModeTo: initialColorMode,
    colorModeBlend: 1,
    colorModeHoldTimer: 0,
    tapestryStyleFrom: initialTapestryStyle,
    tapestryStyleTo: initialTapestryStyle,
    tapestryStyleBlend: 1,
    tapestryHoldTimer: 0,
    symmetryTime: 0,
    reducedMotion: false,
  };
}

function updatePan(state, dt) {
  const dx = state.centerToX - state.centerX;
  const dy = state.centerToY - state.centerY;
  const dist = Math.hypot(dx, dy);

  if (dist < PAN_ARRIVAL_EPS) {
    state.centerX = state.centerToX;
    state.centerY = state.centerToY;
    state.phase = PHASE.ZOOM_IN;
    return;
  }

  const step = Math.min(dist, PAN_SPEED * dt);
  state.centerX += (dx / dist) * step;
  state.centerY += (dy / dist) * step;
}

function updateZoomIn(state, dt) {
  state.zoomExponent = Math.min(MAX_ZOOM, state.zoomExponent + ZOOM_IN_SPEED * dt);

  if (state.zoomExponent >= MAX_ZOOM - ZOOM_EPS) {
    state.zoomExponent = MAX_ZOOM;
    state.phase = PHASE.ZOOM_OUT;
  }
}

function updateZoomOut(state, dt) {
  state.zoomExponent = Math.max(MIN_ZOOM, state.zoomExponent - ZOOM_OUT_SPEED * dt);

  if (state.zoomExponent <= MIN_ZOOM + ZOOM_EPS) {
    state.zoomExponent = MIN_ZOOM;
    startPanToTarget(state);
  }
}

export function updateAnimation(state, _paletteState, dt, motionScale = 1) {
  const motionDt = dt * motionScale;
  state.symmetryTime += state.reducedMotion ? dt * 0.05 : motionDt;

  updatePivotDrift(state);

  if (state.reducedMotion) {
    return;
  }

  state.rotation += ROTATION_SPEED * motionDt;
  updateColorModes(state, motionDt);
  updateTapestryStyles(state, motionDt);

  switch (state.phase) {
    case PHASE.PAN:
      updatePan(state, motionDt);
      break;
    case PHASE.ZOOM_IN:
      updateZoomIn(state, motionDt);
      break;
    case PHASE.ZOOM_OUT:
      updateZoomOut(state, motionDt);
      break;
    default:
      state.phase = PHASE.PAN;
      startPanToTarget(state);
      break;
  }
}

export function getRenderParams(state, qualityScale, isMobile) {
  const zoomNorm = zoomNormFor(state.zoomExponent);
  const rotCos = Math.cos(state.rotation);
  const rotSin = Math.sin(state.rotation);

  return {
    center: { x: state.centerX, y: state.centerY },
    pivot: { x: state.pivotX, y: state.pivotY },
    zoomExponent: state.zoomExponent,
    zoomNorm,
    rotCos,
    rotSin,
    maxIterScale: qualityScale,
    colorModeFrom: state.colorModeFrom,
    colorModeTo: state.colorModeTo,
    colorModeBlend: state.colorModeBlend,
    symmetryTime: state.symmetryTime,
    kaleidoSegments: KALEIDO_SEGMENTS,
    wedgeAngularScale: WEDGE_ANGULAR_SCALE,
    wedgeRadialScale: WEDGE_RADIAL_SCALE,
    tapestryStyleFrom: state.tapestryStyleFrom,
    tapestryStyleTo: state.tapestryStyleTo,
    tapestryStyleBlend: state.tapestryStyleBlend,
    isMobile,
  };
}

export { KALEIDO_SEGMENTS, WEDGE_ANGULAR_SCALE, WEDGE_RADIAL_SCALE };
