import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export { SIGNATURE_HEADER_NAME };

/* True only when a secret is configured AND the signature matches the raw
   request body. Missing secret rejects everything: a deploy without the env
   var must fail closed, not open. */
export async function isAuthorizedWebhook(
  body: string,
  signature: string | null,
  secret: string | undefined,
): Promise<boolean> {
  if (!secret || !signature) return false;
  return isValidSignature(body, signature, secret);
}
