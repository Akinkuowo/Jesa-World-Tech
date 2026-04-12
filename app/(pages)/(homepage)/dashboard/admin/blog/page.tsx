import { db } from "@/lib/db";
import { BlogClient } from "./_components/blog-client";

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-6">
       <BlogClient initialData={posts} />
    </div>
  );
}
