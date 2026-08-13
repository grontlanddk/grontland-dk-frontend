import assert from "node:assert/strict";
import { test } from "node:test";

import {
  MAX_QUOTE_IMAGES,
  MAX_QUOTE_IMAGE_BYTES,
  MAX_QUOTE_IMAGES_TOTAL_BYTES,
  sniffImageType,
  validateQuoteImages,
  type QuoteImage,
} from "./images.ts";

function jpeg(bytes = 32): QuoteImage {
  const buf = new Uint8Array(bytes);
  buf[0] = 0xff;
  buf[1] = 0xd8;
  buf[2] = 0xff;
  return { filename: "shot.jpg", type: "image/jpeg", bytes: buf };
}

function png(bytes = 32): QuoteImage {
  const buf = new Uint8Array(bytes);
  buf.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return { filename: "shot.png", type: "image/png", bytes: buf };
}

function webp(bytes = 32): QuoteImage {
  const buf = new Uint8Array(bytes);
  buf.set([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]);
  return { filename: "shot.webp", type: "image/webp", bytes: buf };
}

test("sniffImageType reads jpeg png and webp magic bytes", () => {
  assert.equal(sniffImageType(jpeg().bytes), "jpeg");
  assert.equal(sniffImageType(png().bytes), "png");
  assert.equal(sniffImageType(webp().bytes), "webp");
});

test("sniffImageType rejects empty buffers and non-images", () => {
  assert.equal(sniffImageType(new Uint8Array()), null);
  const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46]);
  assert.equal(sniffImageType(pdf), null);
});

test("validateQuoteImages accepts an empty list", () => {
  assert.deepEqual(validateQuoteImages([]), { ok: true, images: [] });
});

test("validateQuoteImages accepts mixed jpeg png webp up to the max count", () => {
  const images = [jpeg(), png(), webp()];
  const result = validateQuoteImages(images);
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.images.length, 3);
});

test("validateQuoteImages rejects more than MAX_QUOTE_IMAGES", () => {
  const images = Array.from({ length: MAX_QUOTE_IMAGES + 1 }, () => jpeg());
  assert.deepEqual(validateQuoteImages(images), { ok: false, error: "too_many" });
});

test("validateQuoteImages rejects a file over MAX_QUOTE_IMAGE_BYTES", () => {
  assert.deepEqual(validateQuoteImages([jpeg(MAX_QUOTE_IMAGE_BYTES + 1)]), {
    ok: false,
    error: "too_large",
  });
});

test("validateQuoteImages rejects a total payload over MAX_QUOTE_IMAGES_TOTAL_BYTES", () => {
  const chunk = Math.floor(MAX_QUOTE_IMAGES_TOTAL_BYTES / 3) + 1;
  assert.ok(chunk <= MAX_QUOTE_IMAGE_BYTES);
  assert.deepEqual(validateQuoteImages([jpeg(chunk), jpeg(chunk), jpeg(chunk)]), {
    ok: false,
    error: "total_too_large",
  });
});

test("validateQuoteImages rejects files whose magic bytes are not an image", () => {
  const fake: QuoteImage = {
    filename: "notes.txt",
    type: "image/jpeg",
    bytes: new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]),
  };
  assert.deepEqual(validateQuoteImages([fake]), { ok: false, error: "bad_type" });
});
