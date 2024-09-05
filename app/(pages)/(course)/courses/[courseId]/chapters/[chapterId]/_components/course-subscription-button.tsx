"use client"

import Link from "next/link"

export const CourseSubscriptionButton = ()=> {

    return (
        <div>
             <Link href="/plan" className="bg-yellow-400 text-white font-semibold py-2 px-4 rounded w-full md:w-auto ">Subscribe to have access</Link>
        </div>
    )
}