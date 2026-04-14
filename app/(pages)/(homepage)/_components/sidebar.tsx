import Link from "next/link"
import { Logo } from "./logo"
import { Sidebarmenu } from "./sidebarmenu"

export const Sidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
            <div className="p-6">
                <Link href="/" className="flex items-center group cursor-pointer transition-opacity hover:opacity-90">
                    <Logo />
                </Link>
            </div>
            <div className="flex flex-col w-full">
                <Sidebarmenu />
            </div>
           
        </div>
    )
}