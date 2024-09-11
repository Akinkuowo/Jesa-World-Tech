import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    try {
        // Authenticate the user
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the course exists and is published
        const course = await db.course.findUnique({
            where: {
                id: params.courseId
            }
        });

        if (!course || !course.isPublished) {
            return new NextResponse("Course not found or not published", { status: 404 });
        }

        // Check if the user has already enrolled in this course
        const enroll = await db.enroll.findUnique({
            where: {
                userId_courseId: {
                    userId: userId,
                    courseId: params.courseId
                }
            }
        });

        if (enroll) {
            return new NextResponse("User already enrolled in this course", { status: 200 });
        }

        // Handle creating a new enrollment
        await db.enroll.create({
            data: {
                userId: userId,
                courseId: params.courseId,
                courseLevelId: course.levelId as string
                // Add other necessary fields if required
            }
        });

        // Unlock all chapters for the course by setting isFree to true
        await db.chapter.updateMany({
            where: {
                courseId: params.courseId,
                isFree: false  // Only update locked chapters
            },
            data: {
                isFree: true
            }
        });

        return new NextResponse("Course Enrollment successful and all chapters unlocked", { status: 201 });

    } catch (error) {
        console.error("[Course Enrollment]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
