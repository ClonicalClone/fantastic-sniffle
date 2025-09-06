import { NextRequest, NextResponse } from "next/server";
import { createChallenge } from "altcha-lib";
import { webcrypto } from "node:crypto";

// Only set crypto if missing
if (!("crypto" in globalThis)) {
  (globalThis as any).crypto = webcrypto;
}

const HMAC_KEY = process.env.ALTCHA_HMAC_KEY || "dummy_hmac_key";

export async function GET(req: NextRequest) {
  try {
    const challenge = await createChallenge({
      hmacKey: HMAC_KEY,
      maxnumber: 100000,
    });

    return NextResponse.json(challenge);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
