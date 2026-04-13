import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendContactInquiryEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    // Save to database
    const inquiry = await db.contactInquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        subject: subject.trim(),
        message: message.trim(),
      },
    });

    // Send email notification
    try {
      await sendContactInquiryEmail(
        name.trim(),
        email.trim().toLowerCase(),
        subject.trim(),
        message.trim(),
        phone?.trim()
      );
    } catch (emailError) {
      console.error("[CONTACT_EMAIL_ERROR]", emailError);
      // We don't return an error response here because the data is already saved to the DB
    }

    return NextResponse.json(
      { success: true, id: inquiry.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("[CONTACT_POST]", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "Contact API is running" });
}
