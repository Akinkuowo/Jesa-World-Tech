"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

const UpdateProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim().optional(),
  image: z.string().url({ message: "Invalid image URL." }).optional().or(z.literal("")),
});

export async function updateProfile(values: z.infer<typeof UpdateProfileSchema>) {
  try {
    const session = await getSession();
    const userId = session?.userId as string;

    if (!userId) {
      return { error: "Unauthorized" };
    }

    const { name, image } = values;

    const user = await db.user.update({
      where: { id: userId },
      data: {
        name,
        image,
      },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    
    return { success: "Profile updated successfully!", user };
  } catch (error) {
    console.error("[UPDATE_PROFILE]", error);
    return { error: "Something went wrong. Please try again." };
  }
}
