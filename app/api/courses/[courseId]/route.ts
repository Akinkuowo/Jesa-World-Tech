
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import Mux from "@mux/mux-node";

const mux = new Mux({
    tokenId: process.env['MUX_TOKEN_ID'],
    tokenSecret: process.env['MUX_TOKEN_SECRET'],
});

// Access Mux video API
const { video } = mux;


export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string; chapterId: string } }
) {
    try {
        const { userId } = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId, 
                userId: userId 
            },
            include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        });

        if (!course) {
            return new NextResponse("course Not Found", { status: 404 });
        }

        for(const chapter of course.chapters){
            if(chapter?.muxData?.assetId){
                await video.assets.delete(chapter.muxData.assetId)
            }
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId
            }
        })
        // if (course) {
        //     const existingChapter = await db.chapter.findFirst({
        //         where: {
        //             courseId: params.courseId,
        //         },
        //     });
            

        //     if(!existingChapter){
        //         const deletedCourse = await db.course.delete({
        //             where: {
        //                 id: params.courseId
        //             }
        //         })
        //     }else{

        //         if(existingChapter.videoUrl){
        //             for()
        //             // const existingMuxData = await db.muxData.findFirst({
        //             //     where: {
        //             //         chapterId: params.chapterId,
        //             //     },
        //             // });

                    
        //             // if (existingMuxData) {
        //             // // Correct method to delete the asset
        //             //     await video.assets.delete(existingMuxData.assetId)
        //             //     await db.muxData.delete({
        //             //         where: {
        //             //             id: existingMuxData.id,
        //             //         },
        //             //     });
        //             // }
        
        //         }

        //        
               
        //     }


        // }

        
        return NextResponse.json(deletedCourse);
        
    } catch (error) {
        console.error("[Course_Id_delete]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

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
    