
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";


export async function PATCH(
    req: Request,
    {params}: {params: {courseId: string}}
    
){
    
    try{
        const { userId } = auth();
        const { courseId } = params
        const values  = await req.json();

        if(!userId){
            return new NextResponse("Unauthorised", {status: 401})
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
    
        })
        return NextResponse.json(course)
    }catch(error){
        console.log("[Course_Id]", error)
        return new NextResponse("internal Error mine", {status: 500})

    }
}
    