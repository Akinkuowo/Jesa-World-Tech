import { Course, Category, Level } from "@prisma/client";
import { CourseCard } from "./course-card";


// Define the type with a single definition
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
    console.log(items); // Debug log
    if (!items || items.length === 0) {
        return (
            <div className="text-center text-sm text-muted-foreground mt-10">
                No courses available.
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
