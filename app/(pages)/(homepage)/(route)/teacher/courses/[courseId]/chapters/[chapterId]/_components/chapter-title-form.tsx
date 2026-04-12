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
 import{ Input } from "@/components/ui/input";
//  import Link from "next/link";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Editor } from "@/components/editor";

 const formFormat = z.object({
    title: z.string().min(1),

 })

interface ChapterTitleFormProps {
    initialData: {
        title: string;
    }
    courseId: string;
    chapterId: string;
}

export const ChapterTitleForm = ({
    initialData, 
    courseId,
    chapterId
}: ChapterTitleFormProps) => {
    const [ isEditing, setIsEditing ] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formFormat>>({
        resolver: zodResolver(formFormat),
        defaultValues: initialData
    })

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async (values: z.infer<typeof formFormat>) => {
        console.log(values)
        try{
            const response = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
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
                Chapter Title
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit Title    
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2">
                    {initialData.title}
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