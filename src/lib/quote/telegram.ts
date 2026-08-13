import {
  buildTelegramMediaGroupForm,
  buildTelegramPhotoForm,
  type QuoteImage,
} from "./images.ts";

export type QuoteTelegramFields = {
  name: string;
  phone: string;
  email: string;
  who: string;
  task: string;
  message: string;
};

export type TelegramTransport = {
  fetch?: typeof fetch;
};

export class TelegramConfigError extends Error {
  constructor(message = "Telegram credentials are not configured") {
    super(message);
    this.name = "TelegramConfigError";
  }
}

export class TelegramSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TelegramSendError";
  }
}

/** True when both server-only Telegram env vars are non-empty after trim. */
export function isTelegramConfigured(): boolean {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  return Boolean(token && chatId);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function formatQuoteMessage(
  payload: QuoteTelegramFields,
  imageCount = 0,
): string {
  const lines = [
    "<b>Ny forespørgsel</b>",
    "",
    `<b>Navn:</b> ${escapeHtml(payload.name)}`,
    `<b>Telefon:</b> ${escapeHtml(payload.phone)}`,
    `<b>E-mail:</b> ${escapeHtml(payload.email)}`,
    `<b>Jeg er:</b> ${escapeHtml(payload.who)}`,
    `<b>Opgave:</b> ${escapeHtml(payload.task)}`,
  ];
  if (payload.message) {
    lines.push("", `<b>Besked:</b>`, escapeHtml(payload.message));
  }
  if (imageCount > 0) {
    lines.push("", `<b>Billeder:</b> ${imageCount} (sendes herunder)`);
  }
  return lines.join("\n");
}

export async function sendQuoteToTelegram(
  payload: QuoteTelegramFields,
  images: readonly QuoteImage[] = [],
  transport: TelegramTransport = {},
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  const post = transport.fetch ?? fetch;

  if (!token || !chatId) {
    throw new TelegramConfigError();
  }

  let res: Response;
  try {
    res = await post(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatQuoteMessage(payload, images.length),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    throw new TelegramSendError("Telegram network error");
  }

  let data: { ok?: boolean; description?: string } = {};
  try {
    data = (await res.json()) as { ok?: boolean; description?: string };
  } catch {
    if (!res.ok) {
      throw new TelegramSendError(`Telegram HTTP ${res.status}`);
    }
    throw new TelegramSendError("Telegram returned invalid JSON");
  }

  if (!res.ok || !data.ok) {
    throw new TelegramSendError(
      data.description ?? `Telegram HTTP ${res.status}`,
    );
  }

  if (images.length === 1) {
    const photo = images[0];
    if (!photo) return;
    await postTelegramForm(
      post,
      token,
      "sendPhoto",
      buildTelegramPhotoForm(chatId, photo),
    );
    return;
  }

  if (images.length > 1) {
    await postTelegramForm(
      post,
      token,
      "sendMediaGroup",
      buildTelegramMediaGroupForm(chatId, images),
    );
  }
}

async function postTelegramForm(
  post: typeof fetch,
  token: string,
  method: "sendPhoto" | "sendMediaGroup",
  body: FormData,
): Promise<void> {
  let res: Response;
  try {
    res = await post(`https://api.telegram.org/bot${token}/${method}`, {
      method: "POST",
      body,
    });
  } catch {
    throw new TelegramSendError("Telegram network error");
  }

  let data: { ok?: boolean; description?: string } = {};
  try {
    data = (await res.json()) as { ok?: boolean; description?: string };
  } catch {
    if (!res.ok) {
      throw new TelegramSendError(`Telegram HTTP ${res.status}`);
    }
    throw new TelegramSendError("Telegram returned invalid JSON");
  }

  if (!res.ok || !data.ok) {
    throw new TelegramSendError(
      data.description ?? `Telegram HTTP ${res.status}`,
    );
  }
}
