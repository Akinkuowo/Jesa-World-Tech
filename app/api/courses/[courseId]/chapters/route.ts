import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";


export async function POST(req: Request, props: {params: Promise<{courseId: string}>}) {
    const params = await props.params;
    try{
        const session = await getSession();
        const userId = session?.userId as string;
        const { title } = await req.json();

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

        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseId
            },
            orderBy: {
                position: "desc"
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                courseId: params.courseId,
                position: newPosition,
                
            }
        })
        return NextResponse.json(chapter)
    }catch(error){
        console.log("[Chapters]", error)
        return new NextResponse("internal Error mine", {status: 500})
        
    }
}
    