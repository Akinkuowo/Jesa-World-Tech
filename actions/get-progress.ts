import { db } from "@/lib/db";

export const GetProgress = async (
    userId: string,
    courseId: string,

): Promise<number> => {
    try{
        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,

            },
            select: {
                id: true
            }
        })

        const publishedChaptersId = publishedChapters.map((chapter) => chapter.id)

        const validCompletedChapter = await db.userProgress.count({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChaptersId
                },
                isCompleted: true
            }
        })

        const progressPecentage = (validCompletedChapter / publishedChaptersId.length) * 100

        return progressPecentage;
    }catch(error){
        console.log(["getProgress"], error)
        return 0
    }
}