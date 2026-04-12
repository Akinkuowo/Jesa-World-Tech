"use client";

import Link from "next/link";
import { ArrowRight, Shield, Cpu, Globe, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const floatingIcons = [
  { icon: Shield, delay: "0s", x: "10%", y: "25%" },
  { icon: Cpu, delay: "1.5s", x: "85%", y: "20%" },
  { icon: Globe, delay: "0.8s", x: "80%", y: "65%" },
];

const badges = [
  "Cloud Infrastructure",
  "Cybersecurity",
  "Software Development",
  "Data Analytics",
  "IT Consulting",
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-950"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 hero-grid opacity-40" />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 blob bg-electric-blue-600 animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 blob bg-cyan-accent-600" style={{ animationDuration: "6s", animationDelay: "2s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 blob bg-blue-800" style={{ animationDuration: "5s", animationDelay: "1s" }} />

      {/* Floating icons */}
      {floatingIcons.map(({ icon: Icon, delay, x, y }, i) => (
        <div
          key={i}
          className="absolute hidden lg:flex w-12 h-12 rounded-xl glass-card items-center justify-center animate-float"
          style={{ left: x, top: y, animationDelay: delay }}
        >
          <Icon className="w-5 h-5 text-electric-blue-400" />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-blue-500/10 border border-electric-blue-500/20 text-electric-blue-400 text-sm font-medium mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-accent-400 animate-pulse" />
          Powering Africa&apos;s Digital Future
        </div>

        {/* Headline */}
        <h1
          className={`font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-white">Innovative </span>
          <span className="gradient-text">I.T. Solutions</span>
          <br />
          <span className="text-white">for the </span>
          <span className="text-white">Modern World</span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          JESA World Technology delivers enterprise-grade cloud, cybersecurity, software development, and IT consulting solutions — transforming how businesses operate across Africa and beyond.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-14 transition-all duration-700 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <Link
            href="/contact"
            id="hero-start-project-btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-semibold text-base hover:shadow-xl hover:shadow-electric-blue-500/30 hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            Start a Project <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/services"
            id="hero-explore-services-btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-card text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
          >
            Explore Services
          </Link>
        </div>

        {/* Scrolling badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-400 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-white/50 bg-white/5 border border-white/10"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
