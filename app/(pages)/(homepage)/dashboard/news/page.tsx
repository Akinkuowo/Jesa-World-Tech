import { db } from "@/lib/db";
import { NewsList } from "./_components/news-list";
import { Newspaper } from "lucide-react";

const NewsPage = async () => {
  const posts = await db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 lg:p-10 min-h-full">
      <div className="flex flex-col gap-y-4 mb-10">
        <div className="flex items-center gap-x-3">
          <div className="p-2 bg-electric-blue-50 rounded-lg">
            <Newspaper className="h-6 w-6 text-electric-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Internal News
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Stay updated with the latest insights, announcements, and tech frontiers from JESA.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200">
        <NewsList items={posts} />
      </div>
    </div>
  );
};

export default NewsPage;