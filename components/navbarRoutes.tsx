"use client"

import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { SearchInput } from "@/components/search-input"
// import { SearchInput } from "./search-input"


export const NavbarRoutes = () => {
    const pathname = usePathname()
    const isSearchPage = pathname == "/search"

    return (
        <>
            {!isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )}
            <div className="flex gap-x-2 ml-auto">
                <UserButton />
            </div>
        </>
    )
}