"use client"

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import{ Button } from "@/components/ui/button";
import { File, ImageIcon, Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Attachment, Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-upload";

 const formFormat = z.object({
    url: z.string().min(1)

 })

interface AttachmentFormProps {
    initialData: Course & {attachments: Attachment[] }
    courseId: string;
}

export const AttachmentForm = ({
    initialData, 
    courseId
}: AttachmentFormProps) => {
    const [ isEditing, setIsEditing ] = useState(false)
    const [ deleteId, setDeleteId ] = useState<string | null>(null)

    const toggleEditing = () => setIsEditing((current) => !current)
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formFormat>) => {
        
        try{
            const response = await axios.post(`/api/courses/${courseId}/attachments`, values)
            // console.log(response)
            toast.success("Course Updated", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }
            })
            toggleEditing();
            router.refresh();
        }
        catch{
            toast.error("Something went wrong", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
        }
    }
    
    const onDelete = async (id: string) => {
        try {
            setDeleteId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`)
            toast.success("Course Updated", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }
            })
            toggleEditing();
            router.refresh();
        } catch {
            toast.error("Something went wrong", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
        }finally {
            setDeleteId(null)
        }
    }


    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Attachments
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2"/>
                            Add an Attachment
                        </>
                    )} 
                   
                    
                </Button>
            </div>
            {!isEditing && (
                <>
                    {initialData.attachments.length === 0 && (
                        <p className="text-sm mt-2 text-slate-500 italic">
                            No Attachments Yet
                        </p>
                    )}
                    {initialData.attachments.length > 0 && (
                        <div className="space-y-2">
                            {initialData.attachments.map((attachment) => (
                                <div
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                                    <p>
                                        {attachment.name}
                                    </p>
                                    {
                                        deleteId !== attachment.id && (
                                            <button 
                                            onClick={()=> onDelete(attachment.id)}
                                            className="ml-auto hover:opacity-75">
                                                <Loader2 className="h-4 w-4" />
                                            </button>
                                        )
                                    }
                                </div>
                            ))}
                        </div>
                    )

                    }
                </>
            )}
            {isEditing && (
                <div>
                    <FileUpload 
                        endpoint="courseAttachment"
                        onChange={(url) => {
                            if(url) {
                                onSubmit({ url: url })
                            }
                        }}
                    />

                    <div className="text-xs text-muted-foreground mt-4">
                        Add Anything Your Student Might Need To Complete The Course
                    </div>
                </div>
            )}
        </div>
    )
}