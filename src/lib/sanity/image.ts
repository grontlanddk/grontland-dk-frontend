import createImageUrlBuilder, {
  type SanityImageSource,
} from "@sanity/image-url";

import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export type UrlForImageOptions = {
  /** Max width in px. Default 1920 — matches next.config deviceSizes headroom. */
  width?: number;
  height?: number;
  /** Used with height; default "crop" when height is set. */
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  /** Default 80. */
  quality?: number;
};

/** Sanity CDN URL with resize + auto format (avoids Vercel Image Optimization). */
export function urlForImage(
  source: SanityImageSource,
  opts: UrlForImageOptions = {},
) {
  const width = opts.width ?? 1920;
  const quality = opts.quality ?? 80;
  let img = urlFor(source).width(width).quality(quality).auto("format");
  if (opts.height != null) {
    img = img.height(opts.height).fit(opts.fit ?? "crop");
  }
  return img;
}
