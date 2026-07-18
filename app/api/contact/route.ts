import { NextResponse } from "next/server";

export const runtime = "edge";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !message.trim() ||
    !isValidEmail(email)
  ) {
    return NextResponse.json({ error: "Please fill out all fields with a valid email." }, { status: 400 });
  }

  // Wire up an email provider (e.g. Resend, Postmark) or a CRM webhook here.
  // Keep this handler on the Edge runtime so it deploys as a Vercel Edge Function.
  console.log("New contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
