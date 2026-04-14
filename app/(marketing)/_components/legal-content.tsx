"use client";

import { cn } from "@/lib/utils";

interface LegalContentProps {
  title: string;
  updateDate: string;
  children: React.ReactNode;
  className?: string;
}

export const LegalContent = ({
  title,
  updateDate,
  children,
  className,
}: LegalContentProps) => {
  return (
    <div className={cn("min-h-screen bg-navy-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8", className)}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center sm:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
            Legal Information
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-white/40 text-sm">
            Last Updated: {updateDate}
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-electric-blue-600/5 blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-accent-600/5 blur-[100px] -z-10" />
          
          <article className="prose prose-invert max-w-none
            prose-headings:text-white prose-headings:font-display prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-2
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
            prose-li:text-white/70 prose-li:my-1
            prose-strong:text-white
            prose-a:text-cyan-accent-400 prose-a:underline hover:prose-a:text-cyan-accent-300
            prose-hr:border-white/10">
            {children}
          </article>
        </div>
      </div>
    </div>
  );
};
