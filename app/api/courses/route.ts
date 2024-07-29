import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function POST(
    req: Request,
){
    try{
        const { userId } = auth();
        const { title } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorised", {status: 401})
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        })
        return NextResponse.json(course)
    }catch(error){
        console.log("[Courses]", error)
        return new NextResponse("internal Error mine", {status: 500})
        // toast.error(error, 
        //         {
        //             style: {
        //                 borderRadius: '10px',
        //                 background: '#333',
        //                 color: '#fff',
        //               }
        //         }
        //     )
    }
}
    