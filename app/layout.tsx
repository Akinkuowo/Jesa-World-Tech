import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  // ... (metadata stays same)
  title: "JESA World Technology | I.T. Solutions & Digital Innovation",
  description: "JESA World Technology is a leading I.T. firm delivering cutting-edge software development, cloud solutions, cybersecurity, and IT consulting services to businesses across Africa and beyond.",
  keywords: "IT firm, software development, cloud solutions, cybersecurity, IT consulting, data analytics, Nigeria, Africa",
  authors: [{ name: "JESA World Technology" }],
  openGraph: {
    title: "JESA World Technology | I.T. Solutions & Digital Innovation",
    description: "Leading I.T. firm delivering cutting-edge technology solutions across Africa and beyond.",
    type: "website",
  },
};

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
        </AuthProvider>
      </body>
    </html>
  );
}

