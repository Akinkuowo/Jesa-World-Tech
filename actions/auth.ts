"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { generateVerificationToken, generatePasswordResetToken } from "@/lib/tokens";
import { sendVerificationEmail, sendPasswordResetEmail } from "@/lib/mail";

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }).trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." })
    .trim(),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password field must not be empty." }),
});

const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Contain at least one special character." })
    .trim(),
});

export async function signup(formData: FormData) {
  const result = SignupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, password } = result.data;

  // Check if user exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Email already in use."],
      },
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "STUDENT", // Default role
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: "Confirmation email sent." };
}

export async function signupAdmin(formData: FormData) {
  const result = SignupSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, password } = result.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return {
      errors: {
        email: ["Email already in use."],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user with instant verification for convenience
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  await createSession(user.id, user.role);

  revalidatePath("/");
  redirect("/dashboard/admin");
}


export async function login(formData: FormData) {
  const result = LoginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email, password } = result.data;

  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      errors: {
        email: ["Invalid email or password."],
      },
    };
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(
      user.email,
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { 
      errors: {
        email: ["Email not verified. Confirmation email sent."],
      }
    };
  }

  await createSession(user.id, user.role);

  revalidatePath("/");
  
  if (user.role === "ADMIN") {
    redirect("/dashboard/admin");
  }

  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
}

export const newVerification = async (token: string) => {
  const existingToken = await db.verificationToken.findUnique({
    where: { token }
  });

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await db.user.findUnique({
    where: { email: existingToken.email }
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: { 
      emailVerified: new Date(),
      email: existingToken.email,
    }
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Email verified!" };
};

export const reset = async (formData: FormData) => {
  const result = ResetSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { email } = result.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
};

export const newPassword = async (
  formData: FormData,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const result = NewPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { password } = result.data;

  const existingToken = await db.passwordResetToken.findUnique({
    where: { token }
  });

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await db.user.findUnique({
    where: { email: existingToken.email }
  });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id }
  });

  return { success: "Password updated!" };
};
