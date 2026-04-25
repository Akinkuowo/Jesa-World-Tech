import { LegalContent } from "../_components/legal-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies Policy",
  description: "Understand how JESA World Technology uses cookies and similar tracking technologies to improve your experience on our platform.",
};

export default function CookiesPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <LegalContent title="Cookies Policy" updateDate={lastUpdated}>
      <p>
        This Cookies Policy explains how JESA World Technology uses cookies and similar technologies to recognize you when 
        you visit our website. It explains what these technologies are and why we use them.
      </p>

      <h2>1. What are Cookies?</h2>
      <p>
        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are 
        widely used by website owners in order to make their websites work, or to work more efficiently, as well as to 
        provide reporting information.
      </p>

      <h2>2. Why We Use Cookies</h2>
      <p>
        We use first-party and third-party cookies for several reasons:
      </p>
      <ul>
        <li><strong>Essential Cookies:</strong> These are necessary for the website to function (e.g., authentication, security).</li>
        <li><strong>Analytics Cookies:</strong> These help us understand how visitors interact with our site, allowing us to improve the user experience.</li>
        <li><strong>Preference Cookies:</strong> These allow the website to remember choices you make (such as your language or region).</li>
      </ul>

      <h2>3. Types of Cookies We Use</h2>
      <ol>
        <li><strong>Session Cookies:</strong> Temporary cookies that expire once you close your browser.</li>
        <li><strong>Persistent Cookies:</strong> These remain on your device for a set period or until you delete them.</li>
        <li><strong>Authentication Cookies:</strong> To keep you logged into our training platform.</li>
      </ol>

      <h2>4. How Can You Control Cookies?</h2>
      <p>
        Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability 
        of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized 
        to you.
      </p>
      <ul>
        <li>To find out more about cookies, including how to see what cookies have been set, visit <strong>www.aboutcookies.org</strong>.</li>
        <li>You can choose to opt-out of analytics tracking through your browser&apos;s &quot;Do Not Track&quot; settings or specific opt-out tools provided by analytics providers.</li>
      </ul>

      <h2>5. Updates to This Policy</h2>
      <p>
        We may update this Cookies Policy from time to time in order to reflect changes to the cookies we use or for other 
        operational, legal, or regulatory reasons.
      </p>

      <h2>6. More Information</h2>
      <p>
        If you have any questions about our use of cookies or other technologies, please email us at:
        <br />
        <strong>privacy@jesaworldtech.com</strong>
      </p>
    </LegalContent>
  );
}
