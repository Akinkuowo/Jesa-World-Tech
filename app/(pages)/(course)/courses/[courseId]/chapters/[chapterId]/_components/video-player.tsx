"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
    videoUrl: string;
    courseId: string;
    chapterId: string;
    playbackId?: string | null;
    title: string | undefined;
    nextChapter?: string;
    isLocked: boolean;
    completeOnEnd: boolean;
}

export const VideoPlayer = ({
    videoUrl,
    chapterId,
    playbackId,
    nextChapter,
    courseId,
    title,
    isLocked,
    completeOnEnd
}: VideoPlayerProps) => {
    const [isReady, setIsReady] = useState(false);

    return (
        <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
            {isLocked ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 text-white gap-y-4 px-6 text-center">
                    <div className="p-4 rounded-full bg-slate-800/50">
                        <Loader2 className="h-10 w-10 text-slate-400" />
                    </div>
                    <p className="text-lg font-medium">
                        This content is locked. Please subscribe or enroll to access it.
                    </p>
                </div>
            ) : (
                <>
                    {!isReady && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                            <Loader2 className="h-12 w-12 animate-spin text-electric-blue-600" />
                        </div>
                    )}
                    
                    <div className={cn(
                        "w-full h-full",
                        !isReady && "hidden"
                    )}>
                        {playbackId ? (
                            <MuxPlayer
                                title={title}
                                className="w-full h-full"
                                onCanPlay={() => setIsReady(true)}
                                onLoadedData={() => setIsReady(true)}
                                onPlaying={() => setIsReady(true)}
                                onEnded={() => {
                                    if (completeOnEnd) {
                                        // Logic handled by parent or automated progression
                                    }
                                }}
                                autoPlay
                                muted
                                playbackId={playbackId}
                            />
                        ) : (
                            <video
                                className="w-full h-full object-contain"
                                src={videoUrl}
                                controls
                                autoPlay
                                muted
                                onCanPlay={() => setIsReady(true)}
                                onLoadedData={() => setIsReady(true)}
                                onPlaying={() => setIsReady(true)}
                                onEnded={() => {
                                    if (completeOnEnd) {
                                        // Logic handled by parent or automated progression
                                    }
                                }}
                                onContextMenu={(e) => e.preventDefault()}
                            >
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};