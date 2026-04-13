import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/", 
        "/api/",
        "/admin/", // Just in case there's an alias
      ],
    },
    sitemap: "https://jesaworldtech.com/sitemap.xml",
  };
}
