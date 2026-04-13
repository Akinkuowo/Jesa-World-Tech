"use client";

import { BarChart, BookAIcon, BookOpen, BriefcaseBusiness, GanttChartSquare, Home, Layout, List, Newspaper, Radio, User, ShieldCheck, PenTool, Users2, Rocket, LogOut } from "lucide-react"
import { Sidebaritem } from "./sidebaritem";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { logout } from "@/actions/auth";
import toast from "react-hot-toast";

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
        icon: BriefcaseBusiness,
        label: "Manage Jobs",
        href: "/dashboard/admin/jobs"
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
    {
        icon: PenTool,
        label: "Manage Footer",
        href: "/dashboard/admin/footer"
    },
]

export const Sidebarmenu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const onLogout = async () => {
        try {
            await logout();
            toast.success("Logged out");
            router.push("/");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    }
    
    const isTeacherPage = pathname?.includes("/dashboard/teacher");
    const isAdminPage = pathname?.includes("/dashboard/admin");
    
    let menuList = Menu;
    if (isTeacherPage) menuList = teacherMenu;
    if (isAdminPage) menuList = adminMenu;
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col w-full flex-grow">
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
                    <div className="px-3 py-2 border-t mt-4">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Administration</p>
                        <Sidebaritem 
                            icon={ShieldCheck}
                            label="General Admin"
                            href="/dashboard/admin"
                        />
                    </div>
               )}
            </div>
            
            <div className="mt-auto border-t py-2">
                <Sidebaritem 
                    icon={LogOut}
                    label="Sign Out"
                    onClick={onLogout}
                />
            </div>
        </div>
    )
}