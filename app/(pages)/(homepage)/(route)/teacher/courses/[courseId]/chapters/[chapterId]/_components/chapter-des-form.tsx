"use client"
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage

 } from "@/components/ui/form";

 import{ Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter } from "@prisma/client";

interface ChapterDesFormProps {
    initialData: Chapter;
    courseId: string;
    chapterId: string
}

const formFormat = z.object({
    description: z.string().min(1)

 })

export const ChapterDesForm = ({
    initialData, 
    courseId,
    chapterId
}: ChapterDesFormProps) => {
    const [ isEditing, setIsEditing ] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formFormat>>({
        resolver: zodResolver(formFormat),
        defaultValues: {
            description: initialData?.description || ""
        }
    })

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formFormat>) => {
        // console.log(values)
        try{
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
            console.log(response)
            toast.success("Chapter Updated", {
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
    
    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Chapter Description
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit Description    
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.description && "text-slate-500 italic"
                )}>
                    {initialData.description || "No Description"}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea 
                                            disabled={isSubmitting}
                                            placeholder="e.g 'This course is meant for beginners'"
                                            {...field}
                                        />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex item-center gap-x-2">
                            <Button 
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}