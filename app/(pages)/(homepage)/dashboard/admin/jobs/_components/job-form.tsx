"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { JobListing } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { upsertJobListing } from "@/actions/marketing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  type: z.string().min(1, "Type is required"),
  level: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().optional(),
  skills: z.string().optional(),
  gradient: z.string().optional(),
  isOpen: z.boolean().default(true),
});

interface JobFormProps {
  initialData: JobListing | null;
  onSuccess: () => void;
}

export const JobForm = ({ initialData, onSuccess }: JobFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      department: initialData?.department || "",
      location: initialData?.location || "",
      type: initialData?.type || "Full-time",
      level: initialData?.level || "Mid-level",
      description: initialData?.description || "",
      requirements: initialData?.requirements || "",
      skills: initialData?.skills || "",
      gradient: initialData?.gradient || "from-blue-500 to-cyan-500",
      isOpen: initialData?.isOpen ?? true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await upsertJobListing(values, initialData?.id);
      
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success || "Success");
        onSuccess();
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Senior Full-Stack Engineer" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Engineering, Sales" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Lagos, Nigeria or Remote" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Full-time, Contract" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience Level</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. Junior, Mid-level, Senior" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gradient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UI Gradient (Tailwind classes)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="from-blue-500 to-cyan-500" disabled={isLoading} />
                </FormControl>
                <FormDescription>Determines the color bar in the listing.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter a brief summary of the role..." className="min-h-[100px]" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requirements (Multi-line)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter job requirements..." className="min-h-[150px]" disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills (Comma-separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="React, Node.js, AWS, TypeScript" disabled={isLoading} />
              </FormControl>
              <FormDescription>Will be displayed as individual badges.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isOpen"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active / Open for Applications</FormLabel>
                <FormDescription>
                  If unchecked, this job will be hidden from the public careers page.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {initialData ? "Save Changes" : "Create Job"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
