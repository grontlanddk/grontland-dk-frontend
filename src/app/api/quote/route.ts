import { NextResponse } from "next/server";

import { quoteFormSchema } from "@/lib/quote/schema";
import {
  filesToQuoteImages,
  validateQuoteImages,
} from "@/lib/quote/images";
import {
  isTelegramConfigured,
  sendQuoteToTelegram,
  TelegramConfigError,
  TelegramSendError,
} from "@/lib/quote/telegram";

function isConfigError(err: unknown): boolean {
  return (
    err instanceof TelegramConfigError ||
    (err instanceof Error && err.name === "TelegramConfigError")
  );
}

function isSendError(err: unknown): boolean {
  return (
    err instanceof TelegramSendError ||
    (err instanceof Error && err.name === "TelegramSendError")
  );
}

function field(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

async function readSubmission(request: Request): Promise<
  | { ok: true; fields: unknown; imageFiles: File[] }
  | { ok: false; status: number; error: string }
> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return { ok: false, status: 400, error: "invalid_json" };
    }
    const imageFiles = form
      .getAll("images")
      .filter((value): value is File => value instanceof File && value.size > 0);
    return {
      ok: true,
      fields: {
        name: field(form, "name"),
        phone: field(form, "phone"),
        email: field(form, "email"),
        who: field(form, "who"),
        task: field(form, "task"),
        message: field(form, "message"),
        website: field(form, "website"),
      },
      imageFiles,
    };
  }

  try {
    return { ok: true, fields: await request.json(), imageFiles: [] };
  } catch {
    return { ok: false, status: 400, error: "invalid_json" };
  }
}

export async function POST(request: Request) {
  const submitted = await readSubmission(request);
  if (!submitted.ok) {
    return NextResponse.json(
      { ok: false, error: submitted.error },
      { status: submitted.status },
    );
  }

  const parsed = quoteFormSchema.safeParse(submitted.fields);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const { website, ...payload } = parsed.data;

  // Honeypot: pretend success so bots do not retry.
  if (website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const rawImages = await filesToQuoteImages(submitted.imageFiles);
  const images = validateQuoteImages(rawImages);
  if (!images.ok) {
    return NextResponse.json({ ok: false, error: images.error }, { status: 400 });
  }

  // Missing / blank TELEGRAM_* — pages still render; submit gets a clear 503.
  if (!isTelegramConfigured()) {
    console.warn("[api/quote] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  try {
    await sendQuoteToTelegram(payload, images.images);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (isConfigError(err)) {
      console.warn("[api/quote] Telegram credentials missing at send time");
      return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
    }
    if (isSendError(err)) {
      console.error("[api/quote] Telegram delivery failed");
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
    console.error("[api/quote] Unexpected error");
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }
}
