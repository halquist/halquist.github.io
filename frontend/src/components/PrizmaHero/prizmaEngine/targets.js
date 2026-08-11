import { evaluateDetailScore, zoomAwareDetailScore } from './mandelbrot';
import { MAX_ZOOM, zoomFactorFor } from './quality';

export const CURATED_TARGETS = [
  { x: -1.471, y: 0.0 },
  { x: -0.761574, y: 0.0847596 },
  { x: -1.25066, y: 0.0 },
  { x: -0.123, y: 0.745 },
  { x: -0.235, y: 0.827 },
  { x: -0.7453, y: 0.1127 },
  { x: -1.768, y: 0.0 },
];

const MIN_DETAIL_SCORE = 0.5;
const MIN_ZOOM_AWARE_SCORE = 0.22;
const VALIDATION_ITER_CAP = 128;

export const MIN_TARGET_SEPARATION = 0.12;

function scoreTarget(target, zoomExponent = MAX_ZOOM) {
  const zoomFactor = zoomFactorFor(zoomExponent);
  const edge = evaluateDetailScore(target.x, target.y, VALIDATION_ITER_CAP);
  const spread = zoomAwareDetailScore(target.x, target.y, zoomFactor, VALIDATION_ITER_CAP);
  if (edge <= MIN_DETAIL_SCORE || spread < MIN_ZOOM_AWARE_SCORE) {
    return -1;
  }
  return edge * spread;
}

function jitterTarget(target, rng) {
  const jitter = 0.012;
  return {
    x: target.x + (rng() - 0.5) * jitter,
    y: target.y + (rng() - 0.5) * jitter,
  };
}

function rankedTargets(lastX, lastY, rng = Math.random) {
  const minSepSq = MIN_TARGET_SEPARATION * MIN_TARGET_SEPARATION;

  return CURATED_TARGETS.map((target) => ({
    target,
    score: scoreTarget(target),
    distSq: (target.x - lastX) ** 2 + (target.y - lastY) ** 2,
  }))
    .filter((entry) => entry.score >= 0 && entry.distSq >= minSepSq)
    .sort((a, b) => b.score - a.score || b.distSq - a.distSq || rng() - 0.5);
}

export function pickInitialTarget(rng = Math.random) {
  const ranked = CURATED_TARGETS.map((target) => ({
    target,
    score: scoreTarget(target),
  }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score || rng() - 0.5);

  const chosen = ranked.length > 0 ? ranked[0].target : CURATED_TARGETS[0];
  return jitterTarget(chosen, rng);
}

export function pickNextTarget(lastX, lastY, rng = Math.random) {
  const ranked = rankedTargets(lastX, lastY, rng);
  if (ranked.length > 0) {
    const pick = ranked[Math.min(ranked.length - 1, Math.floor(rng() * Math.min(3, ranked.length)))];
    return jitterTarget(pick.target, rng);
  }

  const fallback = CURATED_TARGETS[Math.floor(rng() * CURATED_TARGETS.length)];
  return jitterTarget(fallback, rng);
}
