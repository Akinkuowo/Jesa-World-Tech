"use client"

import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react"

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
import { Course } from "@prisma/client";
import { Combobox } from "@/components/ui/combobox";
import { ComboboxDemo } from "@/components/ui/comboboxdemo";


const formFormat = z.object({
    levelId: z.string().min(1),
    
 })

interface CourseLevelFormProps {
    initialData: Course;
    courseId: string;
    options: { label: string; value: string}[]

}

export const CourseLevelForm = ({
    initialData, 
    courseId,
    options

}: CourseLevelFormProps) => {
 
    const [ isEditing, setIsEditing ] = useState(false)
    const toggleEditing = () => setIsEditing((current) => !current)
    const router = useRouter();

    const form = useForm<z.infer<typeof formFormat>>({
        resolver: zodResolver(formFormat),
        defaultValues: {
            levelId: initialData?.levelId || ""
        },
    })

    const {isSubmitting, isValid} = form.formState;
    

    const onSubmit = async (values: z.infer<typeof formFormat>) => {
       
        try{
            const response = await axios.patch(`/api/courses/${courseId}`, values)
            console.log(response)
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
    
    const selectedOption = options.find((option) => option.value === initialData.levelId) 
    

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Level
                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Change Course Level    
                        </>
                    )}
                    
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.levelId && "text-slate-500 italic"
            )}>
                    {selectedOption?.label || "No course level"} 
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
                            name="levelId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        {/* <ComboboxDemo /> */}
                                        <Combobox 
                                            options={options}
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