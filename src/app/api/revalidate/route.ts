import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { isAuthorizedWebhook, SIGNATURE_HEADER_NAME } from "@/lib/sanity/webhook";

/* Target for the Sanity GROQ-powered webhook (fires on publish/unpublish/
   delete of any document). Every sanityFetch is tagged "sanity" (see
   lib/sanity/fetch.ts), so one revalidateTag refreshes the whole site on
   the next request. The signature is an HMAC over the exact raw bytes —
   read text, never parse-then-restringify. */
export async function POST(req: Request) {
  const body = await req.text();
  const authorized = await isAuthorizedWebhook(
    body,
    req.headers.get(SIGNATURE_HEADER_NAME),
    process.env.SANITY_REVALIDATE_SECRET,
  );
  if (!authorized) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }
  // Next 16 signature: the "max" profile expires the tag immediately.
  revalidateTag("sanity", "max");
  return NextResponse.json({ revalidated: true });
}
