import { Course, Attachment, Chapter } from "@prisma/client";
import { db } from "@/lib/db";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
    course: Course & {
        courseLevel?: {
            name: string;
        } | null;
    };
}

export const GetChapter = async ({
    userId,
    courseId,
    chapterId,
    course
}: GetChapterProps) => {
    try {
        // Check if the course levelId is valid before querying
        if (!course.levelId) {
            console.log("Invalid course levelId.");
            return {
                chapter: null,
                course: null,
                muxData: null,
                attachments: [],
                nextChapter: null,
                userProgress: null,
                subscription: null,
                lockedMessage: "Course levelId is invalid."
            };
        }

        // Check if the user is subscribed to the course's level (only if level is not "Free")
        let subscription = null;
        const isFreeLevel = course.courseLevel?.name.toLowerCase() === "free";

        if (!isFreeLevel) {
            subscription = await db.subscription.findUnique({
                where: {
                    userId_courseLevelId: {
                        userId: userId,
                        courseLevelId: course.levelId!
                    }
                }
            });
        }

        // Fetch the course and chapter
        const fetchedCourse = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId,
            },
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                courseId: courseId,
                isPublished: true
            }
        });

        if (!chapter) {
            return {
                chapter: null,
                course: fetchedCourse,
                muxData: null,
                attachments: [],
                nextChapter: null,
                userProgress: null,
                subscription,
                lockedMessage: "Chapter not found."
            };
        }

        let muxData = null;
        let attachments: Attachment[] = [];
        let nextChapter: Chapter | null = null;

        if (chapter.isFree || subscription || isFreeLevel) {
            muxData = await db.muxData.findUnique({
                where: {
                    chapterId: chapterId
                }
            });

            nextChapter = await db.chapter.findFirst({
                where: {
                    courseId: courseId,
                    isPublished: true,
                    position: {
                        gt: chapter?.position
                    }
                },
                orderBy: {
                    position: "asc"
                }
            });

            if (subscription) {
                attachments = await db.attachment.findMany({
                    where: {
                        courseId: courseId        
                    }
                });
            }
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                chapterId_userId: {
                    userId,
                    chapterId
                }
            }
        });

        return {
            chapter,
            course: fetchedCourse,
            muxData,
            attachments,
            nextChapter,
            userProgress,
            subscription,
            lockedMessage: null // Clear message if everything is fine
        };
    } catch (error) {
        console.error("[getChapter error]", error);
        return {
            chapter: null,
            course: null,
            muxData: null,
            attachments: [],
            nextChapter: null,
            userProgress: null,
            subscription: null,
            lockedMessage: "An error occurred while fetching the chapter."
        };
    }
};
