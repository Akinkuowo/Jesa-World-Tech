import { db } from "@/lib/db";
import { PenTool, Rocket, Users2 } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const [projectCount, blogCount, teamCount] = await Promise.all([
    db.project.count(),
    db.blogPost.count(),
    db.teamMember.count(),
  ]);

  const stats = [
    { label: "Total Projects", value: projectCount, icon: Rocket, href: "/dashboard/admin/projects", color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Blog Posts", value: blogCount, icon: PenTool, href: "/dashboard/admin/blog", color: "text-pink-600", bg: "bg-pink-100" },
    { label: "Team Members", value: teamCount, icon: Users2, href: "/dashboard/admin/team", color: "text-orange-600", bg: "bg-orange-100" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.label} 
            href={stat.href}
            className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-navy-950">{stat.value}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 border border-dashed border-slate-300 text-center">
        <h2 className="text-lg font-semibold text-navy-900 mb-2">Welcome to the Marketing Dashboard</h2>
        <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
          Here you can control the dynamic content shown on the public-facing pages of JESA World Technology. Select a category above to start managing your data.
        </p>
        <div className="flex justify-center gap-4">
           <Link href="/portfolio" className="text-sm font-medium text-blue-600 hover:underline">View Public Portfolio</Link>
           <span className="text-slate-300">|</span>
           <Link href="/blog" className="text-sm font-medium text-blue-600 hover:underline">View Public Blog</Link>
           <span className="text-slate-300">|</span>
           <Link href="/team" className="text-sm font-medium text-blue-600 hover:underline">View Public Team</Link>
        </div>
      </div>
    </div>
  );
}
