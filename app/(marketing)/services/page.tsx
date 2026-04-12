import { Cloud, Shield, Code2, BarChart3, Network, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I.T. Services | JESA World Technology",
  description: "Explore our full range of professional I.T. services — cloud solutions, cybersecurity, software development, IT consulting, data analytics, and network infrastructure.",
};

const services = [
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    tagline: "Scalable. Secure. Cost-Optimized.",
    description: "We architect, migrate, and manage cloud infrastructure on AWS, Azure, and Google Cloud Platform. Our cloud experts help you right-size your infrastructure, reduce costs, and achieve 99.99% uptime.",
    features: [
      "Cloud architecture design & review",
      "Lift-and-shift & re-architecture migrations",
      "Kubernetes & container orchestration",
      "FinOps — cloud cost optimization",
      "Disaster recovery & business continuity",
      "Managed cloud operations (24/7)",
    ],
    gradient: "from-blue-500 to-cyan-500",
    partners: ["AWS", "Azure", "GCP", "Terraform", "Docker"],
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity",
    tagline: "Protect. Detect. Respond.",
    description: "In an era of sophisticated threats, we provide comprehensive security services — from penetration testing to 24/7 SOC monitoring — ensuring your business is always protected.",
    features: [
      "Penetration testing & vulnerability assessment",
      "Security Operations Center (SOC) — 24/7",
      "SIEM implementation & management",
      "Identity & Access Management (IAM)",
      "Compliance — ISO 27001, PCI-DSS, NDPR",
      "Incident response & forensics",
    ],
    gradient: "from-red-500 to-orange-500",
    partners: ["Splunk", "CrowdStrike", "Palo Alto", "Fortinet", "SentinelOne"],
  },
  {
    id: "software",
    icon: Code2,
    title: "Software Development",
    tagline: "Custom. Scalable. World-Class.",
    description: "We build bespoke software solutions — from MVPs to enterprise platforms — using modern tech stacks and agile methodologies.",
    features: [
      "Web application development",
      "Mobile app development (iOS & Android)",
      "API design & microservices",
      "UI/UX design & prototyping",
      "Legacy system modernization",
      "Technical due diligence",
    ],
    gradient: "from-purple-500 to-pink-500",
    partners: ["Next.js", "React", "Node.js", "Python", "PostgreSQL"],
  },
  {
    id: "consulting",
    icon: Lightbulb,
    title: "IT Consulting",
    tagline: "Strategy. Governance. Transformation.",
    description: "Our seasoned consultants partner with your leadership to develop technology strategies that align with business goals and unlock new growth opportunities.",
    features: [
      "Digital transformation roadmaps",
      "IT strategy & governance",
      "Vendor selection & management",
      "IT due diligence for M&A",
      "Technology budgeting & planning",
      "Change management",
    ],
    gradient: "from-yellow-500 to-amber-500",
    partners: ["ITIL", "COBIT", "ISO 38500", "TOGAF", "Agile"],
  },
  {
    id: "data",
    icon: BarChart3,
    title: "Data Analytics",
    tagline: "Insights. Intelligence. Impact.",
    description: "Turn your data into a competitive advantage with our end-to-end data engineering, analytics, and machine learning solutions.",
    features: [
      "Data warehouse & lake architecture",
      "ETL pipeline development",
      "Business intelligence dashboards",
      "Predictive analytics & ML models",
      "Real-time analytics streaming",
      "Data governance & quality",
    ],
    gradient: "from-green-500 to-emerald-500",
    partners: ["Snowflake", "dbt", "Apache Spark", "PowerBI", "TensorFlow"],
  },
  {
    id: "network",
    icon: Network,
    title: "Network Infrastructure",
    tagline: "Connected. Resilient. Fast.",
    description: "We design, deploy, and manage enterprise network infrastructure — from campus LANs to WAN optimization and SD-WAN implementation.",
    features: [
      "Enterprise LAN/WAN design",
      "SD-WAN deployment & management",
      "WiFi 6/6E deployment",
      "Network security & segmentation",
      "NOC services (24/7 monitoring)",
      "MPLS & connectivity solutions",
    ],
    gradient: "from-blue-500 to-indigo-500",
    partners: ["Cisco", "Fortinet", "Aruba", "Meraki", "Juniper"],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-navy-950 pt-20">
      {/* Page Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blob bg-electric-blue-600 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-electric-blue-400 bg-electric-blue-500/10 border border-electric-blue-500/20 mb-4">
            Our Services
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Enterprise-Grade <span className="gradient-text">I.T. Services</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to your industry, scale, and ambitions.
          </p>
        </div>
      </div>

      {/* Services Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-16">
        {services.map((service, i) => (
          <div
            key={service.id}
            id={service.id}
            className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}
          >
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-6`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-electric-blue-400 text-sm font-medium mb-2">{service.tagline}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h2>
              <p className="text-white/60 leading-relaxed mb-8">{service.description}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-cyan-accent-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300"
              >
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <div className="glass-card rounded-2xl p-8 border border-white/5">
                <h4 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4">Technologies & Partners</h4>
                <div className="flex flex-wrap gap-3">
                  {service.partners.map((p) => (
                    <span key={p} className={`px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r ${service.gradient} bg-opacity-10 text-white border border-white/10`}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
