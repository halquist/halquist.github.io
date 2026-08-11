import { pickInitialTarget, pickNextTarget } from './targets';
import { MIN_ZOOM, MAX_ZOOM, zoomNormFor, iterationCapForZoom } from './quality';
import {
  measureKaleidoDetail,
  findBestKaleidoAnchor,
  shortestAngleDelta,
  alignDurationFor,
  KALEIDO_DETAIL_MIN_SCORE,
  KALEIDO_DETAIL_CHECK_INTERVAL,
} from './kaleidoAnchor';

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
const PIVOT_ZOOM_FADE_START = 0.2;
const PIVOT_ZOOM_FADE_END = 0.65;

const LOW_DETAIL_ZOOM_OUT_SCORE = 0.08;
const LOW_DETAIL_ZOOM_OUT_NORM = 0.72;

const PHASE = {
  PAN: 'pan',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
};

const PAN_SPEED = 0.05;
const ZOOM_IN_SPEED = 0.18;
const ZOOM_OUT_SPEED = 0.24;
const ROTATION_SPEED = 0.005;
const ROTATION_ZOOM_DAMP = 0.62;
const KALEIDO_ALIGN_MIN_DELTA = 0.08;
const PAN_ARRIVAL_EPS = 0.003;
const ZOOM_EPS = 0.015;

function rotationZoomScale(zoomNorm) {
  return 1 - zoomNorm ** 2 * ROTATION_ZOOM_DAMP;
}

function pickNextInCycle(list, current) {
  const idx = list.indexOf(current);
  return list[(idx + 1) % list.length];
}

function pivotFade(zoomNorm) {
  if (zoomNorm <= PIVOT_ZOOM_FADE_START) return 1;
  if (zoomNorm >= PIVOT_ZOOM_FADE_END) return 0;
  const t = (zoomNorm - PIVOT_ZOOM_FADE_START) / (PIVOT_ZOOM_FADE_END - PIVOT_ZOOM_FADE_START);
  return 1 - t * t * (3 - 2 * t);
}

function iterCapForState(state, qualityScale, isMobile) {
  return iterationCapForZoom(state.zoomExponent, qualityScale, isMobile);
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

function startKaleidoAlignTo(state, target) {
  const delta = shortestAngleDelta(state.kaleidoAlignOffset, target);
  if (Math.abs(delta) < KALEIDO_ALIGN_MIN_DELTA) return;

  state.kaleidoAlignStart = state.kaleidoAlignOffset;
  state.kaleidoAlignDelta = delta;
  state.kaleidoAlignTarget = state.kaleidoAlignStart + delta;
  state.kaleidoAlignDuration = alignDurationFor(delta);
  state.kaleidoAlignElapsed = 0;
  state.kaleidoAlignActive = true;
}

function scheduleKaleidoAlign(state, iterCap, force = false) {
  if (state.kaleidoAlignActive) return;

  const currentScore = measureKaleidoDetail(state, iterCap, KALEIDO_SEGMENTS);
  if (!force && currentScore >= KALEIDO_DETAIL_MIN_SCORE) return;

  const { phase, score } = findBestKaleidoAnchor(state, iterCap, KALEIDO_SEGMENTS);
  if (!force && score <= currentScore + 0.01) return;

  startKaleidoAlignTo(state, state.kaleidoAlignOffset + phase);
}

function updateKaleidoAlign(state, dt) {
  if (!state.kaleidoAlignActive) return;

  state.kaleidoAlignElapsed += dt;
  const t = Math.min(1, state.kaleidoAlignElapsed / state.kaleidoAlignDuration);
  const eased = t * t * (3 - 2 * t);
  state.kaleidoAlignOffset = state.kaleidoAlignStart + state.kaleidoAlignDelta * eased;

  if (t >= 1) {
    state.kaleidoAlignOffset = state.kaleidoAlignTarget;
    state.kaleidoAlignActive = false;
    state.detailCheckTimer = 0;
  }
}

function updateDetailWatch(state, dt, iterCap) {
  if (state.kaleidoAlignActive || state.phase !== PHASE.ZOOM_IN) return;

  state.detailCheckTimer += dt;
  if (state.detailCheckTimer < KALEIDO_DETAIL_CHECK_INTERVAL) return;

  state.detailCheckTimer = 0;
  scheduleKaleidoAlign(state, iterCap, false);
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
  const fade = pivotFade(zoomNormFor(state.zoomExponent));
  const t = state.symmetryTime;
  state.pivotX = PIVOT_AMP * fade * Math.sin(t * PIVOT_SPEED_X);
  state.pivotY = PIVOT_AMP * fade * Math.cos(t * PIVOT_SPEED_Y);
}

function startPanToTarget(state) {
  const target = pickNextTarget(state.centerX, state.centerY);
  state.centerFromX = state.centerX;
  state.centerFromY = state.centerY;
  state.centerToX = target.x;
  state.centerToY = target.y;
  state.phase = PHASE.PAN;
  state.detailCheckTimer = 0;

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

export function createAnimationState(isMobile = false) {
  const initial = pickInitialTarget();
  const initialColorMode = COLOR_MODES[0];
  const initialTapestryStyle = TAPESTRY_STYLES[0];

  const state = {
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
    kaleidoAlignOffset: 0,
    kaleidoAlignStart: 0,
    kaleidoAlignDelta: 0,
    kaleidoAlignTarget: 0,
    kaleidoAlignDuration: 2,
    kaleidoAlignElapsed: 0,
    kaleidoAlignActive: false,
    detailCheckTimer: 0,
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
    isMobile,
  };

  const iterCap = iterCapForState(state, 1, isMobile);
  const { phase } = findBestKaleidoAnchor(state, iterCap, KALEIDO_SEGMENTS);
  state.kaleidoAlignOffset = phase;

  return state;
}

function updatePan(state, dt, iterCap) {
  const dx = state.centerToX - state.centerX;
  const dy = state.centerToY - state.centerY;
  const dist = Math.hypot(dx, dy);

  if (dist < PAN_ARRIVAL_EPS) {
    state.centerX = state.centerToX;
    state.centerY = state.centerToY;
    state.phase = PHASE.ZOOM_IN;
    scheduleKaleidoAlign(state, iterCap, true);
    return;
  }

  const step = Math.min(dist, PAN_SPEED * dt);
  state.centerX += (dx / dist) * step;
  state.centerY += (dy / dist) * step;
}

function shouldZoomOutEarly(state, iterCap) {
  const zoomNorm = zoomNormFor(state.zoomExponent);
  if (zoomNorm < LOW_DETAIL_ZOOM_OUT_NORM) return false;

  const score = measureKaleidoDetail(state, iterCap, KALEIDO_SEGMENTS);
  return score < LOW_DETAIL_ZOOM_OUT_SCORE;
}

function updateZoomIn(state, dt, iterCap) {
  if (shouldZoomOutEarly(state, iterCap)) {
    state.phase = PHASE.ZOOM_OUT;
    return;
  }

  state.zoomExponent = Math.min(MAX_ZOOM, state.zoomExponent + ZOOM_IN_SPEED * dt);

  if (state.zoomExponent >= MAX_ZOOM - ZOOM_EPS) {
    state.zoomExponent = MAX_ZOOM;
    if (shouldZoomOutEarly(state, iterCap)) {
      scheduleKaleidoAlign(state, iterCap, true);
    }
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

export function updateAnimation(state, _paletteState, dt, motionScale = 1, qualityScale = 1) {
  const motionDt = dt * motionScale;
  state.symmetryTime += state.reducedMotion ? dt * 0.05 : motionDt;

  updatePivotDrift(state);
  updateKaleidoAlign(state, motionDt);

  const iterCap = iterCapForState(state, qualityScale, state.isMobile);

  if (state.reducedMotion) {
    return;
  }

  if (!state.kaleidoAlignActive) {
    const rotScale = rotationZoomScale(zoomNormFor(state.zoomExponent));
    state.rotation += ROTATION_SPEED * rotScale * motionDt;
  }

  updateColorModes(state, motionDt);
  updateTapestryStyles(state, motionDt);
  updateDetailWatch(state, motionDt, iterCap);

  switch (state.phase) {
    case PHASE.PAN:
      updatePan(state, motionDt, iterCap);
      break;
    case PHASE.ZOOM_IN:
      updateZoomIn(state, motionDt, iterCap);
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
  const effectiveRotation = state.rotation + state.kaleidoAlignOffset;
  const rotCos = Math.cos(effectiveRotation);
  const rotSin = Math.sin(effectiveRotation);

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
