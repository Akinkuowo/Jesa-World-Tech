import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://jesaworldtech.com"),
  title: {
    default: "JESA World Technology | I.T. Solutions & Digital Innovation",
    template: "%s | JESA World Technology"
  },
  description: "JESA World Technology is a leading I.T. firm delivering cutting-edge software development, cloud solutions, cybersecurity, and IT consulting services to businesses across Africa and beyond.",
  keywords: ["IT firm", "software development", "cloud solutions", "cybersecurity", "IT consulting", "data analytics", "Nigeria", "Africa", "JESA World", "Digital Innovation"],
  authors: [{ name: "JESA World Technology", url: "https://jesaworldtech.com" }],
  creator: "JESA World Technology",
  publisher: "JESA World Technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "JESA World Technology | I.T. Solutions & Digital Innovation",
    description: "Leading I.T. firm delivering cutting-edge technology solutions across Africa and beyond.",
    url: "https://jesaworldtech.com",
    siteName: "JESA World Technology",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JESA World Technology | I.T. Solutions & Digital Innovation",
    description: "Leading I.T. firm delivering cutting-edge technology solutions across Africa and beyond.",
    creator: "@jesaworldtech",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { CookieBanner } from "@/components/cookie-banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <AuthProvider>
          <ConfettiProvider />
          <ToastProvider />
          {children}
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}

