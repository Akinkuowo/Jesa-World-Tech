import { IconBadge } from "@/components/icon-badge"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { File, LayoutDashboard, ListChecks } from "lucide-react"
import { redirect } from "next/navigation"
import { TitleForm } from "./_components/title-form"
import { DesForm } from "./_components/des-form"
import { ImageForm } from "./_components/image-form"
import { CategoryForm } from "./_components/category-form"
import { CourseLevelForm } from "./_components/course-level-form"
import { AttachmentForm } from "./_components/attachment-form"
import { ChaptersForm } from "./_components/chapters-form"

const CourseIdPage = async ({
    params
}: {
    params: {courseId: string}
}) => {
    const { userId } = auth()
    if(!userId){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId,
        },
        include: {
            chapters: {
                orderBy: {
                    position: "asc"
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                }
            }
        }
    })
    
    // console.log(course)
    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    const courseLevel = await db.level.findMany({
        orderBy: {
            name: "asc"
        }
    })


    if(!course){
        return redirect("/");
    }

    const requiredField = [
        course.title,
        course.imageUrl,
        course.description,
        course.categoryId,
        course.levelId,
        course.chapters.some(chapter => chapter.isPublished)
    ]

    const totalFileds = requiredField.length;
    const completedFields = requiredField.filter(Boolean).length

    const completedText = `( ${completedFields}/${totalFileds})`

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-2">
                    <h1 className="text-2xl font-medium">Course Setup</h1>
                    <span className="text-sm text-sky-700">Completed Fields {completedText}</span>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                <div>
                    <div className="flex items-center gap-x-2">
                        <IconBadge size="sm" variant="success" icon={LayoutDashboard}/>
                        <h2 className="text-xl">
                            Customised your course
                        </h2>
                    </div>
                    <TitleForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <DesForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <ImageForm 
                        initialData={course}
                        courseId={course.id}
                    />
                    <CategoryForm 
                        initialData={course}
                        courseId={course.id}
                        options={categories.map((category) => ({
                            label: category.name,
                            value: category.id
                        }))}
                    />
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-x-2">
                            <IconBadge size="sm" variant="success" icon={ListChecks}/>
                            <h2 className="text-xl">
                                Course chapters
                            </h2>
                        </div> 
                        <ChaptersForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                    <CourseLevelForm 
                        initialData={course}
                        courseId={course.id}
                        options={courseLevel.map((level) => ({
                            label: level.name,
                            value: level.id
                        }))}
                    />  
                    </div>
                    <div>
                        {/* <div className="flex item-center gap-x-2">
                            <IconBadge size="sm" variant="success" icon={File} />
                            <h2 className="text-xl">Resources and Attachments</h2>
                        </div> */}
                        <AttachmentForm
                            initialData={course}
                            courseId={course.id}
                         />
                    </div>
                </div>
            </div>
        </div>
        
    )   
}

export default CourseIdPage  