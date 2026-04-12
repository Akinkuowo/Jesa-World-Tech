"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Mail, Phone, MapPin, CheckCircle, Loader2 } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@jesaworldtech.com", href: "mailto:hello@jesaworldtech.com" },
  { icon: Phone, label: "Phone", value: "+234 800 JESA TECH", href: "tel:+2348005372832" },
  { icon: MapPin, label: "Office", value: "Victoria Island, Lagos, Nigeria", href: "#" },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-navy-800/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-electric-blue-500/50 focus:bg-navy-800 transition-all duration-200";

  return (
    <section ref={ref} id="contact" className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 blob bg-electric-blue-800 opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Start a <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Ready to transform your business? Tell us about your project and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-12 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="group flex items-start gap-4 glass-card rounded-xl p-5 border border-white/5 hover:border-electric-blue-500/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue-600 to-cyan-accent-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-white text-sm font-medium group-hover:text-electric-blue-300 transition-colors">{value}</div>
                </div>
              </a>
            ))}

            {/* Response time badge */}
            <div className="glass-card rounded-xl p-5 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">We&apos;re Available</span>
              </div>
              <p className="text-white/50 text-sm">
                Our team typically responds within <strong className="text-white">2–4 business hours</strong>. For urgent matters, call us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="gradient-border rounded-2xl p-px">
              <div className="bg-navy-900 rounded-2xl p-8">
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">Message Received!</h3>
                    <p className="text-white/50 text-sm max-w-xs">
                      Thank you for reaching out. We&apos;ll be in touch within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-electric-blue-400 text-sm hover:text-electric-blue-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Name *</label>
                        <input id="contact-name" name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Email *</label>
                        <input id="contact-email" type="email" name="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Phone</label>
                        <input id="contact-phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 800 000 0000" className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Subject *</label>
                        <select id="contact-subject" name="subject" required value={form.subject} onChange={handleChange} className={inputClass}>
                          <option value="" className="bg-navy-900">Select a service</option>
                          <option value="Cloud Solutions" className="bg-navy-900">Cloud Solutions</option>
                          <option value="Cybersecurity" className="bg-navy-900">Cybersecurity</option>
                          <option value="Software Development" className="bg-navy-900">Software Development</option>
                          <option value="IT Consulting" className="bg-navy-900">IT Consulting</option>
                          <option value="Data Analytics" className="bg-navy-900">Data Analytics</option>
                          <option value="Network Infrastructure" className="bg-navy-900">Network Infrastructure</option>
                          <option value="General Inquiry" className="bg-navy-900">General Inquiry</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wider">Message *</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us about your project, goals, and timeline..."
                        className={`${inputClass} resize-none`}
                      />
                    </div>
                    {status === "error" && (
                      <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
                    )}
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
