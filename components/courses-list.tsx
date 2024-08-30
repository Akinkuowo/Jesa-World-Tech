import { Course, Category } from "@prisma/client";
import { CourseCard } from "./course-card";

type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];  // Use `string` for primitive types
    progress: number | null;
};

interface CoursesListProps {
    items: CourseWithProgressWithCategory[];
}

export const CoursesList = ({ 
    items 
}: CoursesListProps) => {
    console.log("Rendering courses:", items); // Debug log
    return (
        <div className="courses-list">
            {items.length === 0 ? (
                <div className="text-center text-sm text-muted-foreground mt-10">
                    No courses available.
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
                    
                    {items.map((course) => (
                        <CourseCard 
                            key={course.id}
                            id={course.id}
                            title={course.title}
                            category={course?.category?.name}
                            imageUrl={course.imageUrl}
                            chaptersLength={course.chapters.length}
                            progress={course.progress}
                            enroll={`Enroll`}
                        />
                           
                    ))}

                </div>
            )}
        </div>
    );
};
