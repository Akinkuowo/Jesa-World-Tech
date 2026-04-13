const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function testSend() {
  try {
    console.log("Attempting to send test email to jesaworldtech@gmail.com...");
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "jesaworldtech@gmail.com",
      subject: "Resend Test",
      html: "<p>Test email</p>"
    });

    if (error) {
      console.error("Resend Error:", error);
    } else {
      console.log("Resend Success:", data);
    }
  } catch (err) {
    console.error("Request Error:", err.message);
  }
}

testSend();
