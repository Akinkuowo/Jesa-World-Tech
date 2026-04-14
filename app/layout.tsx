import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { ToastProvider } from "@/components/providers/toaster-provider";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import { db } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  // Use safe access to prevent crash if Prisma client is stale
  const config = await (db as any).sEOConfig?.findUnique({
    where: { id: "default" }
  }).catch(() => null);

  const titleTemplate = config?.titleTemplate || "%s | JESA World Technology";
  const defaultTitle = config?.defaultTitle || "JESA World Technology | I.T. Solutions";
  const description = config?.description || "Leading I.T. firm delivering cutting-edge software development and cloud solutions.";

  return {
    metadataBase: new URL("https://jesaworldtech.com"),
    title: {
      default: defaultTitle,
      template: titleTemplate
    },
    description: description,
    keywords: config?.keywords.split(",") || ["IT firm", "software development"],
    authors: [{ name: "JESA World Technology", url: "https://jesaworldtech.com" }],
    creator: "JESA World Technology",
    publisher: "JESA World Technology",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: defaultTitle,
      description: description,
      url: "https://jesaworldtech.com",
      siteName: "JESA World Technology",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: description,
      creator: config?.twitterHandle || "@jesaworldtech",
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
  };
}

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

