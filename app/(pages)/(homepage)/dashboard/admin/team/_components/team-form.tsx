"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TeamMember } from "@prisma/client";
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
import { FileUpload } from "@/components/file-upload";
import { upsertTeamMember } from "@/actions/marketing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { X, User2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  initials: z.string().optional(),
  gradient: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  order: z.number().int().default(0),
});

interface TeamFormProps {
  initialData?: TeamMember | null;
  onSuccess: () => void;
}

export const TeamForm = ({ initialData, onSuccess }: TeamFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      bio: initialData?.bio || "",
      imageUrl: initialData?.imageUrl || "",
      initials: initialData?.initials || "",
      gradient: initialData?.gradient || "from-blue-500 to-cyan-500",
      linkedinUrl: initialData?.linkedinUrl || "",
      twitterUrl: initialData?.twitterUrl || "",
      order: initialData?.order || 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const res = await upsertTeamMember(values, initialData?.id);
      
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="e.g. John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="e.g. CTO" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Bio</FormLabel>
              <FormControl>
                <Textarea disabled={isSubmitting} placeholder="Short bio..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="initials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initials</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="JD" {...field} />
                </FormControl>
                <FormDescription>Used if no image is uploaded</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gradient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar Gradient</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="from-blue-500 to-cyan-500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="https://linkedin.com/in/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter URL</FormLabel>
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="https://twitter.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input type="number" disabled={isSubmitting} {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormDescription>Lower numbers appear first</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                {field.value ? (
                  <div className="relative w-32 h-32 mt-2">
                    <Image
                      fill
                      alt="Team member"
                      src={field.value}
                      className="object-cover rounded-full border-2 border-slate-200 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => field.onChange("")}
                      className="absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full shadow-sm hover:bg-rose-600 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                      <div className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center bg-slate-50 text-slate-400`}>
                        <User2 className="w-12 h-12 opacity-50" />
                      </div>
                      <FileUpload
                        endpoint="courseImage"
                        onChange={(url) => field.onChange(url)}
                      />
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-x-2 pt-4">
          <Button disabled={isSubmitting} type="submit">
            {initialData ? "Save Changes" : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
