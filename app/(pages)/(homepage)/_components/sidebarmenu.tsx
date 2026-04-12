import { BarChart, BookAIcon, BookOpen, BriefcaseBusiness, GanttChartSquare, Home, Layout, List, Newspaper, Radio, User, ShieldCheck, PenTool, Users2, Rocket } from "lucide-react"
import { Sidebaritem } from "./sidebaritem";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

const Menu = [
    {
        icon: Home,
        label: "Home",
        href: "/"
    },
    {
        icon: Layout,
        label: "Dashboard",
        href: "/dashboard"
    },
    {
        icon: BookOpen,
        label: "My Courses",
        href: "/dashboard/courses"
    },
    {
        icon: GanttChartSquare,
        label: "Subscription",
        href: "/dashboard/plan"
    },
    {
        icon: Radio,
        label: "Live Class",
        href: "/dashboard/live-class"
    },
    {
        icon: Newspaper,
        label: "Internal News",
        href: "/dashboard/news"
    },
    {
        icon: BriefcaseBusiness,
        label: "Admin Careers",
        href: "/dashboard/careers"
    },
]


const teacherMenu = [
    {
        icon: List,
        label: "My Teaching",
        href: "/dashboard/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/dashboard/teacher/analytics"
    },
]

const adminMenu = [
    {
        icon: ShieldCheck,
        label: "Admin Overview",
        href: "/dashboard/admin"
    },
    {
        icon: Rocket,
        label: "Manage Projects",
        href: "/dashboard/admin/projects"
    },
    {
        icon: PenTool,
        label: "Manage Blog",
        href: "/dashboard/admin/blog"
    },
    {
        icon: Users2,
        label: "Manage Team",
        href: "/dashboard/admin/team"
    },
]

export const Sidebarmenu = () => {
    const pathname = usePathname();
    const { user } = useAuth();
    
    const isTeacherPage = pathname?.includes("/dashboard/teacher");
    const isAdminPage = pathname?.includes("/dashboard/admin");
    
    let menuList = Menu;
    if (isTeacherPage) menuList = teacherMenu;
    if (isAdminPage) menuList = adminMenu;
    
    return (
        <div className="flex flex-col w-full">
           {
           menuList.map((menu) =>(
                <Sidebaritem 
                    key={menu.href}
                    icon={menu.icon}
                    label={menu.label}
                    href={menu.href}
                />
           ))
           }
           {user?.role === "ADMIN" && !isAdminPage && !isTeacherPage && (
                <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Administration</p>
                    <Sidebaritem 
                        icon={ShieldCheck}
                        label="General Admin"
                        href="/dashboard/admin"
                    />
                </div>
           )}
        </div>
    )
}