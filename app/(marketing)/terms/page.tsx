import { LegalContent } from "../_components/legal-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the JESA World Technology Terms of Service. This document governs your use of our website, training platform, and professional I.T. services.",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <LegalContent title="Terms of Service" updateDate={lastUpdated}>
      <p>
        Welcome to JESA World Technology. By accessing or using our website, training platform, and professional services,
        you agree to be bound by these Terms of Service.
      </p>

      <h2>1. Use of Services</h2>
      <p>
        You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for:
      </p>
      <ul>
        <li>Maintaining the confidentiality of your account credentials</li>
        <li>Ensuring all information you provide is accurate and up-to-date</li>
        <li>Your conduct while using our platform and interactions with our team</li>
      </ul>

      <h2>2. Intellectual Property</h2>
      <p>
        All content on our platform, including training materials, software, designs, text, and logos, is the property of JESA
        World Technology and is protected by intellectual property laws. You are granted a limited, non-exclusive license to
        access our content for personal, non-commercial use during your subscription period.
      </p>

      <h2>3. Training & Subscriptions</h2>
      <p>
        Subscription to our training programs (beginner, intermediate, and advanced levels) provides access to specific content for the
        duration of the subscription. Unauthorized sharing of course materials or access codes is strictly prohibited and
        may lead to account termination without refund.
      </p>

      <h2>4. Professional IT Services</h2>
      <p>
        Specific terms for professional engagements (Cloud, Cybersecurity, Software Dev) will be governed by individual
        Service Level Agreements (SLAs) or master service contracts tailored to each project.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, JESA World Technology shall not be liable for any indirect, incidental,
        special, or consequential damages resulting from your use of our services or inability to use them.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to our services at our sole discretion, without notice,
        for conduct that we believe violates these Terms or is harmful to other users or our business interests.
      </p>

      <h2>7. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria,
        without regard to its conflict of law provisions.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on
        this page and updating the "Last Updated" date.
      </p>
    </LegalContent>
  );
}
