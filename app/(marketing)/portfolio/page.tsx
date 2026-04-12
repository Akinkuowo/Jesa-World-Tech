import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio | JESA World Technology",
  description: "Explore JESA World Technology's project portfolio — case studies across cloud, cybersecurity, software development, and more.",
};

const projects = [
  { title: "FinTech Payment Gateway", client: "PayFlow Africa", category: "Software Development", tech: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS"], description: "End-to-end payment processing platform with real-time fraud detection, multi-currency support, and instant settlement across 15 African countries.", gradient: "from-purple-600 to-blue-600", outcome: "340% increase in transaction volume in 6 months" },
  { title: "Government Data Portal", client: "Ministry of Digital Economy", category: "Data Analytics", tech: ["Python", "Django", "Elasticsearch", "Docker", "Azure"], description: "Secure, scalable open-data platform serving millions of citizen requests with advanced analytics and real-time dashboards.", gradient: "from-electric-blue-600 to-cyan-accent-600", outcome: "Won international award for digital transparency" },
  { title: "Cloud Migration & SOC", client: "Apex Insurance Group", category: "Cloud & Cybersecurity", tech: ["AWS", "Terraform", "Splunk", "Python", "Ansible"], description: "Complete AWS cloud migration of legacy on-premises infrastructure plus 24/7 Security Operations Center setup.", gradient: "from-emerald-600 to-teal-600", outcome: "60% infrastructure cost reduction, zero downtime" },
  { title: "Hospital Management System", client: "MedCare Health Network", category: "Software Development", tech: ["React", "Java Spring", "MySQL", "Docker", "Nginx"], description: "Integrated EHR, appointment scheduling, billing, and lab management system deployed across 12 hospital locations.", gradient: "from-pink-600 to-rose-600", outcome: "Reduced patient wait time by 45%" },
  { title: "Smart Campus Network", client: "Tech University", category: "Network Infrastructure", tech: ["Cisco", "Fortinet", "SD-WAN", "Meraki", "RADIUS"], description: "Complete network infrastructure overhaul — SD-WAN, gigabit fiber, managed WiFi 6 across 40 buildings.", gradient: "from-orange-600 to-amber-600", outcome: "10x network performance improvement" },
  { title: "E-Commerce Platform", client: "RetailMax Nigeria", category: "IT Consulting & Dev", tech: ["Next.js", "Shopify", "SAP", "Stripe", "Vercel"], description: "Full digital transformation — custom e-commerce platform, ERP integration, warehouse automation, and CRM.", gradient: "from-violet-600 to-indigo-600", outcome: "340% revenue growth post-launch" },
  { title: "Microfinance Core Banking", client: "Zenith Credit Union", category: "Software Development", tech: ["Java", "Oracle DB", "Spring Boot", "Angular", "RabbitMQ"], description: "Custom core banking system with loan management, mobile banking, and real-time reporting for 200,000+ members.", gradient: "from-teal-600 to-cyan-600", outcome: "Served 200K+ members with 99.98% uptime" },
  { title: "Logistics Tracking Platform", client: "SwiftMove Logistics", category: "Software Development", tech: ["React Native", "Node.js", "MongoDB", "Google Maps", "Firebase"], description: "Real-time fleet tracking, route optimization, and delivery management platform for 5,000+ daily shipments.", gradient: "from-lime-600 to-green-600", outcome: "30% reduction in delivery times" },
  { title: "SOC-as-a-Service", client: "Multiple Clients", category: "Cybersecurity", tech: ["Splunk", "CrowdStrike", "Palo Alto", "Python", "Azure Sentinel"], description: "Managed Security Operations Center providing 24/7 threat monitoring and response for 30+ organizations.", gradient: "from-rose-600 to-red-600", outcome: "Zero successful breaches across client base" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-cyan-accent-400 bg-cyan-accent-500/10 border border-cyan-accent-500/20 mb-4">
            Our Work
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Project <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Real solutions. Real impact. A selection of the work we&apos;re proud of.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="group glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300 service-card flex flex-col">
              <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/60 border border-white/10 mb-4">
                  {project.category}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-electric-blue-300 transition-colors">{project.title}</h3>
                <p className="text-white/40 text-xs mb-3">Client: {project.client}</p>
                <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
                {/* Outcome */}
                <div className={`px-3 py-2 rounded-lg bg-gradient-to-r ${project.gradient} bg-opacity-10 border border-white/5 mb-4`}>
                  <p className="text-white/70 text-xs"><span className="text-white font-medium">Outcome: </span>{project.outcome}</p>
                </div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-xs rounded bg-white/5 text-white/40 border border-white/5">{t}</span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1 text-electric-blue-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-3.5 h-3.5" /> View Case Study
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
