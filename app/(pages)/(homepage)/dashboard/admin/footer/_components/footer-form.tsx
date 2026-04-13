"use client";

import * as z from "zod";
import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FooterConfig } from "@prisma/client";
import { toast } from "react-hot-toast";
import { Plus, Trash, Save } from "lucide-react";

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
import { Separator } from "@/components/ui/separator";

const linkSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "Link is required"),
});

const formSchema = z.object({
  ctaTitle: z.string().min(1),
  ctaDescription: z.string().min(1),
  ctaButtonText: z.string().min(1),
  ctaButtonLink: z.string().min(1),
  ctaSecondaryButtonText: z.string().min(1),
  ctaSecondaryButtonLink: z.string().min(1),
  brandDescription: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  copyrightText: z.string().min(1),
  socialLinks: z.array(z.object({
    icon: z.string().min(1),
    href: z.string().min(1),
    label: z.string().min(1),
  })),
  footerLinks: z.record(z.string(), z.array(linkSchema)),
});

interface FooterFormProps {
  initialData: FooterConfig | null;
}

export const FooterForm = ({ initialData }: FooterFormProps) => {
  const router = useRouter();

  const defaultValues = initialData ? {
    ...initialData,
    socialLinks: (initialData.socialLinks as any) || [],
    footerLinks: (initialData.footerLinks as any) || { Services: [], Company: [], Platform: [] },
  } : {
    ctaTitle: "Ready to Transform Your Business?",
    ctaDescription: "Let's build something extraordinary together. Our team of experts is ready to deliver tailored I.T. solutions.",
    ctaButtonText: "Start a Project",
    ctaButtonLink: "/contact",
    ctaSecondaryButtonText: "Create Free Account",
    ctaSecondaryButtonLink: "/sign-up",
    brandDescription: "A leading I.T. firm delivering innovative technology solutions — from cloud infrastructure to custom software — empowering businesses across Africa and beyond.",
    address: "Lagos, Nigeria",
    email: "hello@jesaworldtech.com",
    phone: "+234 800 JESA TECH",
    copyrightText: "JESA World Technology. All rights reserved.",
    socialLinks: [
      { icon: "Twitter", href: "#", label: "Twitter" },
      { icon: "Linkedin", href: "#", label: "LinkedIn" },
      { icon: "Github", href: "#", label: "GitHub" },
      { icon: "Youtube", href: "#", label: "YouTube" },
    ],
    footerLinks: {
      Services: [
        { label: "Cloud Solutions", href: "/services#cloud" },
        { label: "Cybersecurity", href: "/services#cybersecurity" },
      ],
      Company: [
        { label: "About Us", href: "/about" },
      ],
      Platform: [
        { label: "Dashboard", href: "/dashboard" },
      ],
    },
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/admin/footer", values);
      toast.success("Footer configuration updated", {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl border shadow-sm max-w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          
          {/* CTA Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-950">CTA Section</h3>
              <p className="text-sm text-slate-500">The blue banner at the top of the footer.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="ctaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTA Title</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaDescription"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>CTA Description</FormLabel>
                    <FormControl>
                      <Textarea disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Button Text</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Button Link</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaSecondaryButtonText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Button Text</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ctaSecondaryButtonLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Button Link</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Brand & Contact Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-950">Brand & Contact</h3>
              <p className="text-sm text-slate-500">Logo description and official contact details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="brandDescription"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Brand Description</FormLabel>
                    <FormControl>
                      <Textarea disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Office Address</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official Email</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copyrightText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copyright Text</FormLabel>
                    <FormControl>
                      <Input disabled={isSubmitting} {...field} />
                    </FormControl>
                    <FormDescription>The year will be automatically added.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Social Links Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-navy-950">Social Media</h3>
                <p className="text-sm text-slate-500">Manage social media icons and links.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentSocials = form.getValues("socialLinks");
                  form.setValue("socialLinks", [
                    ...currentSocials,
                    { icon: "Twitter", href: "#", label: "Social Platform" }
                  ]);
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Platform
              </Button>
            </div>
            
            <div className="space-y-4">
              {form.watch("socialLinks").map((_, index) => (
                <div key={index} className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.icon`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Icon</FormLabel>
                        <FormControl>
                          <select 
                            {...field} 
                            disabled={isSubmitting}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="Twitter">Twitter</option>
                            <option value="Linkedin">LinkedIn</option>
                            <option value="Github">GitHub</option>
                            <option value="Youtube">YouTube</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Globe">Website / Globe</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.label`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Platform Name</FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`socialLinks.${index}.href`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>URL</FormLabel>
                        <FormControl>
                          <Input disabled={isSubmitting} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => {
                      const currentSocials = form.getValues("socialLinks");
                      form.setValue("socialLinks", currentSocials.filter((__, i) => i !== index));
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          <Separator />

          {/* Categorized Links Section */}
          {["Services", "Company", "Platform"].map((category) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy-950">{category} Links</h3>
                  <p className="text-sm text-slate-500">Manage links in the {category} column.</p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const currentLinks = form.getValues("footerLinks");
                    const categoryLinks = currentLinks[category] || [];
                    form.setValue("footerLinks", {
                      ...currentLinks,
                      [category]: [
                        ...categoryLinks,
                        { label: "New Link", href: "#" }
                      ]
                    });
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Link
                </Button>
              </div>
              
              <div className="space-y-4">
                {(form.watch("footerLinks")?.[category] || []).map((_, index) => (
                  <div key={index} className="flex gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <FormField
                      control={form.control}
                      name={`footerLinks.${category}.${index}.label`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Label</FormLabel>
                          <FormControl>
                            <Input disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`footerLinks.${category}.${index}.href`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input disabled={isSubmitting} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        const currentLinks = form.getValues("footerLinks");
                        const categoryLinks = currentLinks[category] || [];
                        form.setValue("footerLinks", {
                          ...currentLinks,
                          [category]: categoryLinks.filter((__, i) => i !== index)
                        });
                      }}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Separator />
            <Button
              disabled={!isValid || isSubmitting}
              type="submit"
              className="bg-navy-900 text-white hover:bg-navy-800 rounded-xl px-8"
            >
              {isSubmitting ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
