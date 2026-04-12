"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

// --- Helpers ---
const isAdmin = async () => {
  const session = await getSession();
  return session?.role === "ADMIN";
};

// --- Schemas ---
const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().optional(),
  clientName: z.string().optional(),
  techStack: z.string().min(1, "Tech stack is required"),
  outcome: z.string().optional(),
  projectUrl: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  order: z.number().int().default(0),
});

const BlogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
  authorName: z.string().optional(),
  readTime: z.string().optional(),
  isPublished: z.boolean().default(false),
});

const TeamMemberSchema = z.object({
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

// --- Project Actions ---
export const upsertProject = async (values: z.infer<typeof ProjectSchema>, id?: string) => {
  if (!(await isAdmin())) return { error: "Unauthorized" };

  const validatedFields = ProjectSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    if (id) {
      await db.project.update({ where: { id }, data: validatedFields.data });
    } else {
      await db.project.create({ data: validatedFields.data });
    }
    revalidatePath("/portfolio");
    revalidatePath("/dashboard/admin/projects");
    return { success: id ? "Project updated" : "Project created" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deleteProject = async (id: string) => {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await db.project.delete({ where: { id } });
    revalidatePath("/portfolio");
    revalidatePath("/dashboard/admin/projects");
    return { success: "Project deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// --- Blog Actions ---
export const upsertBlogPost = async (values: z.infer<typeof BlogPostSchema>, id?: string) => {
  if (!(await isAdmin())) return { error: "Unauthorized" };

  const validatedFields = BlogPostSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    if (id) {
      await db.blogPost.update({ where: { id }, data: validatedFields.data });
    } else {
      await db.blogPost.create({ data: validatedFields.data });
    }
    revalidatePath("/blog");
    revalidatePath("/dashboard/admin/blog");
    return { success: id ? "Post updated" : "Post created" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deleteBlogPost = async (id: string) => {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await db.blogPost.delete({ where: { id } });
    revalidatePath("/blog");
    revalidatePath("/dashboard/admin/blog");
    return { success: "Post deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

// --- Team Member Actions ---
export const upsertTeamMember = async (values: z.infer<typeof TeamMemberSchema>, id?: string) => {
  if (!(await isAdmin())) return { error: "Unauthorized" };

  const validatedFields = TeamMemberSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };

  try {
    if (id) {
      await db.teamMember.update({ where: { id }, data: validatedFields.data });
    } else {
      await db.teamMember.create({ data: validatedFields.data });
    }
    revalidatePath("/team");
    revalidatePath("/dashboard/admin/team");
    return { success: id ? "Member updated" : "Member created" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};

export const deleteTeamMember = async (id: string) => {
  if (!(await isAdmin())) return { error: "Unauthorized" };
  try {
    await db.teamMember.delete({ where: { id } });
    revalidatePath("/team");
    revalidatePath("/dashboard/admin/team");
    return { success: "Member deleted" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
};
