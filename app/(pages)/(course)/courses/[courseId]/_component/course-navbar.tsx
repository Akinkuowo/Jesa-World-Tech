
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, Enroll, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSideBarItems } from "./course-sidebar-items";
import { NavbarRoutes } from "@/components/navbarRoutes";
import { CourseMobileSidebar } from "./course-mobile-sidebar";

interface CourseNavBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
    Enroll: Enroll
}

const CourseNavBar = async ({
    course,
    progressCount,
    Enroll
}: CourseNavBarProps) => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    // Check if the user is subscribed to the course level
    let subscription = null;
    try {
        subscription = await db.subscription.findUnique({
            where: {
                userId_courseLevelId: {
                    userId: userId,
                    courseLevelId: course.levelId || "" // Ensure this is valid
                }
            },
        });
    } catch (error) {
        console.error("Error fetching subscription:", error);
    }

    return (
        <>
            <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
                <CourseMobileSidebar
                    course={course}
                    progressCount={progressCount} 
                    Enroll={Enroll}                
                />
                <NavbarRoutes />
            </div>
            
        </>
    );
};

export default CourseNavBar;
