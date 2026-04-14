import { LegalContent } from "../_components/legal-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how JESA World Technology handles your data. Our privacy policy outlines how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <LegalContent title="Privacy Policy" updateDate={lastUpdated}>
      <p>
        At JESA World Technology, we are committed to protecting your privacy and ensuring the security of your personal data. 
        This Privacy Policy explains how we collect, use, and share information about you when you use our website and services.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information that you provide directly to us, such as when you create an account, subscribe to our training 
        programs, or contact us for I.T. consulting services. This may include:
      </p>
      <ul>
        <li>Name and contact information (email, phone number)</li>
        <li>Account credentials (hashed passwords)</li>
        <li>Payment information (processed securely through third-party providers)</li>
        <li>Professional information (if applying for jobs)</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use the information we collect to:
      </p>
      <ul>
        <li>Provide, maintain, and improve our services and training platform</li>
        <li>Process transactions and send related information</li>
        <li>Respond to your comments, questions, and requests</li>
        <li>Send technical notices, updates, and security alerts</li>
        <li>Monitor and analyze trends and usage in connection with our services</li>
      </ul>

      <h2>3. Data Protection (NDPR/GDPR)</h2>
      <p>
        JESA World Technology adheres to the principles of the Nigeria Data Protection Regulation (NDPR) and other global standards 
        like GDPR where applicable. We implement appropriate technical and organizational measures to protect your data against 
        unauthorized access, alteration, or destruction.
      </p>

      <h2>4. Third-Party Sharing</h2>
      <p>
        We do not sell your personal data. We may share information with:
      </p>
      <ul>
        <li>Service providers who perform services on our behalf (e.g., payment processors, hosting providers)</li>
        <li>Professional advisors (lawyers, auditors)</li>
        <li>Law enforcement or regulatory authorities if required by law</li>
      </ul>

      <h2>5. Your Rights</h2>
      <p>
        Depending on your location, you may have the right to:
      </p>
      <ul>
        <li>Access, update, or delete the information we have on you</li>
        <li>Object to our processing of your personal data</li>
        <li>Request the transfer of your personal data</li>
        <li>Withdraw your consent at any time</li>
      </ul>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at:
        <br />
        <strong>privacy@jesaworldtech.com</strong>
      </p>
    </LegalContent>
  );
}
