"use client"

import { cn } from "@/lib/utils"
// import { icons } from "lucide-react"
import qs from "query-string"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { IconType } from "react-icons/lib"

interface CategoryItemProps {
    label: string,
    value?: string,
    icons?: IconType

}

const CategoryItem = ({
    label,
    value,
    icons: Icon
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
            "py-2 px-3 text-sm border border-slate-200 flex rounded-full items-center gap-x-1 hover:border-sky-700 transition",
            isSelected && "border-sky-700 bg-skg-200/20 text-sky-800"
        )}
        type="button"
        >
            {Icon && <Icon  size={20}/>}
            <div className="truncate">
                {label}
            </div>
        </button>
    )
} 

export default CategoryItem