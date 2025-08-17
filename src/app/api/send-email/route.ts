import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// 🔑 Load environment variables
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const secretKey = process.env.RECAPTCHA_SECRET_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

// Log configuration status (without exposing actual keys)
console.log('Config status:', {
  hasSiteKey: !!siteKey,
  hasSecretKey: !!secretKey,
  hasResendKey: !!resendApiKey,
});

if (!resendApiKey) {
  console.error("❌ Missing RESEND_API_KEY — email sending will fail.");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const rateLimiter = new RateLimiterMemory({
  points: 3, // Allow 3 requests
  duration: 1800, // Per 30 minutes
});

interface RequestBody {
  name: string;
  email: string;
  message: string;
  token: string;
}

// Handle CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  console.log(`[${new Date().toISOString()}] Received request from IP: ${ip}`);

  try {
    // ✅ Rate limiting
    try {
      await rateLimiter.consume(ip);
      console.log(`✅ Rate limit check passed for IP: ${ip}`);
    } catch (rateLimiterRes: unknown) {
      console.log(`❌ Rate limit exceeded for IP: ${ip}`);
      const msBeforeNext = typeof rateLimiterRes === 'object' && 
                          rateLimiterRes !== null && 
                          'msBeforeNext' in rateLimiterRes
        ? (rateLimiterRes as { msBeforeNext: number }).msBeforeNext
        : 1800000; // Default to 30 minutes
      
      const retrySecs = Math.ceil(msBeforeNext / 1000);
      return NextResponse.json(
        { error: `Rate limit exceeded. Try again in ${Math.ceil(retrySecs / 60)} minute(s).` },
        { status: 429, headers: corsHeaders }
      );
    }

    // Parse request body with timeout
    let bodyJson: RequestBody;
    try {
      const bodyText = await request.text();
      console.log('Raw request body length:', bodyText.length);
      bodyJson = JSON.parse(bodyText);
      console.log('✅ Successfully parsed request body');
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, email, message, token } = bodyJson;

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: "All fields (name, email, message) are required and cannot be empty" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('❌ Invalid email format:', email);
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Verify reCAPTCHA (only if configured)
    if (secretKey && token && token !== 'no-token') {
      try {
        console.log('🔒 Verifying reCAPTCHA...');
        
        const verifyController = new AbortController();
        const verifyTimeout = setTimeout(() => verifyController.abort(), 5000);
        
        const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
          signal: verifyController.signal
        });

        clearTimeout(verifyTimeout);
        const verifyData = await verifyRes.json();
        console.log('🔒 reCAPTCHA verification result:', { success: verifyData?.success });

        if (!verifyData?.success) {
          console.error('❌ reCAPTCHA verification failed:', verifyData);
          return NextResponse.json(
            { error: "reCAPTCHA verification failed. Please try again." },
            { status: 400, headers: corsHeaders }
          );
        }
        console.log('✅ reCAPTCHA verification passed');
      } catch (err) {
        console.error('❌ reCAPTCHA verification error:', err);
        if (err instanceof Error && err.name === 'AbortError') {
          return NextResponse.json(
            { error: "reCAPTCHA verification timed out. Please try again." },
            { status: 500, headers: corsHeaders }
          );
        }
        return NextResponse.json(
          { error: "reCAPTCHA verification failed due to network error." },
          { status: 500, headers: corsHeaders }
        );
      }
    } else {
      console.log('⚠️ Skipping reCAPTCHA verification - not configured or no token provided');
    }

    // ✅ Send email via Resend
    if (!resend) {
      console.error('❌ Email service not configured');
      return NextResponse.json(
        { error: "Email service not configured. Please contact the administrator." },
        { status: 500, headers: corsHeaders }
      );
    }

    try {
      console.log('📧 Sending email...');
      
      const emailController = new AbortController();
      const emailTimeout = setTimeout(() => emailController.abort(), 10000);
      
      const emailData = {
        from: "onboarding@resend.dev",
        to: "clonicalclone@gmail.com",
        subject: `New message from ${name.trim()}`,
        html: `
          <h2>New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name.trim()}</p>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #007cba; margin: 10px 0;">
            ${message.trim().replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>Sent from contact form at ${new Date().toISOString()}</small></p>
          <p><small>IP: ${ip}</small></p>
        `
      };

      const data = await resend.emails.send(emailData);
      clearTimeout(emailTimeout);
      
      console.log('✅ Email sent successfully:', { data });

      const processingTime = Date.now() - startTime;
      console.log(`⏱️ Request processed in ${processingTime}ms`);

      return NextResponse.json(
        { 
          success: true, 
          message: "Email sent successfully!",
          data // Return the full response object for debugging or further processing
        },
        { status: 200, headers: corsHeaders }
      );

    } catch (emailError: unknown) {
      console.error('❌ Email sending error:', emailError);
      
      let errorMessage = "Failed to send email. Please try again later.";
      
      if (emailError instanceof Error) {
        if (emailError.name === 'AbortError') {
          errorMessage = "Email sending timed out. Please try again.";
        } else if (emailError.message.includes('401')) {
          errorMessage = "Email service authentication failed.";
        } else if (emailError.message.includes('403')) {
          errorMessage = "Email service access denied.";
        }
        console.error('Email error details:', emailError.message);
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          details: process.env.NODE_ENV === 'development' && emailError instanceof Error 
            ? emailError.message 
            : undefined
        },
        { status: 500, headers: corsHeaders }
      );
    }

  } catch (error: unknown) {
    console.error('❌ Unexpected server error:', error);
    
    const processingTime = Date.now() - startTime;
    console.log(`⏱️ Request failed after ${processingTime}ms`);

    return NextResponse.json(
      { 
        error: "Internal server error. Please try again later.",
        details: process.env.NODE_ENV === 'development' && error instanceof Error 
          ? error.message 
          : undefined
      },
      { status: 500, headers: corsHeaders }
    );
  }
}