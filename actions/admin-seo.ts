import { db } from "@/lib/db";
import { SEOConfig } from "@prisma/client";

export const getSEOConfig = async () => {
  try {
    const seoProp = (db as any).sEOConfig;
    
    // Safe fallback if property is missing due to stale client in memory
    if (!seoProp) {
      console.warn("[SEO_CONFIG] Prisma client is stale. Using fallback defaults. Please restart dev server.");
      return {
        id: "default",
        titleTemplate: "%s | JESA World Technology",
        defaultTitle: "JESA World Technology | I.T. Solutions",
        description: "Leading I.T. firm delivering cutting-edge software development and cloud solutions.",
        keywords: "IT firm, software development",
        twitterHandle: "@jesaworldtech",
        robotsTxt: "User-agent: *\nAllow: /\nDisallow: /dashboard/\nDisallow: /api/\nDisallow: /admin/",
        googleTagManagerId: "",
        updatedAt: new Date(),
      } as SEOConfig;
    }

    let config = await seoProp.findUnique({
      where: { id: "default" },
    });

    if (!config) {
      config = await seoProp.create({
        data: {
          id: "default",
        },
      });
    }

    return config;
  } catch (error) {
    console.log("[GET_SEO_CONFIG]", error);
    return null;
  }
};

export const updateSEOConfig = async (values: Partial<SEOConfig>) => {
  try {
    const seoProp = (db as any).sEOConfig;

    if (!seoProp) {
      throw new Error("Prisma client is stale. Please restart the dev server to apply schema changes.");
    }

    const config = await seoProp.upsert({
      where: { id: "default" },
      update: {
        ...values,
      },
      create: {
        id: "default",
        ...values,
      },
    });

    return config;
  } catch (error: any) {
    console.log("[UPDATE_SEO_CONFIG]", error);
    throw new Error(error.message || "Failed to update SEO configuration");
  }
};
