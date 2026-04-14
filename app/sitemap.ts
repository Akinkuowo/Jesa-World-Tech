import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jesaworldtech.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/services",
    "/careers",
    "/team",
    "/portfolio",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((route: string) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic Blog posts
  const posts = await db.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true, updatedAt: true },
  });

  const blogRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Courses (Chapter pages are the indexed ones)
  const chapters = await db.chapter.findMany({
    where: { isPublished: true, course: { isPublished: true } },
    select: { id: true, courseId: true, updatedAt: true },
  });

  const courseRoutes = chapters.map((chapter: any) => ({
    url: `${baseUrl}/courses/${chapter.courseId}/chapters/${chapter.id}`,
    lastModified: chapter.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...courseRoutes];
}
