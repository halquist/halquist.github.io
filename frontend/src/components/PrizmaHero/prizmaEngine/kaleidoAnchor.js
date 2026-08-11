import { mandelbrotIter } from './mandelbrot';
import { zoomFactorFor } from './quality';

const TAU = Math.PI * 2;
const GRID_W = 8;
const GRID_H = 8;
const PHASES = 16;

export const KALEIDO_DETAIL_MIN_SCORE = 0.15;
export const KALEIDO_DETAIL_CHECK_INTERVAL = 14;

const KALEIDO_ALIGN_MIN_DURATION = 3;
const KALEIDO_ALIGN_MAX_DURATION = 40;
const KALEIDO_ALIGN_ANGULAR_SPEED = 0.0025;

function maxUvRadius(aspectRatio) {
  return Math.hypot(aspectRatio, 1);
}

function kaleidoFold(uv, segments) {
  const ang = Math.atan2(uv.y, uv.x);
  const r = Math.hypot(uv.x, uv.y);
  const seg = TAU / segments;
  let rel = (ang + seg) % seg;
  if (rel < 0) rel += seg;
  rel = Math.abs(rel - 0.5 * seg);
  return { x: r * Math.cos(rel), y: r * Math.sin(rel) };
}

function rotationWithPhase(rotCos, rotSin, phaseOffset) {
  if (Math.abs(phaseOffset) < 1e-6) {
    return { cos: rotCos, sin: rotSin };
  }
  const angle = Math.atan2(rotSin, rotCos) + phaseOffset;
  return { cos: Math.cos(angle), sin: Math.sin(angle) };
}

function pointDetailScore(px, py, iterCap) {
  const probeIter = Math.min(iterCap, 128);
  const iter = mandelbrotIter(px, py, probeIter);
  if (iter >= probeIter) return 0;

  const norm = iter / probeIter;
  if (norm < 0.12) return 0;

  const edge = 1 - Math.abs(norm - 0.82) / 0.18;
  return Math.max(0, edge);
}

function measureGridDetail(view, rotCos, rotSin, iterCap) {
  const maxR = maxUvRadius(view.aspectRatio);
  let sum = 0;
  let count = 0;

  for (let gy = 0; gy < GRID_H; gy += 1) {
    const v = ((gy + 0.5) / GRID_H) * 2 - 1;
    for (let gx = 0; gx < GRID_W; gx += 1) {
      const u = ((gx + 0.5) / GRID_W) * 2 - 1;
      const folded = kaleidoFold({ x: u * view.aspectRatio, y: v }, view.kaleidoSegments);
      if (Math.hypot(folded.x, folded.y) > maxR) continue;

      const relX = folded.x - view.pivotX;
      const relY = folded.y - view.pivotY;
      const rx = rotCos * relX - rotSin * relY;
      const ry = rotSin * relX + rotCos * relY;
      const px = view.centerX + (rx + view.pivotX) * view.zoomFactor;
      const py = view.centerY + (ry + view.pivotY) * view.zoomFactor;
      sum += pointDetailScore(px, py, iterCap);
      count += 1;
    }
  }

  return count > 0 ? sum / count : 0;
}

function buildView(state, kaleidoSegments) {
  return {
    centerX: state.centerX,
    centerY: state.centerY,
    zoomFactor: zoomFactorFor(state.zoomExponent),
    pivotX: state.pivotX,
    pivotY: state.pivotY,
    aspectRatio: 1,
    kaleidoSegments,
  };
}

export function measureKaleidoDetail(state, iterCap, kaleidoSegments, phaseOffset = 0) {
  const baseAngle = state.rotation + state.kaleidoAlignOffset;
  const { cos: rotCos, sin: rotSin } = rotationWithPhase(
    Math.cos(baseAngle),
    Math.sin(baseAngle),
    phaseOffset,
  );
  return measureGridDetail(buildView(state, kaleidoSegments), rotCos, rotSin, iterCap);
}

export function findBestKaleidoAnchor(state, iterCap, kaleidoSegments) {
  let bestPhase = 0;
  let bestScore = -1;

  for (let p = 0; p < PHASES; p += 1) {
    const phase = (TAU * p) / PHASES;
    const score = measureKaleidoDetail(state, iterCap, kaleidoSegments, phase);
    if (score > bestScore) {
      bestScore = score;
      bestPhase = phase;
    }
  }

  return { phase: bestPhase, score: bestScore };
}

export function shortestAngleDelta(from, to) {
  let delta = to - from;
  while (delta > Math.PI) delta -= TAU;
  while (delta < -Math.PI) delta += TAU;
  return delta;
}

export function alignDurationFor(deltaRad) {
  const absDelta = Math.abs(deltaRad);
  const bySpeed = absDelta / KALEIDO_ALIGN_ANGULAR_SPEED;
  return Math.min(
    KALEIDO_ALIGN_MAX_DURATION,
    Math.max(KALEIDO_ALIGN_MIN_DURATION, bySpeed),
  );
}
