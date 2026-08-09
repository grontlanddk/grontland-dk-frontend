"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

function isSvgSrc(src: ImageProps["src"]) {
  if (typeof src !== "string") return false;
  const path = src.split("?")[0]?.toLowerCase() ?? "";
  return path.endsWith(".svg");
}

function isSanityCdnSrc(src: ImageProps["src"]) {
  if (typeof src !== "string") return false;
  try {
    return new URL(src, "https://localhost").hostname === "cdn.sanity.io";
  } catch {
    return src.includes("cdn.sanity.io");
  }
}

/** True when we should skip Vercel Image Optimization from the first paint. */
function shouldStartUnoptimized(src: ImageProps["src"]) {
  return isSvgSrc(src) || isSanityCdnSrc(src);
}

export type SafeImageProps = ImageProps;

/**
 * next/image wrapper: Sanity CDN + SVG skip Vercel IO; local assets try the
 * optimizer and fall back to the direct src on 402 / empty body.
 * Consumer onError runs only after direct src also fails.
 */
export function SafeImage({
  src,
  alt,
  unoptimized,
  onError,
  onLoad,
  ...props
}: SafeImageProps) {
  const [forceUnoptimized, setForceUnoptimized] = useState(() =>
    shouldStartUnoptimized(src),
  );
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  const resolvedUnoptimized = Boolean(unoptimized || forceUnoptimized);

  return (
    <Image
      {...props}
      key={resolvedUnoptimized ? "direct" : "optimized"}
      src={src}
      alt={alt}
      unoptimized={resolvedUnoptimized}
      onError={(event) => {
        if (!resolvedUnoptimized) {
          setForceUnoptimized(true);
          return;
        }
        setFailed(true);
        onError?.(event);
      }}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth === 0) {
          if (!resolvedUnoptimized) {
            setForceUnoptimized(true);
            return;
          }
          setFailed(true);
          onError?.(event);
          return;
        }
        onLoad?.(event);
      }}
    />
  );
}
