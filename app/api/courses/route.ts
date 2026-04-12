import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
){
    try{
        const session = await getSession();
        const userId = session?.userId as string;
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
    