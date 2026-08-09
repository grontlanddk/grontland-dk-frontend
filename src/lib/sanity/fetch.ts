import { client } from "./client";
import { urlForImage } from "./image";

/* Queries project image fields as {asset, crop, hotspot} (see IMG_SRC in
   queries.ts). This walk replaces each with a sized Sanity CDN URL
   (width + auto format), so crops apply and Vercel Image Optimization is
   not needed for CMS photos. Consumers keep the plain string `src` shape.
   Only image fields carry an `asset` key in this dataset, so the shape
   test is safe. */
function resolveImageUrls<T>(node: T): T {
  if (Array.isArray(node)) return node.map(resolveImageUrls) as T;
  if (node && typeof node === "object") {
    if ("asset" in node) {
      const img = node as { asset?: { _ref?: string } | null };
      return (img.asset ? urlForImage(img, { width: 1920 }).url() : null) as T;
    }
    return Object.fromEntries(
      Object.entries(node).map(([k, v]) => [k, resolveImageUrls(v)]),
    ) as T;
  }
  return node;
}

/* All CMS reads go through here: hourly time-based revalidation site-wide
   plus the shared "sanity" tag, so a future webhook route can
   revalidateTag("sanity") for instant updates. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const result = await client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags: ["sanity"] },
  });
  return resolveImageUrls(result);
}
