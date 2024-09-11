"use client"

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";


interface VideoPlayerProps {
    videoUrl: string;
    courseId: string;
    chapterId: string;
    title: string | undefined;
    nextChapter?: string;
    isLocked: boolean;
    completeOnEnd: boolean;

}


export const VideoPlayer = ({
    videoUrl,
    chapterId,
    nextChapter,
    courseId,
    title,
    isLocked,
    completeOnEnd
}: VideoPlayerProps) => {
     
    
    const [ isReady, setIsReady ] = useState(true)
    return (
        <div className="relative aspect-video">
        {isLocked ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50 text-white text-lg">
                This content is locked. Please subscribe or enroll to the course to access it.
            </div>
        ) : (
            !isReady ? (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <Loader2 className="h-8 w-8 animate-spin text-secondary"/>
                </div>
            ): (
                
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    
                    <video
                        className={cn(
                            "w-full h-full",
                            !isReady && "hidden"
                        )}
                        src={videoUrl}
                        controls
                        onCanPlay={() => setIsReady(true)}
                        onEnded={() => {
                            if (completeOnEnd) {
                                // Handle chapter completion logic here
                            }
                        }}
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        Your browser does not support the video tag.
                    </video>
                    {/* <div className="mt-2">
                        <h2 className="text-xl font-bold">{title}</h2>
                    </div> */}
                </div>
            )
            
        )}
    </div>
    )
}