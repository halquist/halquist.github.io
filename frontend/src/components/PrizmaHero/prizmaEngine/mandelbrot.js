export function mandelbrotIter(cx, cy, maxIter) {
  let zx = 0;
  let zy = 0;
  let i = 0;

  while (i < maxIter && zx * zx + zy * zy <= 4) {
    const xtemp = zx * zx - zy * zy + cx;
    zy = 2 * zx * zy + cy;
    zx = xtemp;
    i += 1;
  }

  return i;
}

export function evaluateDetailScore(x, y, iterCap) {
  const step = 0.002;
  const centerVal = mandelbrotIter(x, y, iterCap);
  const dx =
    mandelbrotIter(x + step, y, iterCap) - mandelbrotIter(x - step, y, iterCap);
  const dy =
    mandelbrotIter(x, y + step, iterCap) - mandelbrotIter(x, y - step, iterCap);
  const grad = Math.hypot(dx, dy);
  let score = grad * Math.log(2 + centerVal);
  if (centerVal > iterCap * 0.9 && centerVal < iterCap) {
    score *= 1.5;
  }
  return score;
}

export function zoomAwareDetailScore(cx, cy, zoomFactor, iterCap) {
  const gridSize = 8;
  const minX = cx - zoomFactor;
  const maxX = cx + zoomFactor;
  const minY = cy - zoomFactor;
  const maxY = cy + zoomFactor;
  const histogram = new Array(256).fill(0);
  let total = 0;

  for (let gy = 0; gy < gridSize; gy += 1) {
    const imag = minY + ((maxY - minY) * gy) / gridSize;
    for (let gx = 0; gx < gridSize; gx += 1) {
      const real = minX + ((maxX - minX) * gx) / gridSize;
      const iter = mandelbrotIter(real, imag, iterCap);
      const val = iter === iterCap ? 255 : iter % 256;
      histogram[val] += 1;
      total += 1;
    }
  }

  let unique = 0;
  for (let i = 0; i < 256; i += 1) {
    if (histogram[i]) unique += 1;
  }

  return unique / total;
}
