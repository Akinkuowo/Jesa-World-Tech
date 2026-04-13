"use server";

import { db } from "@/lib/db";
import { Level } from "@prisma/client";

export const getLevels = async (): Promise<Level[]> => {
  try {
    const levels = await db.level.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return levels;
  } catch (error) {
    console.error("[GET_LEVELS]", error);
    return [];
  }
};
