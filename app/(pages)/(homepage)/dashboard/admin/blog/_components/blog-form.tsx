"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BlogPost } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/file-upload";
import { Editor } from "@/components/editor";
import { upsertBlogPost } from "@/actions/marketing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphenated"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  authorName: z.string().optional(),
  readTime: z.string().optional(),
  isPublished: z.boolean().default(false),
});

interface BlogFormProps {
  initialData?: BlogPost | null;
  onSuccess: () => void;
}

export const BlogForm = ({ initialData, onSuccess }: BlogFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      imageUrl: initialData?.imageUrl || "",
      category: initialData?.category || "",
      authorName: initialData?.authorName || "",
      readTime: initialData?.readTime || "",
      isPublished: initialData?.isPublished || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const res = await upsertBlogPost(values, initialData?.id);
      
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success!);
        onSuccess();
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate slug from title
  const onTitleBlur = () => {
    const title = form.getValues("title");
    const slug = form.getValues("slug");
    if (title && !slug) {
      form.setValue("slug", title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input 
                    disabled={isSubmitting} 
                    placeholder="e.g. Modern Web Trends" 
                    {...field} 
                    onBlur={onTitleBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="modern-web-trends" {...field} />
                </FormControl>
                <FormDescription>URL-friendly name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="e.g. Technology" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="Author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (Summary)</FormLabel>
              <FormControl>
                <Textarea disabled={isSubmitting} placeholder="Short summary for the card..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="readTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Read Time</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="e.g. 5 min read" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 p-4 border rounded-md h-[56px]">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Published</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feature Image</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative aspect-video mt-2">
                    <Image
                      fill
                      alt="Blog image"
                      src={field.value}
                      className="object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => field.onChange("")}
                      className="absolute top-2 right-2 bg-rose-500 text-white p-1 rounded-full shadow-sm hover:bg-rose-600 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    endpoint="courseImage"
                    onChange={(url) => field.onChange(url)}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-2 pt-4">
          <Button disabled={isSubmitting} type="submit">
            {initialData ? "Save Changes" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
