// "use client"

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, Enroll, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSideBarItems } from "./course-sidebar-items";
import { CourseProgress } from "./course-progress";


interface CourseSideBarProps {
    course: Course & {
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
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }


    // Check if the user is subscribed to the course level
    const freeCourseId = "6610dd85-28fb-4def-9f1e-5bd672ede079";
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

    if (enroll && enroll.courseId === course.id) {
        return (
            <div className="mt-10">
                <CourseProgress
                    variant="success"
                    value={progressCount}
                    size="sm"
                />
            </div>
        )
    }
    

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {/* <p>Progress: {progressCount}%</p> */}
                {/* {Enroll} */}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSideBarItems
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree }
                    />
                ))}
            </div>
            
        </div>
    );
};

export default CourseSideBar