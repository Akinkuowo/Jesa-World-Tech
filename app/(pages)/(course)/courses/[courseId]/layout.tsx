import { GetProgress } from "@/actions/get-progress";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CourseSideBar from "./_component/course-sidebar";
import CourseNavBar from "./_component/course-navbar";

const CourseLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // Fetch course details including chapters and user progress
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        include: {
          userProgress: {
            where: {
              userId,
            },
          },
        },
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  // Fetch enrollment details for the user in the course
  const enroll = await db.enroll.findFirst({
    where: {
        userId,
        courseId: course.id,
      },
    }) || {
      id: '',
      userId: '',
      courseLevelId: '',
      courseId: course.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };


  // Fetch progress count for the user in the course
  const progressCount = await GetProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 inset-y-2 fixed w-full z-50">
        <CourseNavBar 
          course={course}
          progressCount={progressCount}
          Enroll={enroll} // Pass enroll to CourseNavBar
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSideBar 
          course={course}
          progressCount={progressCount}
          enroll={enroll} // Pass enroll to CourseSideBar
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
};

export default CourseLayout;
