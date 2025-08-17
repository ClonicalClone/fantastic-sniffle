import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// 🔑 Load environment variables
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const secretKey = process.env.RECAPTCHA_SECRET_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

if (!siteKey || !secretKey) {
    console.warn("⚠️ Missing reCAPTCHA keys — verification will fail.");
}

if (!resendApiKey) {
    console.warn("⚠️ Missing RESEND_API_KEY — email sending will fail.");
}

const resend = new Resend(resendApiKey);

const rateLimiter = new RateLimiterMemory({
    points: 2,
    duration: 1800, // 30 minutes
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
};

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: corsHeaders,
    });
}

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        request.ip ||
        'unknown';

    console.log('Received request from IP:', ip);

    // ✅ Rate limiting
    try {
        await rateLimiter.consume(ip);
    } catch (rateLimiterRes: any) {
        const retrySecs = Math.ceil(rateLimiterRes.msBeforeNext / 1000);
        return NextResponse.json({
            error: `Rate limit exceeded. Try again in ${Math.ceil(retrySecs / 60)} minute(s).`
        }, {
            status: 429,
            headers: corsHeaders
        });
    }

    // Parse request body
    let bodyJson: RequestBody;
    try {
        bodyJson = await request.json();
        console.log('Parsed body:', bodyJson);
    } catch (parseError) {
        console.error('JSON parse error:', parseError);
        return NextResponse.json(
            { error: "Invalid JSON body" },
            {
                status: 400,
                headers: corsHeaders
            }
        );
    }

    const { name, email, message, token } = bodyJson;

    // Validate required fields
    if (!name || !email || !message) {
        return NextResponse.json(
            { error: "All fields (name, email, message) are required" },
            {
                status: 400,
                headers: corsHeaders
            }
        );
    }

    if (!token) {
        return NextResponse.json(
            { error: 'Missing reCAPTCHA token' },
            {
                status: 400,
                headers: corsHeaders
            }
        );
    }

    // ✅ Verify reCAPTCHA
    if (secretKey) {
        let verifyData: any;
        try {
            console.log('Verifying reCAPTCHA...');
            const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
            });
            verifyData = await verifyRes.json();
            console.log('reCAPTCHA verification result:', verifyData);
        } catch (err) {
            console.error('reCAPTCHA verification error:', err);
            return NextResponse.json(
                { error: "reCAPTCHA verification failed (network error)" },
                {
                    status: 500,
                    headers: corsHeaders
                }
            );
        }

        if (!verifyData?.success) {
            console.error('reCAPTCHA verification failed:', verifyData);
            return NextResponse.json(
                { error: "reCAPTCHA verification failed" },
                {
                    status: 400,
                    headers: corsHeaders
                }
            );
        }
    } else {
        console.warn('Skipping reCAPTCHA verification - no secret key');
    }

    // ✅ Send email via Resend
    if (!resendApiKey) {
        return NextResponse.json(
            { error: "Email service not configured" },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }

    try {
        console.log('Sending email...');
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "clonicalclone@gmail.com",
            subject: `New message from ${name}`,
            html: `
                <h2>New Contact Form Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><small>Sent from contact form</small></p>
            `,
        });

        console.log('Email sent successfully:', data);

        return NextResponse.json(
            { success: true, message: "Email sent successfully", data },
            {
                status: 200,
                headers: corsHeaders
            }
        );
    } catch (error: any) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            {
                error: "Failed to send email",
                details: error.message
            },
            {
                status: 500,
                headers: corsHeaders
            }
        );
    }
}