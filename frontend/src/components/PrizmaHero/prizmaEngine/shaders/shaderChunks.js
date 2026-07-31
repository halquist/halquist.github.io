export const TAPESTRY_GLSL = `
uniform int u_tapestryStyleFrom;
uniform int u_tapestryStyleTo;
uniform float u_tapestryStyleBlend;
uniform sampler2D u_tapestryPalette;

const float TAPESTRY_PALETTE_SPAN = 0.92;
const float TAPESTRY_MIN_BANDS = 0.5;
const float TAPESTRY_DARK_LUMA_HI = 0.12;
const float TAPESTRY_DARK_LUMA_LO = 0.0;

float tapestryMaxR() {
  return length(vec2(u_aspectRatio, 1.0));
}

float tapestryLuma(vec3 c) {
  return dot(c, vec3(0.299, 0.587, 0.114));
}

float tapestryBlendT() {
  return u_tapestryStyleBlend * u_tapestryStyleBlend * (3.0 - 2.0 * u_tapestryStyleBlend);
}

bool tapestryActive() {
  return u_tapestryStyleFrom > 0 || u_tapestryStyleTo > 0;
}

float tapestryRadialT(vec2 rot, int style) {
  float maxR = tapestryMaxR();
  return clamp(length(rot) / max(maxR, 0.001), 0.0, 1.0);
}

float tapestryPaletteT(vec2 rot, int style) {
  float t = tapestryRadialT(rot, style);
  return u_paletteOffset + t * TAPESTRY_PALETTE_SPAN * TAPESTRY_MIN_BANDS;
}

vec3 tapestryFill(vec2 rot, int style) {
  vec3 fill = vec3(0.0);
  if (style > 0) {
    float paletteT = fract(tapestryPaletteT(rot, style));
    fill = texture2D(u_tapestryPalette, vec2(paletteT, 0.5)).rgb;
  }
  return fill;
}

vec3 tapestryInteriorForStyle(vec2 rot, int style) {
  vec3 interior = vec3(0.0);
  if (style > 0) {
    interior = tapestryFill(rot, style);
  }
  return interior;
}
`;

export const PALETTE_GLSL = `
uniform vec2 u_jitterUv;

vec3 samplePaletteT(float t) {
  return texture2D(u_palette, vec2(fract(t), 0.5)).rgb;
}

float samplePaletteChannel(float t) {
  return texture2D(u_palette, vec2(fract(t), 0.5)).r;
}

float samplePaletteG(float t) {
  return texture2D(u_palette, vec2(fract(t), 0.5)).g;
}

float samplePaletteB(float t) {
  return texture2D(u_palette, vec2(fract(t), 0.5)).b;
}
`;

export const FRACTAL_ITER_GLSL = `
struct FractalIter {
  vec2 p;
  vec2 z;
  float z2;
  float fi;
  float escaped;
  float smoothIter;
  float trap;
  float trapCircle;
  float trapCross;
  float trapAng;
  float trapIter;
  vec2 dz;
};

FractalIter fractalIterate(vec2 uv, vec2 center, vec2 pivot, bool needTrap) {
  FractalIter r;
  vec2 rel = uv - pivot;
  vec2 rot = vec2(u_rotCos * rel.x - u_rotSin * rel.y,
                  u_rotSin * rel.x + u_rotCos * rel.y);
  vec2 offset = (rot + pivot + u_jitterUv) * u_zoomFactor;

  r.p = center + offset;
  r.z = vec2(0.0);
  r.z2 = 0.0;
  r.fi = 0.0;
  r.escaped = 0.0;
  r.smoothIter = 0.0;
  r.trap = 1e20;
  r.trapCircle = 1e20;
  r.trapCross = 1e20;
  r.trapAng = 0.0;
  r.trapIter = 0.0;
  r.dz = vec2(0.0);

  float iterLimit = floor(u_maxIter + 0.5);
  if (iterLimit > 512.0) iterLimit = 512.0;
  if (iterLimit < 0.0) iterLimit = 0.0;

  for (int i = 0; i < 512; i++) {
    if (float(i) < iterLimit && r.z2 <= 4.0) {
      r.z = vec2(r.z.x * r.z.x - r.z.y * r.z.y, 2.0 * r.z.x * r.z.y) + r.p;
      r.z2 = dot(r.z, r.z);
      if (needTrap) {
        float dCircle = length(r.z);
        float dCross = min(abs(r.z.x), abs(r.z.y));
        float d = min(dCircle, dCross);
        if (d < r.trap) {
          r.trap = d;
          r.trapAng = atan(r.z.y, r.z.x);
          r.trapIter = r.fi;
        }
        r.trapCircle = min(r.trapCircle, dCircle);
        r.trapCross = min(r.trapCross, dCross);
      }
      r.fi += 1.0;
    }
  }

  r.escaped = (r.z2 > 4.0) ? 1.0 : 0.0;
  if (r.escaped > 0.5) {
    float logZn = log(max(r.z2, 1e-20)) * 0.5;
    r.smoothIter = r.fi + 1.0 - log(max(logZn, 1e-20)) / log(2.0);
  }
  return r;
}
`;

export const COLOR_MODES_GLSL = `
const float TAU = 6.28318530718;
const float PI = 3.14159265359;

bool inCardioidOrBulb(vec2 c) {
  float q = (c.x - 0.25) * (c.x - 0.25) + c.y * c.y;
  if (q * (q + (c.x - 0.25)) < 0.25 * c.y * c.y) return true;
  if ((c.x + 1.0) * (c.x + 1.0) + c.y * c.y < 0.0625) return true;
  return false;
}

vec3 colorPalette(float smoothIter) {
  float colorScale = mix(0.0035, 0.01, u_zoomNorm);
  float t = smoothIter * u_paletteSpacing * colorScale + u_paletteOffset;
  return samplePaletteT(t);
}

vec3 colorDomain(vec2 z, float smoothIter) {
  float ang = atan(z.y, z.x) / TAU + 0.5;
  float t = ang + smoothIter * 0.02 + u_paletteOffset;
  return samplePaletteT(t);
}

vec3 colorStripe(float smoothIter) {
  float bands = mix(56.0, 112.0, u_zoomNorm);
  float bandWidth = max(1.0, u_maxIter / bands);
  float bandIdx = floor(smoothIter / bandWidth);
  float t = bandIdx * 0.007 * u_paletteSpacing + u_paletteOffset;
  return samplePaletteT(t);
}

vec3 colorOrbitTrap(vec2 rot, vec2 z, float z2, float fi, float escaped,
                    float trap, float trapCircle, float trapCross,
                    float trapAng, float trapIter) {
  float zb = smoothstep(0.1, 0.45, u_zoomNorm);
  float tLinear = trap * 2.5 * u_paletteSpacing * 0.1;
  float logTrap = -log(max(trap, 1e-14));
  float logCircle = -log(max(trapCircle, 1e-14));
  float logCross = -log(max(trapCross, 1e-14));
  float sens = mix(0.08, 0.7, zb) * u_paletteSpacing;
  float micro = rot.x * 1.73 + rot.y * 2.29;
  float iterPhase = trapIter / max(u_maxIter, 1.0);
  float angNorm = trapAng / TAU + 0.5;
  float tLow = tLinear + u_paletteOffset;
  vec3 color = samplePaletteT(tLow);

  if (zb > 0.001) {
    float tR = logTrap * sens + micro * 1.4;
    float tG = angNorm * 3.2 + (logCircle - logCross) * 0.45 + micro * 0.9;
    float tB = iterPhase * 4.5 + logCross * sens * 0.2 + micro * 1.6;
    if (escaped > 0.5) {
      float logZn = log(max(z2, 1e-20)) * 0.5;
      float smoothIter = fi + 1.0 - log(max(logZn, 1e-20)) / log(2.0);
      tR += smoothIter * 0.14 * u_paletteSpacing;
      tG += smoothIter * 0.09 * u_paletteSpacing;
      tB += smoothIter * 0.2 * u_paletteSpacing;
    }
    tR += u_paletteOffset;
    tG += u_paletteOffset + 0.317;
    tB += u_paletteOffset + 0.683;
    vec3 decoupled = vec3(
      samplePaletteChannel(tR),
      samplePaletteG(tG),
      samplePaletteB(tB)
    );
    color = mix(color, decoupled, zb);
  }

  if (escaped < 0.5) {
    float dim = mix(0.5, 0.78, smoothstep(0.1, 0.45, u_zoomNorm));
    color *= dim;
  }
  return color;
}

vec3 colorForModeTapestry(float tapestryStyle, float mode, vec2 p, vec2 rot, FractalIter it) {
  vec3 result = colorPalette(it.smoothIter);

  if (abs(mode - 1.0) > 0.5 && inCardioidOrBulb(p)) {
    result = tapestryInteriorForStyle(rot, int(tapestryStyle + 0.5));
  } else if (abs(mode - 1.0) < 0.5) {
    result = colorOrbitTrap(rot, it.z, it.z2, it.fi, it.escaped, it.trap, it.trapCircle,
                            it.trapCross, it.trapAng, it.trapIter);
  } else if (it.escaped < 0.5) {
    result = tapestryInteriorForStyle(rot, int(tapestryStyle + 0.5));
  } else if (abs(mode - 2.0) < 0.5) {
    result = colorDomain(it.z, it.smoothIter);
  } else if (abs(mode - 3.0) < 0.5) {
    result = colorStripe(it.smoothIter);
  }

  return result;
}

vec3 colorForMode(float mode, vec2 p, vec2 rot, FractalIter it) {
  return colorForModeTapestry(float(u_tapestryStyleTo), mode, p, rot, it);
}

vec2 rotFromUv(vec2 uv, vec2 pivot) {
  vec2 rel = uv - pivot;
  return vec2(u_rotCos * rel.x - u_rotSin * rel.y,
              u_rotSin * rel.x + u_rotCos * rel.y);
}
`;
