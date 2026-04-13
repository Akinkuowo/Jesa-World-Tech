"use client"

import Link from "next/link"

export const CourseSubscriptionButton = ()=> {

    return (
        <div>
             <Link href="/dashboard/plan" className="bg-electric-blue-600 hover:bg-electric-blue-700 text-white font-semibold py-2 px-4 rounded transition w-full md:w-auto text-center block md:inline-block">
                Subscribe to have access
             </Link>
        </div>
    )
}