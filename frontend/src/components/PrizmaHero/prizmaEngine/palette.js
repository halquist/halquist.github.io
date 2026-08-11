const PALETTE_SIZE = 256;
const PRESET_COUNT = 16;

const PRESETS = [
  { phaseR: 0.0, phaseG: 0.33, phaseB: 0.67 },
  { phaseR: 0.0, phaseG: 0.1, phaseB: 0.2 },
  { phaseR: 0.5, phaseG: 0.7, phaseB: 0.9 },
  { phaseR: 0.0, phaseG: 0.5, phaseB: 0.75 },
  { phaseR: 0.25, phaseG: 0.7, phaseB: 0.1 },
  { phaseR: 0.12, phaseG: 0.52, phaseB: 0.92 },
  { phaseR: 0.35, phaseG: 0.6, phaseB: 0.1 },
  { phaseR: 0.0, phaseG: 0.2, phaseB: 0.45 },
  { phaseR: 0.1, phaseG: 0.65, phaseB: 0.85 },
  { phaseR: 0.0, phaseG: 0.33, phaseB: 0.66 },
  { phaseR: 0.15, phaseG: 0.55, phaseB: 0.85 },
  { phaseR: 0.08, phaseG: 0.33, phaseB: 0.66 },
  { phaseR: 0.3, phaseG: 0.45, phaseB: 0.5 },
  { phaseR: 0.0, phaseG: 0.5, phaseB: 0.7 },
  { phaseR: 0.5, phaseG: 0.4, phaseB: 0.3 },
  { phaseR: 0.1, phaseG: 0.45, phaseB: 0.45 },
];

const cosLUT = new Float32Array(512);

for (let i = 0; i < 512; i += 1) {
  cosLUT[i] = Math.cos((i * Math.PI * 2) / 512);
}

function cosPalette(t) {
  let idx = t % 1;
  if (idx < 0) idx += 1;
  idx *= 512;
  const i = Math.floor(idx) & 511;
  const frac = idx - Math.floor(idx);
  const c = cosLUT[i] + frac * (cosLUT[(i + 1) & 511] - cosLUT[i]);
  return 0.5 + 0.5 * c;
}

function lerpProfile(a, b, t) {
  return {
    phaseR: a.phaseR + t * (b.phaseR - a.phaseR),
    phaseG: a.phaseG + t * (b.phaseG - a.phaseG),
    phaseB: a.phaseB + t * (b.phaseB - a.phaseB),
  };
}

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}

export function createPaletteState() {
  const index = Math.floor(Math.random() * PRESET_COUNT);
  const state = {
    paletteFloat: Math.random() * PALETTE_SIZE,
    scrollSign: Math.random() < 0.5 ? -1 : 1,
    scrollSignAtFlipStart: 1,
    directionFlipActive: false,
    directionFlipElapsed: 0,
    nextDirectionFlip: randomFloat(18, 32),
    elapsed: 0,
    currentProfile: { ...PRESETS[index] },
    targetProfile: { ...PRESETS[index] },
    profileBlendT: 1,
    lastProfileIndex: index,
    nextProfilePick: randomFloat(80, 110),
    currentSpacing: 1 + Math.floor(Math.random() * 3),
    targetSpacing: 1,
    paletteOffset: 0,
    paletteSpacing: 1,
    colorCycleSpeed: randomFloat(0.35, 0.55),
    rgba: new Uint8Array(PALETTE_SIZE * 4),
    tapestryRgba: new Uint8Array(PALETTE_SIZE * 4),
    dirty: true,
    tapestryDirty: true,
  };
  generateTextures(state);
  return state;
}

function generateTextures(state) {
  const blended = lerpProfile(state.currentProfile, state.targetProfile, state.profileBlendT);
  state.paletteSpacing = state.currentSpacing;

  for (let i = 0; i < PALETTE_SIZE; i += 1) {
    let t = ((i * state.currentSpacing) / PALETTE_SIZE) % 1;
    if (t < 0) t += 1;

    state.rgba[i * 4] = Math.floor(cosPalette(t + blended.phaseR) * 255);
    state.rgba[i * 4 + 1] = Math.floor(cosPalette(t + blended.phaseG) * 255);
    state.rgba[i * 4 + 2] = Math.floor(cosPalette(t + blended.phaseB) * 255);
    state.rgba[i * 4 + 3] = 255;

    let tt = (i / PALETTE_SIZE) % 1;
    if (tt < 0) tt += 1;
    state.tapestryRgba[i * 4] = Math.floor(cosPalette(tt + blended.phaseR) * 255);
    state.tapestryRgba[i * 4 + 1] = Math.floor(cosPalette(tt + blended.phaseG) * 255);
    state.tapestryRgba[i * 4 + 2] = Math.floor(cosPalette(tt + blended.phaseB) * 255);
    state.tapestryRgba[i * 4 + 3] = 255;
  }

  state.paletteOffset = state.paletteFloat / PALETTE_SIZE;
  state.dirty = true;
  state.tapestryDirty = true;
}

function pickNewFadeProfile(state) {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * PRESET_COUNT);
  } while (newIndex === state.lastProfileIndex);

  state.lastProfileIndex = newIndex;
  state.currentProfile = lerpProfile(
    state.currentProfile,
    state.targetProfile,
    state.profileBlendT,
  );
  state.targetProfile = { ...PRESETS[newIndex] };
  state.profileBlendT = 0;
  state.targetSpacing = 1 + Math.floor(Math.random() * 4);
}

export function cyclePalettePreset(state) {
  pickNewFadeProfile(state);
  state.nextProfilePick = state.elapsed + randomFloat(80, 110);
}

export function updatePalette(state, zoomExponent, dt, motionScale = 1) {
  const motionDt = dt * motionScale;
  state.elapsed += motionDt;

  if (state.directionFlipActive) {
    state.directionFlipElapsed += motionDt;
    let t = state.directionFlipElapsed / 2.5;
    if (t >= 1) {
      state.directionFlipActive = false;
      state.scrollSign = -state.scrollSignAtFlipStart;
    } else {
      const eased = t * t * (3 - 2 * t);
      state.scrollSign = state.scrollSignAtFlipStart * Math.cos(eased * Math.PI);
    }
  } else if (state.elapsed >= state.nextDirectionFlip) {
    state.scrollSignAtFlipStart = state.scrollSign >= 0 ? 1 : -1;
    state.directionFlipActive = true;
    state.directionFlipElapsed = 0;
    state.nextDirectionFlip = state.elapsed + randomFloat(18, 32);
  }

  if (state.elapsed >= state.nextProfilePick && state.profileBlendT >= 1) {
    pickNewFadeProfile(state);
    state.nextProfilePick = state.elapsed + randomFloat(45, 75);
  }

  if (state.profileBlendT < 1) {
    state.profileBlendT = Math.min(1, state.profileBlendT + motionDt * 0.045);
    if (state.profileBlendT >= 1) {
      state.currentSpacing = state.targetSpacing;
    }
  }

  const dir = Math.abs(state.scrollSign) < 0.01 ? 1 : Math.sign(state.scrollSign);
  state.paletteFloat += state.colorCycleSpeed * motionDt * dir * 4.5;
  if (state.paletteFloat >= PALETTE_SIZE) state.paletteFloat %= PALETTE_SIZE;
  if (state.paletteFloat < 0) state.paletteFloat += PALETTE_SIZE;

  generateTextures(state);
}

export { PALETTE_SIZE };
