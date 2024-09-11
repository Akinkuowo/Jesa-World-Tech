import { Progress } from "@/components/ui/progress"

interface CourseProgressProps {
    value: number
    variant: "default" | "success"
    size: "default" | "sm"
}

const colorbyVariant = {
    default: "text-sky-700",
    success: "text-emerald-700"
}

const sizebyVariant = {
    default: "text-sm",
    sm: "text-xs"
}

export const CourseProgress = ({
    value,
    variant,
    size
}: CourseProgressProps) => {
    return (
        <div>
            CourseProgress
            <Progress 
                value={70}
                className="h-2" 
            />
        </div>
    )
}