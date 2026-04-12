import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "missing_api_key");

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

