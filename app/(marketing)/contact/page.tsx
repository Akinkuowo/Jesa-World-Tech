import type { Metadata } from "next";
import ContactSection from "../_components/contact-section";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | JESA World Technology",
  description: "Get in touch with JESA World Technology. Start a project, request a quote, or ask us anything about our I.T. services.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
            Contact Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Tell us about your project. We typically respond within 2–4 business hours.
          </p>
        </div>
      </div>

      {/* Office Hours */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Mail, label: "Email", value: "hello@jesaworldtech.com" },
            { icon: Phone, label: "Phone", value: "+234 800 JESA TECH" },
            { icon: MapPin, label: "Location", value: "Victoria Island, Lagos" },
            { icon: Clock, label: "Business Hours", value: "Mon–Fri, 8am–6pm WAT" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card rounded-xl p-4 border border-white/5 flex items-center gap-3">
              <Icon className="w-5 h-5 text-cyan-accent-400 flex-shrink-0" />
              <div>
                <p className="text-white/40 text-xs">{label}</p>
                <p className="text-white text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ContactSection />
    </div>
  );
}
