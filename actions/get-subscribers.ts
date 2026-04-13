import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export const getSubscribers = async () => {
  try {
    const session = await getSession();

    if (session?.role !== "ADMIN") {
      throw new Error("Unauthorized");
    }

    const subscribers = await db.subscription.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          }
        },
        courseLevel: {
          select: {
            name: true,
          }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return subscribers;
  } catch (error) {
    console.error("[GET_SUBSCRIBERS]", error);
    return [];
  }
};
