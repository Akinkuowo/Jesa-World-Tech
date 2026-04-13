"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
// import {  } from "next/router";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href?: string;      
    onClick?: () => void;
}

export const Sidebaritem = ({
    icon: Icon, 
    label, 
    href,
    onClick
}: SidebarItemProps) =>{
    const pathname = usePathname();
    const router = useRouter();

    const isActive = 
    href ? ((pathname === "/" && href === "/") || 
    pathname === href || 
    (href !== "/dashboard" && href !== "/dashboard/admin" && href !== "/" && pathname?.startsWith(`${href}/`))) : false;

    const onHandleClick = () => {
        if (onClick) {
            onClick();
            return;
        }
        if (href) {
            router.push(href)
        }
    }

    return (
        <button    
            onClick={onHandleClick}
            type="button"
            className={cn(
                "flex items-center gap-x-2 text-slate-600 text-sm font-[500] pl-6 transition-all hover:text-slate-800 hover:bg-slate-300/10",
                isActive && "text-electric-blue-600 bg-electric-blue-500/10 hover:bg-electric-blue-500/20 hover:text-electric-blue-700"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon 
                    size={22}
                    className={cn(
                      "text-slate-500",
                      isActive && "text-electric-blue-600"  
                    )}
                />
                {label}
            </div>
            <div 
                className={cn(
                    "ml-auto opacity-0 border border-electric-blue-600 h-full transition-all", 
                    isActive && "opacity-100"
                )} 
            
            />
        </button>
    )
} 