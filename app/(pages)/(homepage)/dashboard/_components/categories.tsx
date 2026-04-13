"use client"

import { Category } from "@prisma/client"
import { 
    BrainCircuit, 
    Link2, 
    Cloud, 
    ShieldCheck, 
    Database, 
    Infinity, 
    Megaphone, 
    Gamepad2, 
    Cpu, 
    Cog,
    Music,
    Palette,
    Calculator,
    Briefcase,
    Layout,
    Code,
    LucideIcon
} from "lucide-react"
import CategoryItem from "./category-item"

interface CategoriesProps {
    items: Category[]
}

const iconMap: Record<string, LucideIcon> = {
    "Artificial Intelligence": BrainCircuit,
    "Blockchain": Link2,
    "Cloud Computing": Cloud,
    "Cyber Security": ShieldCheck,
    "Data Science": Database,
    "DevOps": Infinity,
    "Digital Marketing": Megaphone,
    "Game Development": Gamepad2,
    "Internet of Things": Cpu,
    "Machine Learning": Cog,
    "Music": Music,
    "Development": Code,
    "Design": Palette,
    "Finance & Accounting": Calculator,
    "Business": Briefcase,
    "IT & Software": Layout
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
                    icon={iconMap[item.name] || Layout}
                    value={item.id}
                />
            ) )}
        </div>
    )
}

export default Categories