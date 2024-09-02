import { Course, Category, Level } from "@prisma/client";
import { db } from "@/lib/db";
import { GetProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
    level: Level | null; // Include Level
};

type GetCourse = {
    userId: string;
    title?: string;
    categoryId?: string;
};

export const getCourse = async ({
    userId,
    title,
    categoryId,
}: GetCourse): Promise<CourseWithProgressWithCategory[]> => {
    try {
        const courses = await db.course.findMany({
            where: {
                isPublished: true,
                title: title ? { contains: title } : undefined,
                categoryId,
            },
            include: {
                category: true,
                chapters: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
                payments: {
                    where: {
                        userId,
                    },
                },
                courseLevel: true, // Fetch Level details
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const coursesWithProgress = await Promise.all(
            courses.map(async (course) => {
                const progress = await GetProgress(course.id, userId);
                return {
                    ...course,
                    progress,
                    level: course.courseLevel, // Include Level
                };
            })
        );

        // Debug log

        return coursesWithProgress;
    } catch (error) {
        console.error("[getCourse error]", error);
        return [];
    }
};
