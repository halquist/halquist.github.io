const MIN_ITER = 32;
const MAX_ITER_DESKTOP = 384;
const MAX_ITER_MOBILE = 256;
const DEEP_ZOOM_ITER_CAP = 512;
const DEEP_ZOOM_ITER_TAPER_START = 0.4;
const ITER_ZOOM_CURVE = 1.5;
const MIN_ZOOM = 1.0;
const MAX_ZOOM = 9.8;

export function zoomNormFor(zoomExponent) {
  return Math.max(0, Math.min(1, (zoomExponent - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)));
}

export function iterationCapForZoom(zoomExponent, qualityScale, isMobile) {
  const zoomNorm = zoomNormFor(zoomExponent);
  const maxIter = isMobile ? MAX_ITER_MOBILE : MAX_ITER_DESKTOP;

  let iterMax = maxIter;
  if (zoomNorm > DEEP_ZOOM_ITER_TAPER_START) {
    const taper =
      (zoomNorm - DEEP_ZOOM_ITER_TAPER_START) / (1 - DEEP_ZOOM_ITER_TAPER_START);
    iterMax = Math.floor(maxIter + taper * (DEEP_ZOOM_ITER_CAP - maxIter));
  }

  const curved = zoomNorm ** ITER_ZOOM_CURVE;
  let iter = MIN_ITER + Math.floor(curved * (iterMax - MIN_ITER));
  iter = Math.floor(iter * qualityScale);
  return Math.max(MIN_ITER, Math.min(iterMax, iter));
}

export function zoomFactorFor(zoomExponent) {
  const ZOOM_BASE = 2.9;
  return 1 / ZOOM_BASE ** zoomExponent;
}

export function getDeviceCaps(isMobile) {
  return {
    dprCap: isMobile ? 1.5 : 2.0,
    renderCap: isMobile ? 512 : 1024,
    renderSupersample: isMobile ? 1.5 : 2.0,
    qualityScale: isMobile ? 0.85 : 1.0,
  };
}

export function computeRenderSize(containerSize, dpr, deviceCaps, qualityScale = 1) {
  const cappedDpr = Math.min(deviceCaps.dprCap, dpr || 1);
  const supersample = 1 + (deviceCaps.renderSupersample - 1) * qualityScale;
  const size = Math.floor(containerSize * cappedDpr * supersample);
  return Math.max(180, Math.min(deviceCaps.renderCap, size));
}

export function createQualityTracker() {
  let emaMs = 16.67;
  let qualityScale = 1.0;
  let lowFpsTime = 0;

  return {
    getQualityScale: () => qualityScale,
    onFrame(frameMs, isMobile) {
      emaMs = emaMs * 0.92 + frameMs * 0.08;
      const targetFps = isMobile ? 28 : 32;
      const targetMs = 1000 / targetFps;

      if (emaMs > targetMs * 1.15) {
        lowFpsTime += frameMs / 1000;
        if (lowFpsTime > 1.0) {
          qualityScale = Math.max(isMobile ? 0.55 : 0.65, qualityScale - 0.08);
          lowFpsTime = 0;
        }
      } else if (emaMs < targetMs * 0.9) {
        lowFpsTime = Math.max(0, lowFpsTime - frameMs / 1000);
        if (lowFpsTime <= 0) {
          qualityScale = Math.min(1.0, qualityScale + 0.02);
        }
      }
    },
  };
}

export { MIN_ZOOM, MAX_ZOOM };
export const ZOOM_BASE = 2.9;
