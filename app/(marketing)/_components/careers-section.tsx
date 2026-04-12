"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-time",
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Cloud Solutions Architect",
    department: "Cloud & Infrastructure",
    location: "Remote",
    type: "Full-time",
    gradient: "from-electric-blue-500 to-cyan-accent-500",
  },
  {
    title: "Cybersecurity Analyst",
    department: "Security",
    location: "Lagos, Nigeria",
    type: "Full-time",
    gradient: "from-red-500 to-orange-500",
  },
  {
    title: "Data Engineer",
    department: "Data & Analytics",
    location: "Remote",
    type: "Contract",
    gradient: "from-green-500 to-emerald-500",
  },
];

export default function CareersSection() {
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

  return (
    <section ref={ref} id="careers" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Header */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
              Join the Team
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Build the Future <br />
              <span className="gradient-text">With Us</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              We are always looking for brilliant minds who are passionate about technology and want to make a real impact across Africa. Join a team that values innovation, collaboration, and continuous growth.
            </p>
            <div className="space-y-4 mb-10">
              {["Competitive salary & equity packages", "Remote-friendly culture", "Learning & development budget", "Health insurance & wellness benefits", "Annual team retreats"].map((perk) => (
                <div key={perk} className="flex items-center gap-3 text-white/60 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent-400 flex-shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300"
            >
              See All Openings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — Job Cards */}
          <div className={`space-y-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            {openings.map((job, i) => (
              <Link
                key={job.title}
                href="/careers"
                className="group block glass-card rounded-xl p-5 border border-white/5 hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 service-card"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${job.gradient} flex items-center justify-center flex-shrink-0`}>
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm group-hover:text-electric-blue-300 transition-colors mb-1">
                        {job.title}
                      </h3>
                      <p className="text-white/40 text-xs mb-2">{job.department}</p>
                      <div className="flex items-center gap-4 text-white/40 text-xs">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-electric-blue-400 group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
