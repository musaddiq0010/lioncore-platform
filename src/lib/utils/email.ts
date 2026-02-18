import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@lioncore.com';
const FROM_NAME = process.env.FROM_NAME || 'LionCore Platform';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}

export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const verificationUrl = `${APP_URL}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Verify Your Email - LionCore Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #B91C1C 0%, #991B1B 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">LionCore Platform</h1>
          <p style="color: #FCD34D; margin: 10px 0 0 0;">The Fearless Lion: Vision, Courage, Progress</p>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1F2937;">Welcome to the Movement!</h2>
          <p style="color: #4B5563; line-height: 1.6;">
            Thank you for joining Hon. Abdulazeez Izuafa's campaign. Please verify your email address to complete your registration.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background: #B91C1C; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #6B7280; font-size: 14px;">
            Or copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #B91C1C;">${verificationUrl}</a>
          </p>
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px; border-top: 1px solid #E5E7EB; padding-top: 20px;">
            This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
        <div style="background: #F9FAFB; padding: 20px; text-align: center; color: #6B7280; font-size: 12px;">
          <p>© 2024 LionCore Platform. All rights reserved.</p>
          <p>Hon. Abdulazeez Izuafa Campaign - APC, Estako West LGA, Edo State</p>
        </div>
      </div>
    `,
    text: `
Welcome to LionCore Platform!

Thank you for joining Hon. Abdulazeez Izuafa's campaign. Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire in 24 hours.

© 2024 LionCore Platform
Hon. Abdulazeez Izuafa Campaign - APC, Estako West LGA, Edo State
    `,
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const resetUrl = `${APP_URL}/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Password Reset - LionCore Platform',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #B91C1C 0%, #991B1B 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">LionCore Platform</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1F2937;">Password Reset Request</h2>
          <p style="color: #4B5563; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #B91C1C; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #6B7280; font-size: 14px;">
            Or copy and paste this link:<br>
            <a href="${resetUrl}" style="color: #B91C1C;">${resetUrl}</a>
          </p>
          <p style="color: #6B7280; font-size: 12px; margin-top: 30px;">
            This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
          </p>
        </div>
      </div>
    `,
    text: `
Password Reset Request

We received a request to reset your password. Click the link below to create a new password:

${resetUrl}

This link will expire in 1 hour.
    `,
  });
}

export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: 'Welcome to LionCore Platform!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #B91C1C 0%, #991B1B 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">LionCore Platform</h1>
          <p style="color: #FCD34D; margin: 10px 0 0 0;">The Fearless Lion: Vision, Courage, Progress</p>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1F2937;">Welcome, ${name}!</h2>
          <p style="color: #4B5563; line-height: 1.6;">
            Your email has been verified and you're now part of the movement for progress in Estako West LGA.
          </p>
          <div style="background: #FEF3C7; border-left: 4px solid #F59E0B; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #92400E;">
              <strong>What's Next?</strong><br>
              • Complete your profile<br>
              • Explore your supporter portal<br>
              • RSVP to upcoming events<br>
              • Invite friends to join
            </p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${APP_URL}/portal" 
               style="background: #B91C1C; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
              Go to Portal
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

export async function sendEventReminderEmail(
  email: string,
  eventTitle: string,
  eventDate: string,
  eventLocation: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: `Reminder: ${eventTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #B91C1C; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Event Reminder</h1>
        </div>
        <div style="padding: 30px; background: #ffffff;">
          <h2 style="color: #1F2937;">${eventTitle}</h2>
          <p style="color: #4B5563;">
            <strong>Date:</strong> ${eventDate}<br>
            <strong>Location:</strong> ${eventLocation}
          </p>
          <p style="color: #4B5563; line-height: 1.6;">
            We're looking forward to seeing you at this event. Your participation helps strengthen our movement!
          </p>
        </div>
      </div>
    `,
  });
}
