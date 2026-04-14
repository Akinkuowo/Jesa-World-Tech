import Link from "next/link";
import Image from "next/image";
import {
  Zap, Mail, Phone, MapPin,
  Twitter, Linkedin, Github, Youtube,
  ArrowUpRight, Globe, Facebook, Instagram
} from "lucide-react";
import { db } from "@/lib/db";

// Icon mapping for dynamic social links
const ICON_MAP: Record<string, any> = {
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Globe,
  Facebook,
  Instagram,
};

const defaultFooterLinks = {
  Services: [
    { label: "Cloud Solutions", href: "/services#cloud" },
    { label: "Cybersecurity", href: "/services#cybersecurity" },
    { label: "Software Development", href: "/services#software" },
    { label: "IT Consulting", href: "/services#consulting" },
    { label: "Data Analytics", href: "/services#data" },
    { label: "Network Infrastructure", href: "/services#network" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Platform: [
    { label: "Sign In", href: "/login" },
    { label: "Get Started", href: "/register" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Latest News (Blog)", href: "/blog" },
  ],
};

const defaultSocials = [
  { icon: "Twitter", href: "#", label: "Twitter" },
  { icon: "Linkedin", href: "#", label: "LinkedIn" },
  { icon: "Github", href: "#", label: "GitHub" },
  { icon: "Youtube", href: "#", label: "YouTube" },
];

import { Logo } from "../../(pages)/(homepage)/_components/logo";

export default async function MarketingFooter() {
  const footerConfig = await db?.footerConfig?.findUnique({
    where: { id: "default" },
  });

  const config = footerConfig || {
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Let's build something extraordinary together. Our team of experts is ready to deliver tailored I.T. solutions.",
    ctaButtonText: "Start a Project",
    ctaButtonLink: "/contact",
    ctaSecondaryButtonText: "Create Free Account",
    ctaSecondaryButtonLink: "/sign-up",
    brandDescription: "A leading I.T. firm delivering innovative technology solutions — from cloud infrastructure to custom software — empowering businesses across Africa and beyond.",
    address: "Lagos, Nigeria",
    email: "hello@jesaworldtech.com",
    phone: "+234 800 JESA TECH",
    copyrightText: "JESA World Technology. All rights reserved.",
    socialLinks: defaultSocials,
    footerLinks: defaultFooterLinks,
  };

  const footerLinks = (config.footerLinks as any) || defaultFooterLinks;
  const socials = (config.socialLinks as any[]) || defaultSocials;

  return (
    <footer className="bg-navy-900 border-t border-white/5">
      {/* CTA Band */}
      <div className="bg-gradient-to-r from-electric-blue-600 via-blue-600 to-cyan-accent-600 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            {config.ctaTitle}
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            {config.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={config.ctaButtonLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-electric-blue-700 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              {config.ctaButtonText} <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href={config.ctaSecondaryButtonLink}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white rounded-xl font-semibold text-sm border border-white/20 hover:bg-white/20 transition-colors"
            >
              {config.ctaSecondaryButtonText}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group cursor-pointer transition-opacity hover:opacity-90">
              <Logo className="brightness-0 invert" />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {config.brandDescription}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-white/50">
                <MapPin className="w-4 h-4 text-cyan-accent-500 flex-shrink-0" />
                <span>{config.address}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Mail className="w-4 h-4 text-cyan-accent-500 flex-shrink-0" />
                <span>{config.email}</span>
              </div>
              <div className="flex items-center gap-3 text-white/50">
                <Phone className="w-4 h-4 text-cyan-accent-500 flex-shrink-0" />
                <span>{config.phone}</span>
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map(({ icon, href, label }) => {
                const Icon = ICON_MAP[icon] || Globe;
                return (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-electric-blue-600/20 hover:border-electric-blue-500/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]: [string, any]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, href }: { label: string, href: string }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/50 text-sm hover:text-cyan-accent-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} {config.copyrightText}
          </p>
          <div className="flex items-center gap-6 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white/60 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
