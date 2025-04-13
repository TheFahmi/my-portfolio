import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure nodemailer with environment variables
    // In production, use real SMTP credentials from environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Boolean(process.env.SMTP_SECURE) || false,
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'your-password',
      },
    });

    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
      to: process.env.CONTACT_EMAIL || 'hello.fahmihassan@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-left: 4px solid #2563eb; border-radius: 4px;">
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\\n/g, '<br>')}</p>
          </div>
          <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">This email was sent from your portfolio website contact form.</p>
        </div>
      `,
    };

    // For development, log the email instead of sending it
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent with:', mailOptions);
      return NextResponse.json({ success: true, message: 'Email logged (development mode)' });
    }

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    );
  }
}
