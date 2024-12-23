import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function POST(
    req: Request,
    {params}: {params: {courseId: string}}
    
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

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: params.courseId,
            }
        })
        return NextResponse.json(attachment)
    }catch(error){
        console.log("[Course_Id_Attachments]", error)
        return new NextResponse("internal Error", {status: 500})

    }
}
    