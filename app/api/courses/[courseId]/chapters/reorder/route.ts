import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";


export async function PUT(req: Request, props: {params: Promise<{courseId: string}>}) {
    const params = await props.params;
    try{
        const session = await getSession();
        const userId = session?.userId as string;
        const { list } = await req.json();

        if(!userId){
            return new NextResponse("Unauthorised", {status: 401})
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        if(!courseOwner){
            return new NextResponse("Unauthorised", {status: 401})
        }

        for (let item of list) {
            await db.chapter.update({
                where: { id: item.id },
                data: { position: item.position }
            })
        }
        return NextResponse.json("success", {status: 200})
    }catch(error){
        console.log("[REORDER]", error)
        return new NextResponse("internal Error mine", {status: 500})
        
    }
}
    