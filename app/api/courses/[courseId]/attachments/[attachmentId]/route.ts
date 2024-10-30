import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; attachmentId: string } }
) {
    console.log("Received request to delete attachment:", params);

    try {
        const { userId } = auth();
        const { url } = await req.json();

        if (!userId) {
            console.error("Unauthorized access attempt");
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!params.courseId || !params.attachmentId) {
            console.error("Invalid parameters:", params);
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            console.error("Unauthorized access to course:", params.courseId);
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const existingAttachment = await db.attachment.findUnique({
            where: {
                id: params.attachmentId,
                courseId: params.courseId,
            },
        });

        if (!existingAttachment) {
            console.error("Attachment not found:", {
                attachmentId: params.attachmentId,
                courseId: params.courseId,
            });
            return new NextResponse("Attachment not found", { status: 404 });
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            },
        });

        console.log("Attachment deleted successfully:", attachment);
        return NextResponse.json(attachment);
    } catch (error) {
        console.error("Error deleting attachment:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
