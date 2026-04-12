"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "CTO, PayFlow Africa",
    avatar: "AO",
    gradient: "from-purple-500 to-blue-500",
    rating: 5,
    text: "JESA World Technology transformed our payment infrastructure completely. Within 6 months, we went from a rickety legacy system to a world-class platform processing millions of transactions daily. Exceptional expertise and professionalism.",
  },
  {
    name: "Emeka Nwosu",
    role: "Director of IT, MedCare Health Network",
    avatar: "EN",
    gradient: "from-electric-blue-500 to-cyan-accent-500",
    rating: 5,
    text: "Our hospital management system implementation was complex, spanning 12 locations and thousands of users. JESA delivered on time, on budget, and the system has been rock solid. I cannot recommend them enough.",
  },
  {
    name: "Fatima Al-Hassan",
    role: "Deputy Director, Ministry of Digital Economy",
    avatar: "FA",
    gradient: "from-emerald-500 to-teal-500",
    rating: 5,
    text: "The government data portal JESA built has won international awards for transparency and accessibility. They understood both the technical requirements and the policy context — a rare combination.",
  },
  {
    name: "Chukwuemeka Obi",
    role: "CEO, RetailMax Nigeria",
    avatar: "CO",
    gradient: "from-orange-500 to-amber-500",
    rating: 5,
    text: "Our entire e-commerce transformation was delivered by JESA. Sales are up 340% since launch. Their team didn't just build software — they understood our business and built for our future.",
  },
  {
    name: "Sarah Johnson",
    role: "IT Director, Apex Insurance Group",
    avatar: "SJ",
    gradient: "from-rose-500 to-pink-500",
    rating: 5,
    text: "Cloud migration always sounds frightening, but JESA made it seamless. Zero downtime, all our data intact, and our security posture is dramatically improved. Worth every naira.",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
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

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section ref={ref} className="py-24 bg-navy-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />
      <div className="absolute bottom-0 left-0 right-0 h-px section-divider" />
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 blob bg-electric-blue-800 opacity-20" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
            Client Voices
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Our reputation is built on results. Here&apos;s what the leaders we&apos;ve partnered with have to say.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="gradient-border rounded-2xl p-px">
            <div className="bg-navy-900 rounded-2xl p-8 md:p-12 relative">
              {/* Quote icon */}
              <Quote className="absolute top-8 right-8 w-16 h-16 text-electric-blue-500/10" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-white/40 text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-electric-blue-500" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-electric-blue-500/30 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-xl glass-card border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-electric-blue-500/30 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
