/** Layout numbers from Nbyg `.gallery-slider` — kept in sync with globals.css vars. */
export const GALLERY_GAP = 24;
export const OVERLAP_STRIDE_FACTOR = 0.52;

/** Signed distance on a circular index ring (negative = left of active). */
export function shortestLoopDistance(
  index: number,
  activeIndex: number,
  total: number,
): number {
  const raw = index - activeIndex;
  const half = Math.floor(total / 2);
  if (raw > half) return raw - total;
  if (raw < -half) return raw + total;
  return raw;
}

export function readGalleryMetrics(root: HTMLElement) {
  const style = getComputedStyle(root);
  const slideWidth = parseFloat(style.getPropertyValue("--gallery-slide-w")) || 232;
  const overlapFactor =
    parseFloat(style.getPropertyValue("--gallery-overlap-stride")) || OVERLAP_STRIDE_FACTOR;
  return {
    slideWidth,
    slideHeight: parseFloat(style.getPropertyValue("--gallery-slide-h")) || 350,
    gap: parseFloat(style.getPropertyValue("--gallery-gap")) || GALLERY_GAP,
    sideScale: parseFloat(style.getPropertyValue("--gallery-side-scale")) || 0.94,
    overlapStride: slideWidth * overlapFactor,
  };
}
