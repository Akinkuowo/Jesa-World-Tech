"use client"

import { UserMenu } from "@/components/user-menu"
import { usePathname } from "next/navigation"
import { SearchInput } from "@/components/search-input"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"
import { ArrowLeft } from "lucide-react"
// import { SearchInput } from "./search-input"


export const NavbarRoutes = () => {
    const pathname = usePathname()
    const { user } = useAuth()
    const isSearchPage = pathname == "/"
    const coursePage = pathname?.includes("/courses")

    return (
        <>
            {isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                {pathname?.includes("/chapters/") ? (
                    <Link
                        href={`/courses/${pathname.split("/")[2]}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Course Overview
                    </Link>
                ) : coursePage ? (
                    <Link
                        href={`/dashboard`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-2"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                ) : null}
                {user ? (
                    <UserMenu />
                ) : (
                    <Link href="/login">
                        <button className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                            Sign In
                        </button>
                    </Link>
                )}
            </div>
        </>
    )
}