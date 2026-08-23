import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();
const KEY = "subscribers"; // hash: field = email, value = subscribe date (ISO)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    // Basic validation
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 },
      );
    }

    // hsetnx only writes when the field is new, so it dedupes by email and
    // lets us tell the client whether they were already subscribed.
    const added = await redis.hsetnx(KEY, email, new Date().toISOString());

    return NextResponse.json({ ok: true, already: added === 0 });
  } catch (err) {
    console.error("/api/subscribe error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
