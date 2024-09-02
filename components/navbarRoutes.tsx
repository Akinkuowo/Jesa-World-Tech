"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { SearchInput } from "@/components/search-input"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
// import { SearchInput } from "./search-input"


export const NavbarRoutes = () => {
    const pathname = usePathname()
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
                {coursePage && (
                    <Link
                    href={`/`}
                    className="flex items-center text-sm hover:opacity-75 transition mb-2"
                >
                    <ArrowLeft className="w-4 h-4 mr-2"/>
                    Back to Course Page
                </Link>
                )}
                <UserButton />
            </div>
        </>
    )
}