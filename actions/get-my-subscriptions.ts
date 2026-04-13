"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export const getMySubscriptions = async () => {
  try {
    const session = await getSession();
    const userId = session?.userId;

    if (!userId) {
      return [];
    }

    const subscriptions = await db.subscription.findMany({
      where: {
        userId: userId,
      },
      include: {
        courseLevel: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return subscriptions;
  } catch (error) {
    console.error("[GET_MY_SUBSCRIPTIONS]", error);
    return [];
  }
};
