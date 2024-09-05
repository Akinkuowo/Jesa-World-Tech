import { Button } from "@/components/ui/button"

interface CourseEnrollButtonProps  {
    courseId: string
}

export const CourseEnrollButton = ({
    courseId
}: CourseEnrollButtonProps) => {

    return (
        <Button className="w-full md:w-auto bg-yellow-400" size="sm">
            Enroll Course
        </Button>
    )
}