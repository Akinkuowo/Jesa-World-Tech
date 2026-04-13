import { getSession } from "@/lib/session";
import { Chapter, Course, Enroll, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { CourseSideBarItems } from "./course-sidebar-items";
import { CourseProgress } from "./course-progress";


interface CourseSideBarProps {
// ... same ...
    course: Course & {
        courseLevel?: {
            name: string;
        } | null;
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
    enroll: Enroll
}

const CourseSideBar = async ({
    course,
    progressCount,
    enroll
}: CourseSideBarProps) => {
    const session = await getSession();
    const userId = session?.userId as string;

    if (!userId) {
        return redirect("/");
    }


    // Check if the user is subscribed to the course level
    const isFreeLevel = course.courseLevel?.name.toLowerCase() === "free";
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
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold mb-2">{course.title}</h1>
                {enroll && enroll.courseId === course.id && (
                    <div className="mt-2">
                        <CourseProgress
                            variant="success"
                            value={progressCount}
                            size="sm"
                        />
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSideBarItems
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !isFreeLevel && !subscription}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseSideBar