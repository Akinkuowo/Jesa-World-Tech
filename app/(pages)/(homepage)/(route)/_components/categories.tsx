"use client"

import { Category } from "@prisma/client"
import { FcEngineering, FcAdvertising, FcMultipleDevices, FcTabletAndroid, FcMusic, FcSportsMode, FcCamera, FcSalesPerformance, FcHighBattery, FcBusinessman, FcPhoneAndroid, FcBusiness } from "react-icons/fc"
import { IconType } from "react-icons/lib"
import CategoryItem from "./category-item"

interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Design": FcCamera,
    "Personal Development": FcSportsMode,
    "Marketing": FcAdvertising,
    "Development": FcBusinessman,
    "Finance & Accounting": FcSalesPerformance,
    "Business": FcBusiness,
    "IT & Software": FcPhoneAndroid

}

const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem 
                    key={item.id}
                    label={item.name}
                    icons={iconMap[item.name]}
                    value={item.id}
                />
            ) )}
        </div>
    )
}

export default Categories