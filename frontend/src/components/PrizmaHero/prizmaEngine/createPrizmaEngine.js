import * as THREE from 'three';
import {
  wedgeVertexShader,
  wedgeFragmentShader,
  composeVertexShader,
  composeFragmentShader,
} from './shaders/mandelbrotWedge.glsl.js';
import { createAnimationState, updateAnimation, getRenderParams } from './animation';
import { createPaletteState, updatePalette, PALETTE_SIZE } from './palette';
import {
  createQualityTracker,
  iterationCapForZoom,
  zoomFactorFor,
  getDeviceCaps,
  computeRenderSize,
} from './quality';

const WEDGE_ANGULAR_SCALE = 2;
const WEDGE_RADIAL_SCALE = 2;
const KALEIDO_SEGMENTS = 6;

function createFullscreenQuad() {
  const geometry = new THREE.PlaneGeometry(2, 2);
  return geometry;
}

function createDataTexture(data) {
  const texture = new THREE.DataTexture(data, PALETTE_SIZE, 1, THREE.RGBAFormat);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

function computeSizes(renderSize) {
  const wedgeW = Math.max(8, Math.floor((renderSize * WEDGE_ANGULAR_SCALE) / KALEIDO_SEGMENTS));
  const wedgeH = Math.max(8, Math.floor((renderSize * WEDGE_RADIAL_SCALE) / 2));
  return { renderSize, wedgeW, wedgeH };
}

export function createPrizmaEngine(canvas, options = {}) {
  const isMobile = options.isMobile ?? window.innerWidth <= 768;
  const deviceCaps = getDeviceCaps(isMobile);
  const animation = createAnimationState(isMobile);
  const palette = createPaletteState();
  const quality = createQualityTracker();

  if (options.reducedMotion) {
    animation.reducedMotion = true;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setClearColor(0x000000, 1);

  const paletteTexture = createDataTexture(palette.rgba);
  const tapestryTexture = createDataTexture(palette.tapestryRgba);
  updatePalette(palette, animation.zoomExponent, 0);

  const wedgeTarget = new THREE.WebGLRenderTarget(1, 1, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: false,
    stencilBuffer: false,
  });
  wedgeTarget.texture.flipY = false;

  const wedgeUniforms = {
    u_fboSize: { value: new THREE.Vector2(1, 1) },
    u_aspectRatio: { value: 1 },
    u_center: { value: new THREE.Vector2(animation.centerX, animation.centerY) },
    u_pivot: { value: new THREE.Vector2(0, 0) },
    u_zoomFactor: { value: zoomFactorFor(animation.zoomExponent) },
    u_rotCos: { value: 1 },
    u_rotSin: { value: 0 },
    u_maxIter: { value: 128 },
    u_zoomNorm: { value: 0 },
    u_paletteOffset: { value: 0 },
    u_paletteSpacing: { value: 1 },
    u_kaleidoSegments: { value: KALEIDO_SEGMENTS },
    u_colorModeFrom: { value: 0 },
    u_colorModeTo: { value: 0 },
    u_colorModeBlend: { value: 1 },
    u_palette: { value: paletteTexture },
    u_jitterUv: { value: new THREE.Vector2(0, 0) },
    u_tapestryStyleFrom: { value: 1 },
    u_tapestryStyleTo: { value: 1 },
    u_tapestryStyleBlend: { value: 1 },
    u_symmetryTime: { value: 0 },
    u_tapestryPalette: { value: tapestryTexture },
  };

  const composeUniforms = {
    u_fboSize: { value: new THREE.Vector2(1, 1) },
    u_aspectRatio: { value: 1 },
    u_pivot: { value: new THREE.Vector2(0, 0) },
    u_rotCos: { value: 1 },
    u_rotSin: { value: 0 },
    u_kaleidoSegments: { value: KALEIDO_SEGMENTS },
    u_paletteOffset: { value: 0 },
    u_paletteSpacing: { value: 1 },
    u_wedgeTex: { value: wedgeTarget.texture },
    u_tapestryStyleFrom: { value: 1 },
    u_tapestryStyleTo: { value: 1 },
    u_tapestryStyleBlend: { value: 1 },
    u_symmetryTime: { value: 0 },
    u_tapestryPalette: { value: tapestryTexture },
  };

  const quadGeometry = createFullscreenQuad();

  const wedgeMaterial = new THREE.ShaderMaterial({
    vertexShader: wedgeVertexShader,
    fragmentShader: wedgeFragmentShader,
    uniforms: wedgeUniforms,
  });

  const composeMaterial = new THREE.ShaderMaterial({
    vertexShader: composeVertexShader,
    fragmentShader: composeFragmentShader,
    uniforms: composeUniforms,
  });

  const wedgeScene = new THREE.Scene();
  const wedgeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const wedgeMesh = new THREE.Mesh(quadGeometry, wedgeMaterial);
  wedgeScene.add(wedgeMesh);

  const composeScene = new THREE.Scene();
  const composeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const composeMesh = new THREE.Mesh(quadGeometry, composeMaterial);
  composeScene.add(composeMesh);

  let running = false;
  let rafId = null;
  let lastTime = performance.now();
  let renderSize = 290;
  let sizes = computeSizes(renderSize);
  let containerSize = 290;
  let containerDpr = 1;

  function applyRenderSize(newRenderSize) {
    if (newRenderSize === renderSize) return false;

    renderSize = newRenderSize;
    sizes = computeSizes(renderSize);

    renderer.setPixelRatio(1);
    renderer.setSize(renderSize, renderSize, false);

    wedgeTarget.setSize(sizes.wedgeW, sizes.wedgeH);
    wedgeUniforms.u_fboSize.value.set(sizes.wedgeW, sizes.wedgeH);
    composeUniforms.u_fboSize.value.set(renderSize, renderSize);
    return true;
  }

  function resize(containerWidth, containerHeight, dpr, qualityScale = quality.getQualityScale()) {
    containerSize = Math.min(containerWidth, containerHeight);
    containerDpr = dpr || 1;
    const newRenderSize = computeRenderSize(
      containerSize,
      containerDpr,
      deviceCaps,
      qualityScale * deviceCaps.qualityScale,
    );
    applyRenderSize(newRenderSize);
    composeUniforms.u_aspectRatio.value = 1;
    wedgeUniforms.u_aspectRatio.value = 1;
  }

  function syncRenderResolution() {
    const newRenderSize = computeRenderSize(
      containerSize,
      containerDpr,
      deviceCaps,
      quality.getQualityScale() * deviceCaps.qualityScale,
    );
    applyRenderSize(newRenderSize);
  }

  function syncUniforms(params) {
    const qualityScale = quality.getQualityScale() * deviceCaps.qualityScale;
    const maxIter = iterationCapForZoom(params.zoomExponent, qualityScale, params.isMobile);
    const zoomFactor = zoomFactorFor(params.zoomExponent);

    wedgeUniforms.u_center.value.set(params.center.x, params.center.y);
    wedgeUniforms.u_pivot.value.set(params.pivot.x, params.pivot.y);
    wedgeUniforms.u_zoomFactor.value = zoomFactor;
    wedgeUniforms.u_rotCos.value = params.rotCos;
    wedgeUniforms.u_rotSin.value = params.rotSin;
    wedgeUniforms.u_maxIter.value = maxIter;
    wedgeUniforms.u_zoomNorm.value = params.zoomNorm;
    wedgeUniforms.u_paletteOffset.value = palette.paletteOffset;
    wedgeUniforms.u_paletteSpacing.value = palette.paletteSpacing;
    wedgeUniforms.u_colorModeFrom.value = params.colorModeFrom;
    wedgeUniforms.u_colorModeTo.value = params.colorModeTo;
    wedgeUniforms.u_colorModeBlend.value = params.colorModeBlend;
    wedgeUniforms.u_tapestryStyleFrom.value = params.tapestryStyleFrom;
    wedgeUniforms.u_tapestryStyleTo.value = params.tapestryStyleTo;
    wedgeUniforms.u_tapestryStyleBlend.value = params.tapestryStyleBlend;
    wedgeUniforms.u_symmetryTime.value = params.symmetryTime;

    composeUniforms.u_pivot.value.set(params.pivot.x, params.pivot.y);
    composeUniforms.u_rotCos.value = params.rotCos;
    composeUniforms.u_rotSin.value = params.rotSin;
    composeUniforms.u_paletteOffset.value = palette.paletteOffset;
    composeUniforms.u_paletteSpacing.value = palette.paletteSpacing;
    composeUniforms.u_tapestryStyleFrom.value = params.tapestryStyleFrom;
    composeUniforms.u_tapestryStyleTo.value = params.tapestryStyleTo;
    composeUniforms.u_tapestryStyleBlend.value = params.tapestryStyleBlend;
    composeUniforms.u_symmetryTime.value = params.symmetryTime;
  }

  function updateTextures() {
    if (palette.dirty) {
      paletteTexture.image.data.set(palette.rgba);
      paletteTexture.needsUpdate = true;
      palette.dirty = false;
    }
    if (palette.tapestryDirty) {
      tapestryTexture.image.data.set(palette.tapestryRgba);
      tapestryTexture.needsUpdate = true;
      palette.tapestryDirty = false;
    }
  }

  function renderFrame() {
    updateTextures();
    const params = getRenderParams(animation, quality.getQualityScale(), isMobile);
    syncUniforms(params);

    renderer.setRenderTarget(wedgeTarget);
    renderer.render(wedgeScene, wedgeCamera);

    renderer.setRenderTarget(null);
    renderer.render(composeScene, composeCamera);
  }

  function tick(now) {
    if (!running) return;
    rafId = requestAnimationFrame(tick);

    const dt = Math.min(0.05, (now - lastTime) / 1000);
    lastTime = now;

    const motionScale = animation.reducedMotion ? 0.05 : 1;
    updateAnimation(animation, palette, dt, motionScale, quality.getQualityScale());
    updatePalette(palette, animation.zoomExponent, dt, motionScale);

    const frameStart = performance.now();
    renderFrame();
    quality.onFrame(performance.now() - frameStart, isMobile);
    syncRenderResolution();
  }

  return {
    resize,
    start() {
      if (running) return;
      running = true;
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    },
    renderOnce() {
      updatePalette(palette, animation.zoomExponent, 0);
      renderFrame();
    },
    dispose() {
      this.stop();
      quadGeometry.dispose();
      wedgeMaterial.dispose();
      composeMaterial.dispose();
      wedgeTarget.dispose();
      paletteTexture.dispose();
      tapestryTexture.dispose();
      renderer.dispose();
    },
  };
}
