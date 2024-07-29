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
    FormDescription, 
    FormField,
    FormItem,
    FormMessage

 } from "@/components/ui/form";

 import{ Button } from "@/components/ui/button";
import { Loader2, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ChapterList } from "./chapter-list";

 const formFormat = z.object({
    title: z.string().min(1)

 })


interface ChaptersFormProps {
    initialData: Course & {chapters: Chapter[] };
    courseId: string;
}

export const ChaptersForm = ({
    initialData, 
    courseId
}: ChaptersFormProps) => {
    const [ isCreating, setIsCreating ] = useState(false)
    const [ isUpdating, setIsUpdating ] = useState(false)
    const toggleCreating = () => setIsCreating((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formFormat>>({
        resolver: zodResolver(formFormat),
        defaultValues: {
            title: ""
        }
    })

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formFormat>) => {
        // console.log(values)
        try{
            const response = await axios.post(`/api/courses/${courseId}/chapters`, values)
            console.log(response)
            toast.success("Chapter Updated", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }
            })
            toggleCreating();
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
    
    const onReOrder = async (updateData: {id: string; position: number}[]) => {
        try{
            setIsUpdating(true)

            await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
                list: updateData
            })
            toast.success("Chapter reordered", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }
            })
            router.refresh();

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
        }finally {
            setIsUpdating(false)
        }
    }

    const onEdit = (id: string) => {
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
    }

    return (
        <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0  rounded-m flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Course Charpters
                <Button onClick={toggleCreating} variant="ghost">
                    {isCreating && (
                        <>Cancel</>
                    )}
                    {!isCreating && (
                        <>
                        <PlusCircle className="h-4 w-4 mr-2"/>
                        Add a Chapters    
                        </>
                    )}
                    
                </Button>
            </div>
            
            {isCreating && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField 
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="e.g 'Introduction to the course'"
                                            {...field}
                                        />
                                    </FormControl>
                                    
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                      
                        <Button 
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            Create
                        </Button>

                    </form>
                </Form>
            )}
            {!isCreating && (
                <div className={cn(
                    "text-sm mt-2",
                    !initialData.chapters.length && "text-slate-500 italic"
                )}>
                    {!initialData.chapters.length && "No chapters"}
                    <ChapterList
                        onEdit={onEdit}
                        onReOrder={onReOrder}
                        items={initialData.chapters || []}
                    />
                </div>
            )}
            {!isCreating && (
                <p className="text-sm text-muted-foreground mt-4">
                    drag & drop to reorder the chapters
                </p>
            )}
        </div>
    ) 
}