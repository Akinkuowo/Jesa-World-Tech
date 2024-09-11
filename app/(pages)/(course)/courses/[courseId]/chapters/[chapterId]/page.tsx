import { GetChapter } from "@/actions/get-chapter";
import { auth } from "@clerk/nextjs/server";
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

const ChapterIdPage = async ({
    params
}: { 
    params: { courseId: string; chapterId: string; }
}) => {
    const { userId } = auth() || {};

    if (!userId) {
        return redirect("/");
    }

    // Fetch the course object from the database
    const course = await db.course.findUnique({
        where: { id: params.courseId }
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

    const freeCourseId = "6610dd85-28fb-4def-9f1e-5bd672ede079";

    // Check if the chapter is locked based on the subscription and the chapter's free status
    const isLocked = subscription?.courseLevelId !== course.levelId  && !subscription && course.levelId !== freeCourseId;
    const needToEnroll = subscription?.courseLevelId === course.levelId || course.levelId === freeCourseId && !chapter?.isFree 
    const completeOnEnd = !!subscription && !userProgress?.isCompleted;

    console.log(!subscription)
    console.log(subscription?.courseLevelId !== course.levelId)
    console.log(course.levelId !== freeCourseId)
    console.log(isLocked)


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
                <div className="p4">
                    <VideoPlayer 
                        chapterId={params.chapterId}
                        title={chapter?.title}
                        courseId={params.courseId}
                        nextChapter={nextChapter?.id}
                        isLocked={isLocked}
                        completeOnEnd={completeOnEnd}
                        videoUrl={chapter?.videoUrl!}
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
