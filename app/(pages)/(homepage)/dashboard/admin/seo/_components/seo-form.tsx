"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SEOConfig } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Search, Save, Info } from "lucide-react";

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
import { updateSEOConfig } from "@/actions/admin-seo";

interface SEOFormProps {
  initialData: SEOConfig;
}

const formSchema = z.object({
  titleTemplate: z.string().min(1),
  defaultTitle: z.string().min(1),
  description: z.string().min(1),
  keywords: z.string().min(1),
  twitterHandle: z.string().min(1),
  robotsTxt: z.string().min(1),
  googleTagManagerId: z.string().optional().nullable(),
});

export const SEOForm = ({ initialData }: SEOFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titleTemplate: initialData.titleTemplate,
      defaultTitle: initialData.defaultTitle,
      description: initialData.description,
      keywords: initialData.keywords,
      twitterHandle: initialData.twitterHandle,
      robotsTxt: initialData.robotsTxt,
      googleTagManagerId: initialData.googleTagManagerId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      await updateSEOConfig(values);
      toast.success("SEO configuration updated");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center gap-x-2 mb-8 border-b border-slate-100 pb-6">
        <div className="p-2 bg-electric-blue-50 rounded-xl text-electric-blue-600">
          <Search className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Search Engine Optimization</h2>
          <p className="text-sm text-slate-500">Configure how your site appears in search results and social media.</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="defaultTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">Default Site Title</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="JESA World Technology | I.T. Solutions" {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormDescription>The main title used for the home page and as a fallback.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titleTemplate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">Title Template</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="%s | JESA World Technology" {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormDescription>Use %s to represent the page name (e.g., Services | JESA World).</FormDescription>
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
                <FormLabel className="font-bold text-slate-700">Meta Description</FormLabel>
                <FormControl>
                  <Textarea disabled={isSubmitting} placeholder="A leading I.T. firm delivering innovative technology solutions..." {...field} className="rounded-2xl min-h-[100px] bg-slate-50/30" />
                </FormControl>
                <FormDescription>This description appears in Google search snippets. Aim for 150-160 characters.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700">Keywords</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="IT, Software, Cloud, Cybersecurity" {...field} className="rounded-xl h-12" />
                </FormControl>
                <FormDescription>Comma-separated list of keywords relevant to your business.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="twitterHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">Twitter Handle</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="@jesaworldtech" {...field} className="rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleTagManagerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-slate-700">Google Tag Manager ID</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting} placeholder="GTM-XXXXXXX" {...field || ""} className="rounded-xl h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="robotsTxt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-slate-700">Robots.txt Content</FormLabel>
                <FormControl>
                  <Textarea disabled={isSubmitting} placeholder="User-agent: *\nAllow: /" {...field} className="rounded-2xl min-h-[150px] font-mono text-sm bg-slate-900 text-slate-300 p-4" />
                </FormControl>
                <FormDescription>Control how search engine bots crawl your site.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-x-2 pt-6">
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="rounded-2xl h-12 px-8 bg-electric-blue-600 hover:bg-electric-blue-700 font-bold shadow-lg shadow-electric-blue-100 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              Save SEO Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
