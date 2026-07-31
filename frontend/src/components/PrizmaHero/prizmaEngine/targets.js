export const CURATED_TARGETS = [
  { x: -1.471, y: 0.0 },
  { x: -0.761574, y: 0.0847596 },
  { x: -1.25066, y: 0.0 },
  { x: -0.123, y: 0.745 },
  { x: 0.285, y: 0.008 },
  { x: -0.235, y: 0.827 },
];

export const INITIAL_CENTER = { x: -1.471, y: 0.00001 };

export const MIN_TARGET_SEPARATION = 0.12;

export function pickInitialTarget(rng = Math.random) {
  const index = Math.floor(rng() * CURATED_TARGETS.length);
  const target = CURATED_TARGETS[index];
  const jitter = 0.015;
  return {
    x: target.x + (rng() - 0.5) * jitter,
    y: target.y + (rng() - 0.5) * jitter,
  };
}

export function pickNextTarget(lastX, lastY, rng = Math.random) {
  const shuffled = [...CURATED_TARGETS].sort(() => rng() - 0.5);

  for (const target of shuffled) {
    const dx = target.x - lastX;
    const dy = target.y - lastY;
    if (dx * dx + dy * dy >= MIN_TARGET_SEPARATION * MIN_TARGET_SEPARATION) {
      const jitter = 0.015;
      return {
        x: target.x + (rng() - 0.5) * jitter,
        y: target.y + (rng() - 0.5) * jitter,
      };
    }
  }

  const fallback = shuffled[0];
  return { ...fallback };
}
