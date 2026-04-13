import { GetChapter } from "@/actions/get-chapter";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Banner } from "@/components/banner";
import { VideoPlayer } from "./_components/video-player";
import { CourseSubscriptionButton } from "./_components/course-subscription-button";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import Link from "next/link";
import { File } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata(
    props: { 
        params: Promise<{ courseId: string; chapterId: string; }>
    }
): Promise<Metadata> {
    const params = await props.params;
    const { chapter, course } = await GetChapter({
        userId: "seo", // Placeholder for metadata generation context
        courseId: params.courseId,
        chapterId: params.chapterId,
        course: { levelId: "any" } as any // Minimal context for common getChapter logic
    });

    if (!chapter || !course) {
        return {
            title: "Course Chapter",
        };
    }

    return {
        title: `${chapter.title} | ${course.title}`,
        description: chapter.description?.substring(0, 160) || `Learn ${chapter.title} in the ${course.title} course at JESA World Technology.`,
        openGraph: {
            title: `${chapter.title} | ${course.title}`,
            description: chapter.description?.substring(0, 160) || `Learn ${chapter.title} in the ${course.title} course.`,
            type: "article",
        }
    };
}

const ChapterIdPage = async (
    props: { 
        params: Promise<{ courseId: string; chapterId: string; }>
    }
) => {
    const params = await props.params;
    const session = await getSession();
    const userId = session?.userId as string;

    if (!userId) {
        return redirect("/");
    }

    // Fetch the course object from the database
    const course = await db.course.findUnique({
        where: { id: params.courseId },
        include: { courseLevel: true }
    });

    if (!course) {
        return redirect("/404"); // Handle the case where the course is not found
    }

    // Fetch the enrollment record for the course and user
    const enroll = await db.enroll.findFirst({
        where: {
            courseId: params.courseId,
            userId: userId, // Ensure we query based on user and course
        }
    });

    const {
        chapter,
        muxData,
        attachments,
        nextChapter,
        userProgress,
        subscription,
        lockedMessage
    } = await GetChapter({
        userId,
        chapterId: params.chapterId,
        courseId: params.courseId,
        course  // Pass the actual course object here
    });

    const isFreeLevel = course.courseLevel?.name.toLowerCase() === "free";

    // Check if the chapter is locked based on the subscription and the chapter's free status
    const isLocked = !isFreeLevel && !subscription;
    const needToEnroll = (subscription?.courseLevelId === course.levelId || isFreeLevel) && !chapter?.isFree;
    const completeOnEnd = !!subscription && !userProgress?.isCompleted;

    console.log("isFreeLevel:", isFreeLevel);
    console.log("subscription:", !!subscription);
    console.log("isLocked:", isLocked);


    if (!chapter) {
        return redirect(`/courses/${params.courseId}`);
    }

    return (
        <div>
            {userProgress?.isCompleted && (
                <Banner 
                    label="You have already completed this chapter"
                    variant="success"
                />
            )}
            {!isLocked && (
                <Banner 
                    label="This course is fully accessible"
                    variant="success"
                />
            )}
            {isLocked && (
                <Banner 
                    label="This chapter is locked. Please subscribe to access it."
                    variant="warning"
                />
            )}
            <div className="flex flex-col max-w-4xl mx-auto pb-20">
                <div className="p-4">
                    <VideoPlayer 
                        chapterId={params.chapterId}
                        title={chapter?.title}
                        courseId={params.courseId}
                        nextChapter={nextChapter?.id}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                        videoUrl={chapter?.videoUrl || ""}
                        playbackId={muxData?.playbackId}
                    />
                </div>
            </div>
            <div>
                <div className="p-4 flex flex-col md:flex-row items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-2">
                        {chapter?.title}
                    </h2>
                    {!isLocked ? (
                        <CourseEnrollButton 
                            courseId={course.id}
                            chapterId={chapter?.id}
                            isLocked={isLocked}
                            enroll={enroll} // Pass the enroll object here
                        />
                    ) : (
                        <CourseSubscriptionButton />
                    )}
                </div>
                <Separator />
                <div>
                    <Preview value={chapter?.description!} />
                </div>
                {!!attachments.length && (
                    <>
                        <Separator />
                        <div className="p-4">
                            {attachments.map((attachment) => (
                                <Link 
                                    href={attachment.url}
                                    target="_blank"
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                                >
                                    <File />
                                    <p className="line-clamp-1">
                                        {attachment.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChapterIdPage;
