import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  title: string;
  excerpt: string | null;
  imageUrl: string | null;
  slug: string;
  category: string | null;
  createdAt: Date;
  readTime: string | null;
}

export const NewsCard = ({
  title,
  excerpt,
  imageUrl,
  slug,
  category,
  createdAt,
  readTime
}: NewsCardProps) => {
  return (
    <Link 
      href={`/blog/${slug}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-electric-blue-200 transition-all duration-300 h-full"
    >
      <div className="relative aspect-video overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-slate-50 flex items-center justify-center">
            <Newspaper className="w-12 h-12 text-slate-200" />
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-electric-blue-600 shadow-sm">
            {category || "News"}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-x-4 text-[10px] text-slate-400 font-medium uppercase tracking-widest mb-3">
          <div className="flex items-center gap-x-1">
            <Calendar className="w-3 h-3 text-electric-blue-500" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </div>
          {readTime && (
            <div className="flex items-center gap-x-1">
              <Clock className="w-3 h-3 text-electric-blue-500" />
              {readTime}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-electric-blue-600 transition-colors line-clamp-2 mb-3">
          {title}
        </h3>
        
        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed flex-grow">
          {excerpt}
        </p>
        
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-electric-blue-600 font-bold text-xs group-hover:gap-x-2 transition-all">
          Read Full Story
          <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
      </div>
    </Link>
  );
};
