import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function DELETE(
    req: Request,
    {params}: {params: {courseId: string, attachmentId: string}}
    
){
    
    try{
        const { userId } = auth();
        const { url } = await req.json();
        // const { courseId } = params

        if(!userId){
            return new NextResponse("Unauthorised", {status: 401})
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        })
        
        if(!courseOwner){
            return new NextResponse("Unauthorised", {status: 401})
        }

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        })
        return NextResponse.json(attachment)
    }catch(error){
        console.log("Attachent_Id", error)
        return new NextResponse("internal Error", {status: 500})

    }
}
    