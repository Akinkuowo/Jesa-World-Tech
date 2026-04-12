import { db } from "@/lib/db";
import Categories from "../_components/categories";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getEnrolledCourse } from "@/actions/get-enrolled-courses";
import Link from "next/link";
import Image from "next/image";
import { IconBadge } from "@/components/icon-badge"; // Make sure this path is correct
import { BookOpen } from "lucide-react";



const Courses = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Fetch categories (if needed for display)
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Fetch only the courses that the user has enrolled in
  const enrolledCourses = await getEnrolledCourse({ userId });

  return (
    <div className="p-6 space-y-4">
      <Categories items={categories} />

      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {enrolledCourses.map((course) => (
          <Link href={`/courses/${course.id}`} key={course.id} className="course-card">
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                {course.imageUrl && (
                  <Image 
                    fill
                    className="object-cover"
                    alt={course.title}
                    src={course.imageUrl}
                  />
                )}
              </div>
              <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                  {course.title}
                </div>
                <p className="text-xs text-muted-foreground">
                  {course.courseLevel ? `${course.courseLevel.name}` : 'N/A'}
                </p>
                <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                  <div className="flex items-center gap-x-1 text-slate-500">
                    <IconBadge
                      size="sm"
                      icon={BookOpen}
                    />
                    <span>
                      {course.chapters?.length || 0} {course.chapters?.length === 1 ? "Chapter" : "Chapters"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
