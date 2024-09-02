// types.ts
import { Course, Category } from "@prisma/client";

// Define the type with a single definition
export type CourseWithProgressWithCategory = Course & {
    category: Category | null;
    chapters: { id: string }[];
    progress: number | null;
    levelId?: string | null;
};
