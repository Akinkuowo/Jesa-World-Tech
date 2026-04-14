import { Award, Users, Target, TrendingUp, Globe, Shield, User2 } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about JESA World Technology — our mission, story, values, and the expert team driving Africa's digital transformation.",
  openGraph: {
    title: "About JESA World Technology | Our Mission & Story",
    description: "Discover how we are powering digital transformation across Africa since 2016.",
    type: "website",
  },
  twitter: {
    title: "About JESA World Technology",
    description: "Learn about our mission to provide world-class technology solutions in Africa.",
  }
};

const values = [
  { icon: Award, title: "Excellence", description: "We hold ourselves to world-class standards in every engagement, ensuring quality outcomes that exceed expectations.", gradient: "from-amber-500 to-yellow-500" },
  { icon: Users, title: "Partnership", description: "We are not just vendors — we are long-term partners invested in your success, growing alongside your business.", gradient: "from-electric-blue-500 to-cyan-accent-500" },
  { icon: Target, title: "Innovation", description: "We stay ahead of the technology curve, constantly learning and adopting emerging tools that create competitive advantages.", gradient: "from-purple-500 to-pink-500" },
  { icon: Shield, title: "Integrity", description: "Transparent communication, honest pricing, and ethical practices underpin every client relationship.", gradient: "from-green-500 to-emerald-500" },
  { icon: Globe, title: "Impact", description: "We measure success by the real-world impact our work creates — for our clients, their customers, and African society.", gradient: "from-red-500 to-orange-500" },
  { icon: TrendingUp, title: "Growth", description: "We champion continuous learning and invest in our team's professional development, creating a culture of excellence.", gradient: "from-indigo-500 to-blue-500" },
];

const milestones = [
  { year: "2016", event: "Company founded in Lagos, Nigeria with a team of 5" },
  { year: "2018", event: "Crossed 50 enterprise clients" },
  { year: "2020", event: "Launched 24/7 Security Operations Center (SOC)" },
  { year: "2022", event: "Expanded to East Africa; team grew to 40+" },
  { year: "2024", event: "Achieved ISO 27001 certification; 150+ clients served" },
  { year: "2025", event: "Launched JESA Academy — I.T. skills training platform" },
];

export default async function AboutPage() {
  const team = await db.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 blob bg-electric-blue-700 opacity-15" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
            About Us
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Africa&apos;s <span className="gradient-text">Trusted</span> I.T. Partner
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Since 2016, we have been powering digital transformation across Africa — one innovative solution at a time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-24">
        {/* Mission & Story */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>JESA World Technology was born out of a simple but powerful conviction: African businesses deserve access to the same world-class technology solutions that power global enterprises.</p>
              <p>Founded in 2016 by a team of seasoned technology professionals, we started with five people, a small office in Lagos, and an outsized ambition to transform how businesses across the continent leverage technology.</p>
              <p>Today, we are a team of 50+ engineers, consultants, and specialists serving over 150 clients across 8 African countries — and growing.</p>
              <p>Our success is rooted in a deep commitment to quality, an understanding of the African business context, and an unrelenting focus on delivering measurable outcomes for our clients.</p>
            </div>
          </div>
          <div>
            {/* Timeline */}
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue-600 to-cyan-accent-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-white/10 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-electric-blue-400 text-xs font-medium mb-1">{m.year}</div>
                    <div className="text-white/70 text-sm">{m.event}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">Our Values</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">What Drives Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass-card rounded-2xl p-6 border border-white/5 service-card">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.gradient} flex items-center justify-center mb-4`}>
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team — fetched from backend */}
        <div>
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">Our Team</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Leadership</h2>
          </div>
          {team.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member: any) => (
                <div key={member.id} className="glass-card rounded-2xl p-6 border border-white/5 text-center service-card group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient || "from-slate-500 to-slate-700"} flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/20`}>
                    {member.imageUrl ? (
                      <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                    ) : (
                      member.initials || member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <p className="text-electric-blue-400 text-xs mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-white/50 text-xs leading-relaxed">{member.bio}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <User2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Our team is growing</h3>
              <p className="text-white/40 text-sm mt-1">Check back soon to meet our experts.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
