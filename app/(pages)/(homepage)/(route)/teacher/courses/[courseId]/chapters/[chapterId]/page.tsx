import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"

import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { IconBadge } from "@/components/icon-badge";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterDesForm } from "./_components/chapter-des-form";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";

const ChapterIdPage = async ({
    params
 } : {
        params: { courseId: string; chapterId: string }
}) => {

    const { userId } = auth()

    if(!userId){
        return redirect("/")
    }

    const chapter = await db.chapter.findUnique({
        where: {
            id: params.chapterId,
            courseId: params.courseId
        },
        include: {
            muxData: true
        }
    })

    
    if(!chapter) {
        return redirect("/")
    }

    const requiredField = [
        chapter?.title,
        chapter?.description,
        chapter?.videoUrl
    ]

    const totalFileds = requiredField.length
    const completedFields = requiredField.filter(Boolean).length

    const completedText = `(${completedFields} / ${totalFileds})`

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="w-full">
                    <Link
                        href={`/teacher/courses/${params.courseId}`}
                        className="flex items-center text-sm hover:opacity-75 transition mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2"/>
                        Back to Course Setup
                    </Link>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-2xl font-meduim">Chapter Creation</h1>
                            <span className="text-sm text-slate-700">Complete all fields {completedText}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge icon={LayoutDashboard} />
                            <h2 className="text-xl">Customize your chapter</h2>
                        </div>
                        <ChapterTitleForm 
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                        <ChapterDesForm 
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge 
                                icon={Eye}
                            />
                            <h2 className="text-xl">
                                Access Settings
                            </h2>
                        </div>
                        <ChapterAccessForm 
                            initialData={chapter}
                            courseId={params.courseId}
                            chapterId={params.chapterId}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge 
                            icon={Video}
                        />
                        <h2 className="text-xl">Add a Video</h2>
                    </div>
                    <ChapterVideoForm 
                        initialData={chapter}
                        courseId={params.courseId}
                        chapterId={params.chapterId}
                    />
                </div>
            </div>
        </div>
    )
}
 
export default ChapterIdPage