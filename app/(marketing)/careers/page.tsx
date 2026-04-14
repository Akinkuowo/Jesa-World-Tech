import type { Metadata } from "next";
import { MapPin, Clock, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the JESA World Technology team — explore exciting career opportunities in cloud, cybersecurity, software development, consulting, and more.",
  openGraph: {
    title: "Careers at JESA World Technology | Build the Future With Us",
    description: "Join a team of brilliant minds driven to transform Africa through technology. Explore world-class opportunities and real impact.",
    type: "website",
  },
  twitter: {
    title: "Build the Future with JESA World Technology",
    description: "Join our expert team of engineers and consultants across Africa.",
  }
};

const perks = [
  "Competitive salary benchmarked to global standards",
  "Remote & hybrid work options",
  "Annual learning & conference budget",
  "Health insurance for you and family",
  "Equity / profit-sharing for senior hires",
  "Annual team offsite",
  "Latest MacBook & home office setup",
  "Clear career progression framework",
];

export default async function CareersPage() {
  const jobs = await db.jobListing.findMany({
    where: {
      isOpen: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 blob bg-electric-blue-700 opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
            We&apos;re Hiring
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Build the Future <span className="gradient-text">With Us</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Join a team of brilliant minds driven to transform Africa through technology. We offer world-class opportunities, competitive compensation, and real impact.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">
        {/* Open Roles */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-bold text-white">
              Open Positions <span className="text-electric-blue-400 text-xl">({jobs.length})</span>
            </h2>
          </div>
          
          {jobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 glass-card rounded-3xl border border-white/5 text-center">
              <Briefcase className="w-12 h-12 text-white/20 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Openings Right Now</h3>
              <p className="text-white/40 max-w-md">
                We aren&apos;t currently advertising any open roles, but we&apos;re always looking for exceptional talent. Send us your CV anyway!
              </p>
              <Link href="/contact" className="mt-6 px-6 py-2 rounded-full bg-electric-blue-600 text-white font-medium hover:bg-electric-blue-700 transition-all">
                Spontaneous Application
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {jobs.map((job: any) => {
                const skills = job.skills ? job.skills.split(",").map((s: string) => s.trim()) : [];
                return (
                  <div key={job.id} className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 service-card">
                    <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${job.gradient || "from-blue-500 to-cyan-500"} mb-5`} />
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-display text-base font-bold text-white group-hover:text-electric-blue-300 transition-colors">{job.title}</h3>
                        <p className="text-white/40 text-xs mt-1">{job.department} · {job.level}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 flex-shrink-0">{job.type}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3">{job.description}</p>
                    <div className="flex items-center gap-4 text-white/40 text-xs mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                    </div>
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {skills.map((s: string) => (
                          <span key={s} className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40 border border-white/5">{s}</span>
                        ))}
                      </div>
                    )}
                    <Link href="/contact" className="inline-flex items-center gap-1.5 text-electric-blue-400 text-sm font-medium hover:text-electric-blue-300 transition-colors">
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Perks */}
        <div className="gradient-border rounded-2xl p-px">
          <div className="bg-navy-900 rounded-2xl p-10">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-white mb-3">Why JESA?</h2>
              <p className="text-white/50 max-w-xl mx-auto">We invest in our people because we know great work comes from happy, fulfilled teams.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 glass-card rounded-xl p-4 border border-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent-400 flex-shrink-0 mt-2" />
                  <span className="text-white/60 text-sm leading-relaxed">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
