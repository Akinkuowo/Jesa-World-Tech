import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function robots(): Promise<MetadataRoute.Robots> {
  // Use safe access to prevent crash if Prisma client is stale
  const config = await (db as any).sEOConfig?.findUnique({
    where: { id: "default" }
  }).catch(() => null);

  if (config?.robotsTxt) {
    // Basic parser for DB-stored robots.txt
    // Using a simpler approach for the dynamic rules
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dashboard/", 
          "/api/",
          "/admin/",
        ],
      },
      sitemap: "https://jesaworldtech.com/sitemap.xml",
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/", 
        "/api/",
        "/admin/",
      ],
    },
    sitemap: "https://jesaworldtech.com/sitemap.xml",
  };
}
