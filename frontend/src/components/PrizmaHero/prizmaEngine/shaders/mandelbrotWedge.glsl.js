import {
  TAPESTRY_GLSL,
  PALETTE_GLSL,
  FRACTAL_ITER_GLSL,
  COLOR_MODES_GLSL,
} from './shaderChunks';

export const wedgeVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const wedgeFragmentShader = `
precision highp float;

uniform vec2 u_fboSize;
uniform float u_aspectRatio;
uniform vec2 u_center;
uniform vec2 u_pivot;
uniform float u_zoomFactor;
uniform float u_rotCos;
uniform float u_rotSin;
uniform float u_maxIter;
uniform float u_zoomNorm;
uniform float u_paletteOffset;
uniform float u_paletteSpacing;
uniform float u_kaleidoSegments;
uniform float u_colorModeFrom;
uniform float u_colorModeTo;
uniform float u_colorModeBlend;
uniform sampler2D u_palette;

varying vec2 vUv;

${TAPESTRY_GLSL}
${PALETTE_GLSL}
${FRACTAL_ITER_GLSL}
${COLOR_MODES_GLSL}

vec3 evaluateFractalColor(vec2 uv, bool needTrap) {
  FractalIter it = fractalIterate(uv, u_center, u_pivot, needTrap);
  vec2 rot = rotFromUv(uv, u_pivot);

  vec3 colorFrom = colorForMode(u_colorModeFrom, it.p, rot, it);
  vec3 colorTo = colorForMode(u_colorModeTo, it.p, rot, it);
  float t = u_colorModeBlend * u_colorModeBlend * (3.0 - 2.0 * u_colorModeBlend);
  return mix(colorFrom, colorTo, t);
}

void main() {
  const float PI = 3.14159265359;
  float maxR = length(vec2(u_aspectRatio, 1.0));
  float halfWedge = PI / u_kaleidoSegments;
  float rel = gl_FragCoord.x / u_fboSize.x * halfWedge;
  float r = gl_FragCoord.y / u_fboSize.y * maxR;
  vec2 uv = r * vec2(cos(rel), sin(rel));

  bool needTrap = (abs(u_colorModeFrom - 1.0) < 0.5 || abs(u_colorModeTo - 1.0) < 0.5);
  gl_FragColor = vec4(evaluateFractalColor(uv, needTrap), 1.0);
}
`;

export const composeVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const composeFragmentShader = `
precision highp float;

uniform vec2 u_fboSize;
uniform float u_aspectRatio;
uniform vec2 u_pivot;
uniform float u_rotCos;
uniform float u_rotSin;
uniform float u_kaleidoSegments;
uniform float u_paletteOffset;
uniform float u_paletteSpacing;
uniform sampler2D u_wedgeTex;

varying vec2 vUv;

${TAPESTRY_GLSL}

const float PI = 3.14159265359;

vec2 kaleidoFold(vec2 uv, float segments) {
  float ang = atan(uv.y, uv.x);
  float r = length(uv);
  float seg = 6.28318530718 / segments;
  float rel = mod(ang + seg, seg);
  rel = abs(rel - 0.5 * seg);
  return r * vec2(cos(rel), sin(rel));
}

float maxUvRadius() {
  return length(vec2(u_aspectRatio, 1.0));
}

float mirrorR(float r, float maxR) {
  if (r <= maxR) return r;
  float period = 2.0 * maxR;
  float wrapped = mod(r, period);
  return maxR - abs(wrapped - maxR);
}

vec3 sampleWedgeAt(vec2 uvFold, float segments) {
  float maxR = maxUvRadius();
  float halfWedge = PI / segments;
  float rel = atan(uvFold.y, uvFold.x);
  float r = length(uvFold);
  r = mirrorR(r, maxR);
  vec2 texCoord = vec2(rel / halfWedge, r / maxR);
  return texture2D(u_wedgeTex, texCoord).rgb;
}

vec2 screenRotFromUv(vec2 uv) {
  vec2 rel = uv - u_pivot;
  return vec2(u_rotCos * rel.x - u_rotSin * rel.y,
              u_rotSin * rel.x + u_rotCos * rel.y);
}

vec3 applyTapestryCompose(vec2 uv, vec3 color) {
  vec3 comp = color;
  if (tapestryActive()) {
    float maxR = maxUvRadius();
    vec2 rot = screenRotFromUv(uv);
    if (length(uv) > maxR) {
      comp = tapestryFill(rot, u_tapestryStyleTo);
    } else {
      float dark = smoothstep(TAPESTRY_DARK_LUMA_HI, TAPESTRY_DARK_LUMA_LO, tapestryLuma(comp));
      if (dark > 0.001) {
        vec3 fill = tapestryFill(rot, u_tapestryStyleTo);
        comp = mix(comp, fill, dark);
      }
    }
  }
  return comp;
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= u_aspectRatio;
  vec2 folded = kaleidoFold(uv, u_kaleidoSegments);
  vec3 color = sampleWedgeAt(folded, u_kaleidoSegments);
  gl_FragColor = vec4(applyTapestryCompose(uv, color), 1.0);
}
`;
