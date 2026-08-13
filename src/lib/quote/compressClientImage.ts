/** Browser-only: shrink large camera photos before POST so we stay under Vercel’s body limit. */
const MAX_EDGE = 1600;
const JPEG_QUALITY = 0.82;
const SKIP_UNDER_BYTES = 700_000;

export async function compressClientImage(file: File): Promise<File> {
  if (file.size <= SKIP_UNDER_BYTES && file.type === "image/jpeg") {
    return file;
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return file;
  }

  try {
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
    });
    if (!blob || blob.size >= file.size) return file;
    const name = file.name.replace(/\.[^.]+$/u, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } finally {
    bitmap.close();
  }
}
