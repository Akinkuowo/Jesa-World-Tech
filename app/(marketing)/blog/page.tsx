import type { Metadata } from "next";
import { Search, Calendar, Clock, User, ArrowRight, Rss, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog | JESA World Technology",
  description: "Insights, news, and technical guides from the forefront of digital transformation in Africa.",
};

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] blob bg-cyan-accent-600 opacity-15" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-6">
            <Rss className="w-4 h-4" />
            <span>Tech Insights</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            Latest Tech <span className="gradient-text">Frontiers</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Dive into the latest insights from our team of technologists and industry experts. We&apos;re sharing our journey and learnings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Search & Filter (Static UI for now) */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-16">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
            <input 
              type="text" 
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-electric-blue-500/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {["All", "Cloud", "Security", "Engineering", "AI"].map((cat) => (
              <button 
                key={cat}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  cat === "All" 
                    ? "bg-electric-blue-600 text-white" 
                    : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Card (Largest) */}
        {posts.length > 0 ? (
          <div className="mb-16">
            <Link href={`/blog/${posts[0].slug}`} className="group relative block aspect-[21/9] rounded-3xl overflow-hidden glass-card border border-white/10">
              {posts[0].imageUrl ? (
                <Image 
                  src={posts[0].imageUrl}
                  alt={posts[0].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 flex items-center justify-center opacity-40">
                  <Newspaper className="w-16 h-16 text-white/20" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-electric-blue-600 text-white mb-4">
                  {posts[0].category || "Article"}
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 group-hover:text-cyan-accent-400 transition-colors">
                  {posts[0].title}
                </h2>
                <div className="flex items-center gap-6 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {posts[0].authorName || "JESA Team"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(posts[0].createdAt).toLocaleDateString()}
                  </div>
                  {posts[0].readTime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {posts[0].readTime}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 mb-16">
            <Newspaper className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl text-white font-semibold">No articles found</h2>
            <p className="text-white/40">Check back later for fresh insights.</p>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white/5 rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                {post.imageUrl ? (
                  <Image 
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                   <div className="w-full h-full bg-slate-800 flex items-center justify-center opacity-40">
                     <Newspaper className="w-12 h-12 text-white/20" />
                   </div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-electric-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                  {post.category || "General"}
                </span>
                <h3 className="text-white text-xl font-bold mb-3 group-hover:text-cyan-accent-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2 text-electric-blue-400 group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-32 glass-card rounded-3xl p-12 border border-white/10 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue-600/10 blur-[100px]" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-white">Subscribe to Jesa Insights</h2>
              <p className="text-white/60">Get the latest technology trends and firm updates delivered straight to your inbox once a month.</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Work email address" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-electric-blue-500/50"
              />
              <button 
                type="button" 
                className="px-8 py-4 bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
