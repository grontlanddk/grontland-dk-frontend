import assert from "node:assert/strict";
import { test } from "node:test";
import { createHmac } from "node:crypto";

import { isAuthorizedWebhook } from "./webhook.ts";

const SECRET = "test-secret";

function sign(body: string, secret: string, ts = Date.now()): string {
  const mac = createHmac("sha256", secret)
    .update(`${ts}.${body}`)
    .digest("base64url");
  return `t=${ts},v1=${mac}`;
}

test("accepts a request signed with the configured secret", async () => {
  const body = JSON.stringify({ _id: "abc", _type: "project" });
  assert.equal(await isAuthorizedWebhook(body, sign(body, SECRET), SECRET), true);
});

test("rejects a signature made with a different secret", async () => {
  const body = JSON.stringify({ _id: "abc", _type: "project" });
  assert.equal(await isAuthorizedWebhook(body, sign(body, "wrong"), SECRET), false);
});

test("rejects a tampered body", async () => {
  const body = JSON.stringify({ _id: "abc", _type: "project" });
  const sig = sign(body, SECRET);
  assert.equal(await isAuthorizedWebhook(body + " ", sig, SECRET), false);
});

test("rejects when the signature header is missing", async () => {
  assert.equal(await isAuthorizedWebhook("{}", null, SECRET), false);
});

test("rejects everything when the secret is not configured", async () => {
  const body = "{}";
  assert.equal(await isAuthorizedWebhook(body, sign(body, SECRET), undefined), false);
});
