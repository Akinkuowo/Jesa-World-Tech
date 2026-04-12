"use client";

import Link from "next/link";
import { ArrowRight, Cloud, Shield, Code2, BarChart3, Network, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description: "Scalable cloud architecture design, migration, and management on AWS, Azure, and GCP. Optimize costs and maximize uptime.",
    color: "from-blue-500 to-cyan-500",
    glow: "group-hover:shadow-blue-500/20",
    href: "/services#cloud",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "End-to-end security assessments, threat intelligence, penetration testing, and 24/7 SOC monitoring to protect your assets.",
    color: "from-red-500 to-orange-500",
    glow: "group-hover:shadow-red-500/20",
    href: "/services#cybersecurity",
  },
  {
    icon: Code2,
    title: "Software Development",
    description: "Custom web, mobile, and enterprise applications built with modern tech stacks. From MVP to large-scale systems.",
    color: "from-purple-500 to-pink-500",
    glow: "group-hover:shadow-purple-500/20",
    href: "/services#software",
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    description: "Strategic technology advisory — digital transformation roadmaps, vendor evaluation, and IT governance frameworks.",
    color: "from-yellow-500 to-amber-500",
    glow: "group-hover:shadow-yellow-500/20",
    href: "/services#consulting",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Business intelligence dashboards, data pipelines, machine learning models, and predictive analytics to drive decisions.",
    color: "from-green-500 to-emerald-500",
    glow: "group-hover:shadow-green-500/20",
    href: "/services#data",
  },
  {
    icon: Network,
    title: "Network Infrastructure",
    description: "Enterprise networking design, deployment and management — LAN, WAN, SD-WAN, and wireless solutions.",
    color: "from-electric-blue-500 to-cyan-accent-500",
    glow: "group-hover:shadow-electric-blue-500/20",
    href: "/services#network",
  },
];

export default function ServicesSection() {
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
    <section ref={ref} id="services" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive <span className="gradient-text">I.T. Services</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            From cloud infrastructure to cybersecurity — we are your end-to-end technology partner, delivering solutions that drive growth and resilience.
          </p>
        </div>

        {/* Services Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group service-card glass-card rounded-2xl p-6 hover:shadow-xl hover:bg-white/[0.07] border border-white/5 hover:border-white/10 block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`inline-flex w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              {/* Content */}
              <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-cyan-accent-300 transition-colors">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {service.description}
              </p>
              {/* Arrow */}
              <div className="mt-5 flex items-center gap-1 text-electric-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                Learn more <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-14 transition-all duration-700 delay-400 ${visible ? "opacity-100" : "opacity-0"}`}>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-white border border-white/10 hover:border-electric-blue-500/30 hover:bg-electric-blue-500/10 transition-all duration-300 text-sm font-medium"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
