import { Course, Category, Level } from "@prisma/client";
import { SearchX } from "lucide-react";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
    level: Level | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({
    items
}: CoursesListProps) => {
    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 mt-6 mx-6">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                    <SearchX className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No Courses Found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">
                    We couldn&apos;t find any courses matching your current search or category. Try adjusting your filters or check back later!
                </p>
            </div>
        );
    }

    return (
        <div className="courses-list ml-5">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                {items.map((course) => (
                    <CourseCard 
                        key={course.id}
                        id={course.id}
                        title={course.title}
                        category={course?.category?.name || 'No Category'}
                        imageUrl={course.imageUrl}
                        chaptersLength={course.chapters.length}
                        progress={course.progress}
                        courseLevel={course.level ? `${course.level.name}` : 'No Level'} // Use level.name
                    />
                ))}
            </div>
        </div>
    );
};
