"use client"

import { ConfirmModel } from "@/components/models/confirm-model"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface CourseActionsProps {
    disabled: boolean,
    courseId: string,
    isPublished: boolean
}

export const CourseActions = ({
    disabled,
    courseId,
    isPublished
}: CourseActionsProps) => {
    
    const [ isLoading, setIsLoading ] = useState(false)
    const router = useRouter()
    const onPublished = async () => {
        try{
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/unpublished`)
                toast.success("course unpublished", 
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                          }
                    }
                )
                
                // router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`)
        
            }else{
                const response = await axios.patch(`/api/courses/${courseId}/published`)
                console.log(response)
                toast.success("course published", 
                    {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                          }
                    }
                )
                // router.push(`/teacher/courses/${courseId}/chapters/${chapterId}`)
            }
            router.refresh()
        }catch{
            toast.error("Something went wrong", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
        }finally{
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try{
            setIsLoading(true)
            await axios.delete(`/api/courses/${courseId}`)
            toast.success("course deleted", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
            router.refresh()
            router.push(`/teacher/courses/`)
        }catch{
            toast.error("Something went wrong", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
        }finally{
            setIsLoading(false)
        }
    }
    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onPublished}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "UnPublish" : "Publish"}
            </Button>
            <ConfirmModel onConfirm={onDelete}>
                <Button size="sm" disabled={isLoading}>
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModel>
        </div>
    )
}