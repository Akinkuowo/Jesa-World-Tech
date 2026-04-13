import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";

interface CourseCardProps {
    id: string;
    title: string;
    category?: string;
    imageUrl?: string | null;
    chaptersLength: number;
    courseLevel?: string ;
    progress: number | null;
}

export const CourseCard = ({
    id,
    title,
    category,
    imageUrl,
    chaptersLength,
    progress,
    courseLevel
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`} className="group transition overflow-hidden border rounded-2xl p-3 h-full bg-white hover:shadow-md hover:border-electric-blue-200 transition-all duration-300">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                {imageUrl ? (
                    <Image 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={title}
                        src={imageUrl}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                        <BookOpen className="h-10 w-10 text-slate-300" />
                    </div>
                )}
            </div>
            <div className="flex flex-col pt-3 gap-y-1">
                <div className="text-base md:text-sm font-bold text-slate-900 group-hover:text-electric-blue-600 transition line-clamp-2 min-h-[2.5rem]">
                    {title}
                </div>
                <div className="flex items-center gap-x-2">
                   <p className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {category}
                    </p>
                    <span className="text-slate-200 text-xs">|</span>
                    <p className="text-xs font-medium text-electric-blue-600">
                        {courseLevel}
                    </p>
                </div>
                <div className="flex items-center gap-x-2 text-xs text-slate-500 mt-2">
                    <div className="flex items-center gap-x-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                        <IconBadge 
                            size="sm"
                            icon={BookOpen}
                        />
                        <span className="font-medium">
                            {chaptersLength}{chaptersLength == 1 ? " Chapter" : " Chapters" } 
                        </span>
                    </div>
                </div>
                {progress !== null && (
                    <div className="mt-2">
                        {/* Progress Bar placeholder for future use */}
                        <div className="text-xs font-semibold text-electric-blue-600">
                            {progress}% Complete
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};
