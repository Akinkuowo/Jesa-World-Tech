"use client"

import { Search } from "lucide-react"
import { Input } from "./ui/input"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import qs from "query-string"


export const SearchInput = () => {
    const [ value, setValue ] = useState("")
    const debounceValue = useDebounce(value)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const currentCategoryId = searchParams.get("categoryId")

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debounceValue
            }
        }, {skipEmptyString: true, skipNull: true})

        router.push(url)
    }, [debounceValue, router, pathname, currentCategoryId])
    return (
        <div className="relative">
            <Search 
                className="w-4 h-4 top-3 text-slate-600 left-3 absolute"
            />
            <Input 
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200"
                placeholder="Search for a course"
            />
        </div>
    )
}