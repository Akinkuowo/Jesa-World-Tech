import { Resend } from "resend";
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY || "missing_api_key");

// SMTP Transporter for contact form (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Use a fallback domain if you haven't verified a domain on Resend.
// For testing on the free tier, you must use onboarding@resend.dev and send *to* your own email.
const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const fromEmail = "Auth <onboarding@resend.dev>"; // Replace with your domain when verified (e.g., support@yourdomain.com)

export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY is not defined. Email link generated: ", confirmLink);
    return;
  }

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Confirm your email - JESA World Technology",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to JESA World Technology!</h2>
        <p>Please click the button below to verify your email address and complete your registration.</p>
        <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; background-color: #0E2954; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">
          Confirm Email
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          If you didn't request this email, you can safely ignore it.
        </p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (
  email: string,
  token: string
) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY is not defined. Password reset link generated: ", resetLink);
    return;
  }

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Reset your password - JESA World Technology",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to proceed.</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #0E2954; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>
    `,
  });
};

export const sendContactInquiryEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string,
  phone?: string | null
) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("⚠️ SMTP credentials not found. Email suppression for: ", subject);
    return;
  }

  const mailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: "jesaworldtech@gmail.com",
    replyTo: email,
    subject: `New Inquiry: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; line-height: 1.6;">
        <h2 style="color: #0E2954;">New Contact Form Submission</h2>
        <p>You have received a new message from the contact form on JESA World Technology.</p>
        
        <div style="background-color: #f4f7fa; padding: 20px; border-radius: 10px; margin-top: 20px;">
          <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="margin-top: 25px; font-size: 12px; color: #666;">
          This email was sent via Gmail SMTP for JESA World Technology.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

