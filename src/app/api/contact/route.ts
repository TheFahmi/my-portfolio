import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { headers } from 'next/headers';

// In-memory rate limiter (resets on cold start, fine for Vercel serverless)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3; // max 3 emails per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

// Cleanup old entries periodically (prevent memory leak)
function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap) {
    if (now > value.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not set — skipping CAPTCHA verification');
    return true; // Allow in dev/unconfigured environments
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
        remoteip: ip,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification failed:', error);
    return false;
  }
}

function sanitizeInput(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(request: Request) {
  try {
    // Cleanup old rate limit entries
    cleanupRateLimitMap();

    // Get client IP
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message, turnstileToken } = body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Verify Turnstile CAPTCHA
    const captchaValid = await verifyTurnstile(turnstileToken || '', ip);
    if (!captchaValid) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed. Please try again.' },
        { status: 403 }
      );
    }

    // Sanitize inputs for HTML email
    const safeName = sanitizeInput(name);
    const safeEmail = sanitizeInput(email);
    const safeSubject = sanitizeInput(subject);
    const safeMessage = sanitizeInput(message);

    // Configure nodemailer with Merdu SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.merdu.id',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: (process.env.SMTP_PORT === '465'), // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER || 'noreply@merdu.id',
        pass: process.env.SMTP_PASS || '',
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certs on Mailcow
      },
    });

    // Email content
    const mailOptions = {
      from: `"mfah.me Contact" <${process.env.SMTP_USER || 'noreply@merdu.id'}>`,
      to: process.env.CONTACT_EMAIL || 'hello.fahmihassan@gmail.com',
      replyTo: email,
      subject: `[mfah.me] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a1a1a, #111); padding: 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
            <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #ffffff;">New Contact Form Submission</h2>
            <p style="margin: 8px 0 0; font-size: 14px; color: #888;">from mfah.me portfolio</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; color: #fff; font-size: 15px;">${safeName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; color: #fff; font-size: 15px;"><a href="mailto:${safeEmail}" style="color: #60a5fa; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; vertical-align: top;">Subject</td>
                <td style="padding: 12px 0; color: #fff; font-size: 15px;">${safeSubject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 20px; background-color: #111; border-left: 3px solid #3b82f6; border-radius: 8px;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; color: #e5e5e5; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #555;">Sent from mfah.me contact form • IP: ${ip}</p>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const errStack = error instanceof Error ? error.stack : '';
    console.log('[CONTACT API ERROR]', errMsg);
    console.log('[CONTACT API STACK]', errStack);
    console.log('[CONTACT API ENV CHECK] SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET', 'SMTP_USER:', process.env.SMTP_USER || 'NOT SET', 'SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'NOT SET');
    return NextResponse.json(
      { error: 'Failed to send email', details: errMsg },
      { status: 500 }
    );
  }
}
