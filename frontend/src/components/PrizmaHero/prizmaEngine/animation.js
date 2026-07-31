import { pickInitialTarget, pickNextTarget } from './targets';
import { MIN_ZOOM, MAX_ZOOM, zoomNormFor } from './quality';

const KALEIDO_SEGMENTS = 6;
const WEDGE_ANGULAR_SCALE = 2;
const WEDGE_RADIAL_SCALE = 2;

const PHASE = {
  PAN: 'pan',
  ZOOM_IN: 'zoomIn',
  ZOOM_OUT: 'zoomOut',
};

// Fixed-rate motion (no easing — avoids accelerating pan/zoom feel)
const PAN_SPEED = 0.05;
const ZOOM_IN_SPEED = 0.18;
const ZOOM_OUT_SPEED = 0.24;
const ROTATION_SPEED = 0.012;
const PAN_ARRIVAL_EPS = 0.003;
const ZOOM_EPS = 0.015;

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
    colorModeFrom: 0,
    colorModeTo: 0,
    colorModeBlend: 1,
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
  if (state.reducedMotion) {
    state.symmetryTime += dt * 0.05;
    return;
  }

  const motionDt = dt * motionScale;
  state.symmetryTime += motionDt;
  state.rotation += ROTATION_SPEED * motionDt;

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
    tapestryStyleFrom: 1,
    tapestryStyleTo: 1,
    tapestryStyleBlend: 1,
    isMobile,
  };
}

export { KALEIDO_SEGMENTS, WEDGE_ANGULAR_SCALE, WEDGE_RADIAL_SCALE };
