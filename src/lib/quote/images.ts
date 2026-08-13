/** Lead-form photo limits — stay under Vercel’s ~4.5 MB request body. */
export const MAX_QUOTE_IMAGES = 5;
export const MAX_QUOTE_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_QUOTE_IMAGES_TOTAL_BYTES = 4 * 1024 * 1024;

export type QuoteImage = {
  filename: string;
  type: string;
  bytes: Uint8Array;
};

export type QuoteImageError = "too_many" | "too_large" | "total_too_large" | "bad_type";

export function isQuoteImageError(error: string | undefined): error is QuoteImageError {
  return (
    error === "too_many" ||
    error === "too_large" ||
    error === "total_too_large" ||
    error === "bad_type"
  );
}

export type QuoteImageType = "jpeg" | "png" | "webp";

const MIME: Record<QuoteImageType, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export function sniffImageType(bytes: Uint8Array): QuoteImageType | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "png";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  return null;
}

export function validateQuoteImages(
  files: readonly QuoteImage[],
): { ok: true; images: QuoteImage[] } | { ok: false; error: QuoteImageError } {
  if (files.length > MAX_QUOTE_IMAGES) {
    return { ok: false, error: "too_many" };
  }

  let total = 0;
  const images: QuoteImage[] = [];

  for (const file of files) {
    if (file.bytes.byteLength > MAX_QUOTE_IMAGE_BYTES) {
      return { ok: false, error: "too_large" };
    }
    total += file.bytes.byteLength;
    if (total > MAX_QUOTE_IMAGES_TOTAL_BYTES) {
      return { ok: false, error: "total_too_large" };
    }
    const kind = sniffImageType(file.bytes);
    if (!kind) {
      return { ok: false, error: "bad_type" };
    }
    images.push({
      filename: safeFilename(file.filename, kind),
      type: MIME[kind],
      bytes: file.bytes,
    });
  }

  return { ok: true, images };
}

export async function filesToQuoteImages(files: readonly File[]): Promise<QuoteImage[]> {
  return Promise.all(
    files.map(async (file) => ({
      filename: file.name || "image",
      type: file.type,
      bytes: new Uint8Array(await file.arrayBuffer()),
    })),
  );
}

/** Telegram sendPhoto (one image). */
export function buildTelegramPhotoForm(chatId: string, image: QuoteImage): FormData {
  const form = new FormData();
  form.set("chat_id", chatId);
  form.set("photo", imageFile(image));
  return form;
}

/** Telegram sendMediaGroup (2–10 photos as an album). */
export function buildTelegramMediaGroupForm(chatId: string, images: readonly QuoteImage[]): FormData {
  const form = new FormData();
  form.set("chat_id", chatId);
  const media = images.map((image, i) => {
    const attach = `file${i}`;
    form.set(attach, imageFile(image));
    return { type: "photo", media: `attach://${attach}` };
  });
  form.set("media", JSON.stringify(media));
  return form;
}

function imageFile(image: QuoteImage): File {
  const copy = new Uint8Array(image.bytes.byteLength);
  copy.set(image.bytes);
  return new File([copy], image.filename, { type: image.type });
}

function safeFilename(name: string, kind: QuoteImageType): string {
  const base = name.replace(/\\/g, "/").split("/").pop()?.trim() || "image";
  const stripped = base.replace(/[^\w.\-()+ ]+/g, "_").slice(0, 80);
  const ext = kind === "jpeg" ? ".jpg" : `.${kind}`;
  if (/\.(jpe?g|png|webp)$/i.test(stripped)) return stripped;
  return `${stripped}${ext}`;
}
