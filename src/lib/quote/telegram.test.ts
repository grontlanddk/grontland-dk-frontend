import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { sendQuoteToTelegram } from "./telegram.ts";
import type { QuoteImage } from "./images.ts";

const payload = {
  name: "Anna",
  phone: "91700103",
  email: "anna@example.dk",
  who: "Privatkunde",
  task: "Havearbejde",
  message: "Ny terrasse",
};

function jpeg(): QuoteImage {
  const bytes = new Uint8Array(16);
  bytes[0] = 0xff;
  bytes[1] = 0xd8;
  bytes[2] = 0xff;
  return { filename: "shot.jpg", type: "image/jpeg", bytes };
}

afterEach(() => {
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
});

function mockOk() {
  const calls: { url: string; body: BodyInit | null | undefined }[] = [];
  const fetchMock: typeof fetch = async (url, init) => {
    calls.push({ url: String(url), body: init?.body ?? null });
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };
  return { calls, fetchMock };
}

test("sendQuoteToTelegram sends only sendMessage when there are no photos", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "tok";
  process.env.TELEGRAM_CHAT_ID = "-1001";
  const { calls, fetchMock } = mockOk();
  await sendQuoteToTelegram(payload, [], { fetch: fetchMock });
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /\/sendMessage$/);
});

test("sendQuoteToTelegram sends sendPhoto after the text for one image", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "tok";
  process.env.TELEGRAM_CHAT_ID = "-1001";
  const { calls, fetchMock } = mockOk();
  await sendQuoteToTelegram(payload, [jpeg()], { fetch: fetchMock });
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /\/sendMessage$/);
  assert.match(calls[1].url, /\/sendPhoto$/);
  assert.ok(calls[1].body instanceof FormData);
  assert.equal((calls[1].body as FormData).get("chat_id"), "-1001");
});

test("sendQuoteToTelegram sends sendMediaGroup after the text for several images", async () => {
  process.env.TELEGRAM_BOT_TOKEN = "tok";
  process.env.TELEGRAM_CHAT_ID = "-1001";
  const { calls, fetchMock } = mockOk();
  await sendQuoteToTelegram(payload, [jpeg(), jpeg()], { fetch: fetchMock });
  assert.equal(calls.length, 2);
  assert.match(calls[0].url, /\/sendMessage$/);
  assert.match(calls[1].url, /\/sendMediaGroup$/);
  const media = JSON.parse(String((calls[1].body as FormData).get("media")));
  assert.equal(media.length, 2);
  assert.equal(media[0].type, "photo");
});
