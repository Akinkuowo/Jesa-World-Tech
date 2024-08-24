"use client"

import { BarChart, BookAIcon, BookOpen, BriefcaseBusiness, GanttChartSquare, Home, Layout, List, Newspaper, Radio, User } from "lucide-react"
import { Sidebaritem } from "./sidebaritem";
import { usePathname } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";

const Menu = [
    {
        icon: Home,
        label: "Home",
        href: "/"
    },
    {
        icon: Radio,
        label: "Live Class",
        href: "/live-class"
    },
    {
        icon: BookOpen,
        label: "Courses",
        href: "/courses"
    },
    {
        icon: GanttChartSquare,
        label: "Plan",
        href: "/plan"
    },
    {
        icon: Newspaper,
        label: "News",
        href: "/news"
    },
    {
        icon: BriefcaseBusiness,
        label: "Careers",
        href: "/careers"
    },
    
    
]

const LoginMenu = [
    {
        icon: Home,
        label: "Home",
        href: "/"
    },
    {
        icon: Radio,
        label: "Live Class",
        href: "/live-class"
    },
    {
        icon: BookOpen,
        label: "Courses",
        href: "/courses"
    },
    {
        icon: GanttChartSquare,
        label: "Plan",
        href: "/plan"
    },
    {
        icon: Newspaper,
        label: "News",
        href: "/news"
    },
    {
        icon: BriefcaseBusiness,
        label: "Careers",
        href: "/careers"
    },
    
    
] 

const teacherMenu = [
    {
        icon: List,
        label: "Courses",
        href: "/teacher/courses"
    },
    {
        icon: BarChart,
        label: "Analystics",
        href: "/teacher/analystics"
    },
]

export const Sidebarmenu = () => {
    const pathname = usePathname();
    // const userId = auth();
    // const LoggedInMenu = userId ? LoginMenu : Menu
    const isTeacherPage = pathname?.includes("/teacher")
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