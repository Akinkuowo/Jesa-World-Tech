import type { Metadata } from "next";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | JESA World Technology",
  description: "Join the JESA World Technology team — explore exciting career opportunities in cloud, cybersecurity, software development, consulting, and more.",
};

const jobs = [
  { title: "Senior Full-Stack Engineer", department: "Engineering", location: "Lagos, Nigeria", type: "Full-time", level: "Senior", description: "Architect and build scalable web applications and APIs for our clients across Africa.", skills: ["React / Next.js", "Node.js", "PostgreSQL", "Docker", "AWS"], gradient: "from-purple-500 to-blue-500" },
  { title: "Cloud Solutions Architect", department: "Cloud & Infrastructure", location: "Remote", type: "Full-time", level: "Senior", description: "Design and implement cloud architecture solutions on AWS, Azure, and GCP for enterprise clients.", skills: ["AWS", "Azure", "Terraform", "Kubernetes", "Python"], gradient: "from-blue-500 to-cyan-500" },
  { title: "Cybersecurity Analyst (SOC)", department: "Security", location: "Lagos, Nigeria", type: "Full-time", level: "Mid-level", description: "Monitor, analyze, and respond to security threats in our 24/7 Security Operations Center.", skills: ["Splunk", "SIEM", "Incident Response", "Threat Intelligence", "Python"], gradient: "from-red-500 to-orange-500" },
  { title: "Data Engineer", department: "Data & Analytics", location: "Remote", type: "Contract", level: "Senior", description: "Build and maintain scalable data pipelines, warehouses, and analytics infrastructure.", skills: ["Python", "dbt", "Snowflake", "Apache Spark", "SQL"], gradient: "from-green-500 to-emerald-500" },
  { title: "IT Consultant", department: "Consulting", location: "Lagos / Abuja", type: "Full-time", level: "Mid-Senior", description: "Advise clients on technology strategy, digital transformation, and IT governance.", skills: ["ITIL", "COBIT", "Project Management", "Stakeholder Management", "Agile"], gradient: "from-amber-500 to-yellow-500" },
  { title: "Mobile Developer (React Native)", department: "Engineering", location: "Remote", type: "Full-time", level: "Mid-level", description: "Build high-quality cross-platform mobile applications for iOS and Android.", skills: ["React Native", "TypeScript", "REST APIs", "Firebase", "Testing"], gradient: "from-pink-500 to-rose-500" },
];

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

export default function CareersPage() {
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
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div key={job.title} className="group glass-card rounded-2xl p-6 border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all duration-300 service-card">
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${job.gradient} mb-5`} />
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-electric-blue-300 transition-colors">{job.title}</h3>
                    <p className="text-white/40 text-xs mt-1">{job.department} · {job.level}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 flex-shrink-0">{job.type}</span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{job.description}</p>
                <div className="flex items-center gap-4 text-white/40 text-xs mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {job.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40 border border-white/5">{s}</span>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-electric-blue-400 text-sm font-medium hover:text-electric-blue-300 transition-colors">
                  Apply Now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
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
