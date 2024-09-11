import { db } from "@/lib/db";

interface GetEnrolledCoursesProps {
  userId: string;
}

export const getEnrolledCourse = async ({ userId }: GetEnrolledCoursesProps) => {
  // Fetch all the course enrollments for the user
  const enrollments = await db.enroll.findMany({
    where: {
      userId: userId,
    },
    include: {
      course: {
        include: {
          category: true, 
          courseLevel: true, 
          chapters: true,
        },
      },
    },
  });

  // Extract the courses from the enrollments
  const enrolledCourses = enrollments.map((enrollment) => enrollment.course);

  return enrolledCourses;
};
