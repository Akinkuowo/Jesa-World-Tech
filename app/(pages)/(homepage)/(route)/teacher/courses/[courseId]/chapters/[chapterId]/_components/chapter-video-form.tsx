"use client"

import * as z from "zod";
import axios from "axios";
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import{ Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle, Video, VideoIcon } from "lucide-react";
import { useState } from "react";
import { Chapter, MuxData } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

 const formFormat = z.object({
    videoUrl: z.string().min(1),

 })

interface ChapterVideoFormProps {
    initialData: Chapter 
    courseId: string;
    chapterId: string;
}

export const ChapterVideoForm = ({
    initialData, 
    courseId,
    chapterId
}: ChapterVideoFormProps) => {
    
    const [ isEditing, setIsEditing ] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)
    const router = useRouter();
    const videoUrl = `${initialData.videoUrl}`

    const onSubmit = async (values: z.infer<typeof formFormat>) => {
        // console.log(values)
        try{
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            console.log(response)
            toast.success("Chapter Updated", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }
            })
            toggleEditing();
            router.refresh();
        }
        catch{
            toast.error("Something went wrong", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
        }
    }
    
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Video 
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.videoUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add a video
                        </>
                    )}
                    {!isEditing && initialData.videoUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2"/>
                            Change Chapter video   
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                !initialData.videoUrl ? (
                    <div className="flex item-center justify-center h-60 bg-slate-200 rounded-md">
                        <Video className="h-10 w-10 text-slate-500"/>
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                       <CldVideoPlayer
                            width="1920"
                            height="1080"
                            src={videoUrl}
                        />
                    </div>
                )
            )}
            {isEditing && (
                <div>
                    <FileUpload 
                        endpoint="chapterVideos"
                        onChange={(url) => {
                            if(url) {
                                onSubmit({ videoUrl: url })
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        Upload this chapters's video
                    </div>
                </div>
            )}
            {initialData.videoUrl && !isEditing && (
                <div className="text-xs text-muted-foreground mt-2">
                    Videos can take a few minutes to process. Refresh the page if video those not appear.
                </div>
            )}
        </div>
    )
}