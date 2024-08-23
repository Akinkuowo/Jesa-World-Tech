import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the course belongs to the user
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if there is at least one published chapter
    const publishedChapters = await db.chapter.findMany({
      where: {
        isPublished: true,
        courseId: params.courseId,
      },
    });

    if (publishedChapters.length === 0) {
      return new NextResponse("No published chapters found", { status: 400 });
    }

    // Update the course to mark it as published
    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishedCourse);
  } catch (error) {
    console.error("[Chapter_published]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
