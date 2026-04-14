import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  ArrowRight,
  Newspaper,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  const post = await db.blogPost.findUnique({
    where: { slug, isPublished: true },
  });
  return post;
}

async function getRelatedPosts(currentId: string, category: string | null) {
  return db.blogPost.findMany({
    where: {
      isPublished: true,
      id: { not: currentId },
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found | JESA World Technology" };
  }

  return {
    title: `${post.title} | JESA Blog`,
    description: post.excerpt || post.title,
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      ...(post.imageUrl ? { images: [post.imageUrl] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category);

  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* ─── Hero / Cover ─────────────────────────────────────── */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative w-full h-[340px] md:h-[480px] overflow-hidden">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 flex items-center justify-center">
              <Newspaper className="w-24 h-24 text-white/10" />
            </div>
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
        </div>

        {/* Floating Title Card */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 z-10">
          <div className="space-y-6">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/50 hover:text-cyan-accent-400 text-sm font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            {/* Category badge */}
            {post.category && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-electric-blue-600 text-white">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 text-white/50 text-sm pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue-500 to-cyan-accent-500 flex items-center justify-center text-white text-xs font-bold">
                  {(post.authorName || "JT")
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <span className="font-medium text-white/70">
                  {post.authorName || "JESA Team"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Content Area ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          {/* Main Article */}
          <article
            className="prose prose-lg prose-invert
              prose-headings:font-display prose-headings:text-white prose-headings:font-bold
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-white/70 prose-p:leading-relaxed
              prose-a:text-cyan-accent-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-electric-blue-500 prose-blockquote:text-white/60 prose-blockquote:bg-white/[0.03] prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:pr-4
              prose-code:text-cyan-accent-300 prose-code:bg-white/[0.06] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-navy-800 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl
              prose-img:rounded-2xl prose-img:border prose-img:border-white/10
              prose-li:text-white/70
              prose-hr:border-white/10
              prose-th:text-white prose-td:text-white/70
              max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-8">
            {/* Share Widget */}
            <div className="sticky top-28 space-y-8">
              <div className="glass-card rounded-2xl p-6 border border-white/10">
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-cyan-accent-400" />
                  Share this article
                </h3>
                <div className="flex gap-3">
                  {[
                    {
                      label: "X",
                      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://jesaworldtech.com/blog/${post.slug}`)}`,
                    },
                    {
                      label: "LI",
                      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jesaworldtech.com/blog/${post.slug}`)}`,
                    },
                    {
                      label: "FB",
                      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://jesaworldtech.com/blog/${post.slug}`)}`,
                    },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-electric-blue-600 hover:border-electric-blue-600 transition-all text-xs font-bold"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Article Info */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
                <h3 className="text-white font-semibold text-sm">
                  Article Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-white/40">Published</span>
                    <span className="text-white/70">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {post.readTime && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/40">Read time</span>
                      <span className="text-white/70">{post.readTime}</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="flex items-center justify-between">
                      <span className="text-white/40">Category</span>
                      <span className="text-electric-blue-400 font-medium">
                        {post.category}
                      </span>
                    </div>
                  )}
                  {post.updatedAt &&
                    post.updatedAt.getTime() !==
                      post.createdAt.getTime() && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/40">Updated</span>
                        <span className="text-white/70">
                          {new Date(post.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Related Posts ─────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                Continue Reading
              </h2>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-electric-blue-400 text-sm font-medium hover:text-cyan-accent-400 transition-colors group"
              >
                View all posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related: any) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {related.imageUrl ? (
                      <Image
                        src={related.imageUrl}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-navy-800 to-navy-900 flex items-center justify-center">
                        <Newspaper className="w-10 h-10 text-white/10" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {related.category && (
                      <span className="text-electric-blue-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                        {related.category}
                      </span>
                    )}
                    <h3 className="text-white text-lg font-bold mb-2 group-hover:text-cyan-accent-400 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
                      {related.excerpt}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(related.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-electric-blue-400 group-hover:translate-x-1 transition-transform">
                        Read <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Bottom CTA ───────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-white/40 text-sm mb-4">
            Want to learn more about our work?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              Browse All Articles
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
