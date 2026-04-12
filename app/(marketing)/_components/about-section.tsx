"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Award, Users, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const highlights = [
  "ISO-certified processes & best-in-class delivery",
  "Dedicated project managers and tech leads",
  "24/7 support and proactive monitoring",
  "Transparent pricing with no hidden costs",
  "Pan-African reach with global standards",
];

const pillars = [
  { icon: Award, label: "Excellence", desc: "ISO-grade quality in every delivery" },
  { icon: Users, label: "Partnership", desc: "Your success is our success" },
  { icon: Target, label: "Innovation", desc: "Cutting-edge tech, always" },
];

export default function AboutSection() {
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
    <section ref={ref} id="about" className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
      {/* Blobs */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 blob bg-electric-blue-800 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="relative">
              {/* Main card */}
              <div className="gradient-border rounded-2xl p-px">
                <div className="bg-navy-900 rounded-2xl p-8 space-y-6">
                  {/* Terminal-style header */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-4 text-xs text-white/30 font-mono">jesa-world-tech ~ solutions</span>
                  </div>
                  <div className="font-mono text-sm space-y-2 text-white/70">
                    <div><span className="text-cyan-accent-400">$</span> <span className="text-electric-blue-300">mission</span></div>
                    <div className="text-white/50 pl-4">→ Deliver world-class I.T. solutions</div>
                    <div className="text-white/50 pl-4">→ Empower African businesses</div>
                    <div className="text-white/50 pl-4">→ Bridge the technology gap</div>
                    <div className="mt-4"><span className="text-cyan-accent-400">$</span> <span className="text-electric-blue-300">founded</span></div>
                    <div className="text-white/50 pl-4">→ 2016, Lagos Nigeria</div>
                    <div className="mt-4"><span className="text-cyan-accent-400">$</span> <span className="text-electric-blue-300">status</span></div>
                    <div className="pl-4"><span className="text-green-400">● OPERATIONAL</span> <span className="text-white/30">– serving clients globally</span></div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-6 -right-6 glass-card rounded-xl p-4 border border-white/10 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-blue-500 to-cyan-accent-500 flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Top Rated</div>
                  <div className="text-white/50 text-xs">I.T. Firm in West Africa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
              Who We Are
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted Technology <span className="gradient-text">Partner</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Since 2016, JESA World Technology has been at the forefront of Africa&apos;s digital transformation. We combine deep technical expertise with an intimate understanding of the African business landscape to deliver solutions that actually work.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              From startups to enterprises, we have helped over 150 organizations modernize their infrastructure, secure their operations, and unlock new revenue through technology.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/70 text-sm">
                  <CheckCircle className="w-5 h-5 text-cyan-accent-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {pillars.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="glass-card rounded-xl p-4 text-center border border-white/5">
                  <Icon className="w-6 h-6 text-electric-blue-400 mx-auto mb-2" />
                  <div className="text-white text-sm font-semibold">{label}</div>
                  <div className="text-white/40 text-xs mt-1">{desc}</div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300"
            >
              Learn About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
