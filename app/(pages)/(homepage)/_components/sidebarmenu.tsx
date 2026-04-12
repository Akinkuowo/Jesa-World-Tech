"use client"

import { BarChart, BookAIcon, BookOpen, BriefcaseBusiness, GanttChartSquare, Home, Layout, List, Newspaper, Radio, User } from "lucide-react"
import { Sidebaritem } from "./sidebaritem";
import { usePathname } from "next/navigation";

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

export const Sidebarmenu = () => {
    const pathname = usePathname();
    const isTeacherPage = pathname?.includes("/dashboard/teacher")
    const menuList = isTeacherPage ? teacherMenu : Menu;
    
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
           
        </div>
    )
}