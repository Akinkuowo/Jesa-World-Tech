import type { Metadata } from "next";
import { Users, Mail, Linkedin, Twitter, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the experts driving digital transformation across Africa. Our diverse team of engineers, consultants, and strategists.",
  openGraph: {
    title: "Meet the JESA World Technology Team | Expert I.T. Consultants",
    description: "The minds behind the magic — meet the engineers, strategists, and creators building Africa's digital future.",
    type: "profile",
  },
  twitter: {
    title: "The Experts at JESA World Technology",
    description: "Meet the leadership and engineering team transforming businesses across Africa.",
  }
};

export default async function TeamPage() {
  const members = await db.teamMember.findMany({
    orderBy: {
      order: "asc",
    },
  });
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] blob bg-electric-blue-600 opacity-20" />
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-6">
            <Users className="w-4 h-4" />
            <span>The Team</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
            The Minds Behind the <span className="gradient-text">Magic</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto leading-relaxed">
            We are a collective of passionate technologists, strategists, and creators dedicated to pushing the boundaries of what&apos;s possible in the digital age.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-32">
        
        {/* Leadership Section */}
        {members.filter((m: any) => m.order < 10).length > 0 && (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Leadership Hub</h2>
              <p className="text-white/50 max-w-2xl mx-auto">Guiding our vision and ensuring excellence in every delivery.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {members.filter((m: any) => m.order < 10).map((leader: any) => (
                <div key={leader.id} className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col sm:flex-row gap-6 items-start group hover:border-electric-blue-500/30 transition-all duration-300">
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-2xl relative overflow-hidden bg-gradient-to-br ${leader.gradient || 'from-slate-500 to-slate-700'} flex items-center justify-center text-white font-display font-bold text-3xl sm:text-4xl shadow-xl shadow-black/20 group-hover:scale-105 transition-transform duration-500`}>
                    {leader.imageUrl ? (
                      <Image src={leader.imageUrl} alt={leader.name} fill className="object-cover" />
                    ) : (
                      leader.initials || leader.name.charAt(0)
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold text-white mb-1">{leader.name}</h3>
                    <p className="text-electric-blue-400 font-medium text-sm mb-4">{leader.role}</p>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">{leader.bio}</p>
                    <div className="flex items-center gap-3">
                      {leader.linkedinUrl && (
                        <Link href={leader.linkedinUrl} target="_blank" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-electric-blue-600 transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </Link>
                      )}
                      {leader.twitterUrl && (
                        <Link href={leader.twitterUrl} target="_blank" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-electric-blue-600 transition-colors">
                          <Twitter className="w-4 h-4" />
                        </Link>
                      )}
                      <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-electric-blue-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Global Team Section */}
        {members.filter((m: any) => m.order >= 10).length > 0 && (
          <div className="space-y-12 relative">
            <div className="absolute top-1/2 -right-1/4 w-[400px] h-[400px] blob bg-cyan-accent-600 opacity-10" />
            <div className="absolute top-1/4 -left-1/4 w-[300px] h-[300px] blob bg-purple-600 opacity-10" />

            <div className="text-center relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">Engineering & Consulting</h2>
              <p className="text-white/50 max-w-2xl mx-auto">The brilliant specialists executing on the frontlines every single day.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
              {members.filter((m: any) => m.order >= 10).map((member: any) => (
                <div key={member.id} className="glass-card rounded-2xl p-6 border border-white/5 text-center service-card group">
                  <div className={`w-20 h-20 rounded-2xl relative overflow-hidden bg-gradient-to-br ${member.gradient || 'from-slate-500 to-slate-700'} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 group-hover:-translate-y-2 transition-transform duration-300 shadow-lg shadow-black/20`}>
                    {member.imageUrl ? (
                      <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                    ) : (
                      member.initials || member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-white font-semibold mb-1">{member.name}</h3>
                  <p className="text-electric-blue-400 text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {members.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <User2 className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h2 className="text-xl text-white font-semibold">Our team is growing</h2>
            <p className="text-white/40">Check back soon to meet our experts.</p>
          </div>
        )}

        {/* Join CTA */}
        <div className="glass-card rounded-3xl p-12 border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-blue-600/10 to-cyan-accent-600/10 mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="font-display text-3xl font-bold text-white">Want to join the crew?</h2>
            <p className="text-white/70">
              We are constantly looking for talented, driven individuals who are passionate about building the future of technology in Africa.
            </p>
            <div className="pt-4">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-navy-900 font-semibold hover:bg-white/90 transition-colors"
              >
                View Open Positions
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
