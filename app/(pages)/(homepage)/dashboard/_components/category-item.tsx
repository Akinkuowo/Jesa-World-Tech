"use client"

import { cn } from "@/lib/utils"
// import { icons } from "lucide-react"
import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons/lib"

interface CategoryItemProps {
    label: string,
    value?: string,
    icon?: IconType
}

const CategoryItem = ({
    label,
    value,
    icon: Icon
}: CategoryItemProps) => {
    const onPathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategoryId = searchParams.get("categoryId")
    const currentTitle = searchParams.get("title")

    const isSelected = currentCategoryId == value

    const onClick = () => {
        const url = qs.stringifyUrl({
            url: onPathName,
            query: {
                title: currentTitle,
                categoryId: isSelected ? null : value
            }
        }, {skipNull: true, skipEmptyString: true})

        router.push(url)
    }

    return (
        <button 
            onClick={onClick}
            className={cn(
                "py-2 px-4 text-xs md:text-sm border border-slate-200 flex rounded-full items-center gap-x-2 hover:border-electric-blue-500 hover:bg-slate-50 transition-all duration-200",
                isSelected && "border-electric-blue-600 bg-electric-blue-500/10 text-electric-blue-700 font-medium"
            )}
            type="button"
        >
            {Icon && <Icon size={18} className={cn(isSelected && "text-electric-blue-600")} />}
            <div className="truncate whitespace-nowrap">
                {label}
            </div>
        </button>
    )
} 

export default CategoryItem