"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Newspaper } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Project } from "@prisma/client";

// Gradient palette for cards when no image is available
const gradients = [
  "from-purple-600 to-blue-600",
  "from-electric-blue-600 to-cyan-accent-600",
  "from-emerald-600 to-teal-600",
  "from-pink-600 to-rose-600",
  "from-orange-600 to-amber-600",
  "from-violet-600 to-indigo-600",
];

interface PortfolioSectionProps {
  projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // If no featured projects exist in the database, show a placeholder
  if (projects.length === 0) {
    return (
      <section ref={ref} id="portfolio" className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px section-divider" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-12">
            A showcase of how we have helped organizations across industries harness technology to solve real problems.
          </p>
          <div className="py-16 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <Newspaper className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40 text-sm">Featured projects coming soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="portfolio" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            A showcase of how we have helped organizations across industries harness technology to solve real problems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {projects.map((project, i) => {
            const gradient = gradients[i % gradients.length];
            const techStack = project.techStack ? project.techStack.split(",").map(t => t.trim()) : [];

            return (
              <div
                key={project.id}
                className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300 service-card"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Project Image or Gradient Bar */}
                {project.imageUrl ? (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  </div>
                ) : (
                  <div className={`h-1.5 w-full bg-gradient-to-r ${gradient}`} />
                )}

                <div className="p-6">
                  {/* Category badge */}
                  {project.category && (
                    <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${gradient} bg-opacity-10 text-white/70 mb-4`}>
                      {project.category}
                    </span>
                  )}

                  <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-electric-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.clientName && (
                    <p className="text-white/40 text-xs mb-3">Client: {project.clientName}</p>
                  )}
                  <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((t) => (
                        <span key={t} className="px-2 py-1 text-xs rounded bg-white/5 text-white/50 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* View link */}
                  {project.projectUrl && (
                    <a 
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex items-center gap-1 text-electric-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:text-electric-blue-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> View Project
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300"
          >
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
