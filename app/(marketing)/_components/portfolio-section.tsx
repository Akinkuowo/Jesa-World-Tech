"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "FinTech Payment Gateway",
    client: "PayFlow Africa",
    description: "End-to-end payment processing platform with real-time fraud detection, multi-currency support, and instant settlement across 15 African countries.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"],
    gradient: "from-purple-600 to-blue-600",
    category: "Software Development",
  },
  {
    title: "Government Data Portal",
    client: "Ministry of Digital Economy",
    description: "Secure, scalable open-data platform serving millions of citizen requests, with advanced analytics and real-time dashboards.",
    tech: ["Python", "Django", "Elasticsearch", "Docker", "Azure"],
    gradient: "from-electric-blue-600 to-cyan-accent-600",
    category: "Data Analytics",
  },
  {
    title: "Cloud Migration & SOC",
    client: "Apex Insurance Group",
    description: "Complete AWS cloud migration of legacy on-premises infrastructure plus 24/7 Security Operations Center setup and SIEM implementation.",
    tech: ["AWS", "Terraform", "Splunk", "Python", "Ansible"],
    gradient: "from-emerald-600 to-teal-600",
    category: "Cloud & Cybersecurity",
  },
  {
    title: "Hospital Management System",
    client: "MedCare Health Network",
    description: "Integrated EHR, appointment scheduling, billing, and lab management system deployed across 12 hospital locations.",
    tech: ["React", "Java Spring", "MySQL", "Docker", "Nginx"],
    gradient: "from-pink-600 to-rose-600",
    category: "Software Development",
  },
  {
    title: "Smart Campus Network",
    client: "Tech University",
    description: "Complete network infrastructure overhaul — SD-WAN, gigabit fiber, managed WiFi 6 across 40 buildings, serving 15,000+ users.",
    tech: ["Cisco", "Fortinet", "SD-WAN", "Meraki", "RADIUS"],
    gradient: "from-orange-600 to-amber-600",
    category: "Network Infrastructure",
  },
  {
    title: "E-Commerce Transformation",
    client: "RetailMax Nigeria",
    description: "Full digital transformation — custom e-commerce platform, ERP integration, warehouse automation, and CRM implementation.",
    tech: ["Next.js", "Shopify", "SAP", "Stripe", "Vercel"],
    gradient: "from-violet-600 to-indigo-600",
    category: "IT Consulting",
  },
];

export default function PortfolioSection() {
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
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300 service-card"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6">
                {/* Category badge */}
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-10 text-white/70 mb-4`}>
                  {project.category}
                </span>

                <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-electric-blue-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/40 text-xs mb-3">Client: {project.client}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs rounded bg-white/5 text-white/50 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>

                {/* View link */}
                <div className="mt-5 flex items-center gap-1 text-electric-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3.5 h-3.5" /> View Case Study
                </div>
              </div>
            </div>
          ))}
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
