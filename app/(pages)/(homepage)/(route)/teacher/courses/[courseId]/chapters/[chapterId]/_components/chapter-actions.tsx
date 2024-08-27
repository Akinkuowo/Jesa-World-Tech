"use client"

import { ConfirmModel } from "@/components/models/confirm-model"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface ChapterActionsProps {
    disabled: boolean,
    courseId: string,
    chapterId: string,
    isPublished: boolean
}

export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
}: ChapterActionsProps) => {
    
    const [ isLoading, setIsLoading ] = useState(false)
    const router = useRouter()
    const onPublished = async () => {
        try{
            setIsLoading(true)
            if(isPublished){
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublished`)
                toast.success("chapter unpublished", 
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
                await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/published`)
                toast.success("chapter published", 
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
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`)
            toast.success("chapter deleted", 
                {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                      }
                }
            )
            router.refresh()
            router.push(`/teacher/courses/${courseId}`)
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