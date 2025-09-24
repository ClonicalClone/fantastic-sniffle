import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const hcaptchaSecret = process.env.HCAPTCHA_SECRET_KEY;

// Email client
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Rate limit: 3 requests per 30 minutes per IP
const rateLimiter = new RateLimiterMemory({ points: 3, duration: 1800 });

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

interface RequestBody {
  name: string;
  email: string;
  message: string;
  token: string;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";
    await rateLimiter.consume(ip);

    const body: RequestBody = await req.json();
    const { name, email, message, token } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim() || !token) {
      return NextResponse.json(
        { error: "All fields and CAPTCHA are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Verify hCaptcha
    const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: hcaptchaSecret!,
        response: token,
      }),
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      return NextResponse.json(
        { error: "CAPTCHA verification failed" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Send email
    if (!resend) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500, headers: corsHeaders }
      );
    }

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "clonicalclone@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <h2>Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div>${message.replace(/\n/g, "<br>")}</div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200, headers: corsHeaders }
    );
  }  catch (err: unknown) {
  if (err instanceof Error && err.message.includes("RateLimiter")) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      { status: 429, headers: corsHeaders }
    );
  }

  const message =
    err instanceof Error ? err.message : "Internal server error";

  return NextResponse.json(
    { error: message },
    { status: 500, headers: corsHeaders }
  );
}

}
