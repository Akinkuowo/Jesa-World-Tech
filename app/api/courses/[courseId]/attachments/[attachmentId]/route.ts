import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; attachmentId: string } }
) {
    try {
        const { userId } = auth();
        const { url } = await req.json();

        // Check if the user is authenticated
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if courseId and attachmentId are valid
        if (!params.courseId || !params.attachmentId) {
            return new NextResponse("Invalid parameters", { status: 400 });
        }

        // Check if the user is the owner of the course
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if the attachment exists before attempting to delete
        const existingAttachment = await db.attachment.findUnique({
            where: {
                id: params.attachmentId,
                courseId: params.courseId,
            },
        });

        if (!existingAttachment) {
            return new NextResponse("Attachment not found", { status: 404 });
        }

        // Delete the attachment
        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            },
        });

        return NextResponse.json(attachment);
    } catch (error) {
        console.error("Attachment deletion error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

    