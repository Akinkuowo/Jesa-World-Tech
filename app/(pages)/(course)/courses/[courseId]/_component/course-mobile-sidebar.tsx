import { Chapter, Course, UserProgress, Enroll } from "@prisma/client"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import  CourseSideBar  from "./course-sidebar"

interface CourseMobileSidebarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[];
    },
    progressCount: number
    Enroll?: Enroll 
}

export const CourseMobileSidebar = ({
    course,
    progressCount, 
    Enroll
}: CourseMobileSidebarProps) => {
    return(
    <Sheet>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-white w-72">
            <CourseSideBar 
                    course={course}
                    progressCount={progressCount} 
                    enroll={Enroll ?? {
                        id: '',
                        userId: '',
                        courseLevelId: '',
                        courseId: '',
                        createdAt: new Date(),
                        updatedAt: new Date()
                      }}           />
        </SheetContent>
    </Sheet>
    )
    // return (
    //     <div>
    //         Course Mobile Sidebar 
    //     </div>
    // )
}