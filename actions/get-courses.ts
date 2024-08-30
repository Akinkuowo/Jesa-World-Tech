import { Course, Category, Payment } from "@prisma/client";
import { db } from "@/lib/db";
import { GetProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
    subscription: Payment | null;
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
                // Include related Payments (representing subscriptions) for the current user
                Payment: {
                    where: {
                        userId,
                    },
                    include: {
                        courseLevel: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // console.log("Fetched courses:", courses); // Debug lo

        const coursesWithProgress: CourseWithProgressWithCategory[] = await Promise.all(
            courses.map(async (course) => {
                const progress = await GetProgress(course.id, userId);
                const subscription = course.Payment.length > 0 ? course.Payment[0] : null;

                return {
                    ...course,
                    progress,
                    subscription,
                };
                
                
                
            })
        );
        console.log("Courses with progress:", coursesWithProgress);
        return coursesWithProgress;
    } catch (error) {
        console.error("[getCourses]", error);
        return [];
    }
};
