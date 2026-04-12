import type { Metadata } from "next";
import { ExternalLink, Zap } from "lucide-react";
import { db } from "@/lib/db";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Portfolio | JESA World Technology",
  description: "Explore JESA World Technology's project portfolio — case studies across cloud, cybersecurity, software development, and more.",
};

export default async function PortfolioPage() {
  const projects = await db.project.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
            Our Work
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Project <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Real solutions. Real impact. A selection of the work we&apos;re proud of.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300 service-card flex flex-col">
              <div className="relative aspect-video w-full overflow-hidden">
                {project.imageUrl ? (
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${project.isFeatured ? 'from-purple-600 to-blue-600' : 'from-slate-700 to-slate-900'} flex items-center justify-center opacity-40`}>
                    <Zap className="w-12 h-12 text-white/20" />
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10 mb-4">
                  {project.category}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-electric-blue-300 transition-colors">{project.title}</h3>
                <p className="text-white/40 text-xs mb-3">Client: {project.clientName}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                {/* Outcome */}
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 mb-4">
                  <p className="text-white/70 text-xs"><span className="text-white font-medium">Outcome: </span>{project.outcome}</p>
                </div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.split(",").map((t) => (
                    <span key={t.trim()} className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40 border border-white/5">{t.trim()}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-electric-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3.5 h-3.5" /> View Case Study
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
