import { BlogPost } from "@prisma/client";
import { NewsCard } from "./news-card";
import { Newspaper, SearchX } from "lucide-react";

interface NewsListProps {
  items: BlogPost[];
}

export const NewsList = ({ items }: NewsListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
        <div className="bg-white p-6 rounded-full shadow-sm mb-6">
          <Newspaper className="h-12 w-12 text-slate-300" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No News Yet</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          We haven&apos;t published any internal news yet. Check back soon for updates from the JESA team!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((post) => (
        <NewsCard
          key={post.id}
          title={post.title}
          excerpt={post.excerpt}
          imageUrl={post.imageUrl}
          slug={post.slug}
          category={post.category}
          createdAt={post.createdAt}
          readTime={post.readTime}
        />
      ))}
    </div>
  );
};
