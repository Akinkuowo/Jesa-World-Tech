import { db } from "@/lib/db";
import { Course, Payment, Level } from "@prisma/client";

type PaymentWithCourse = Payment & {
  course: Course;
  courseLevel: Level;
};

const priceMap: Record<string, number> = {
  "Beginner": 2000,
  "Intermediate": 3500,
  "Advance": 5000,
  "Advanced": 5000,
};

const groupByMonth = (payments: PaymentWithCourse[]) => {
  const grouped: Record<string, number> = {};

  payments.forEach((payment) => {
    const month = payment.createdAt.toLocaleString("default", { month: "short" });
    const amount = priceMap[payment.courseLevel.name] || 0;

    if (!grouped[month]) {
      grouped[month] = 0;
    }
    grouped[month] += amount;
  });

  return grouped;
};

export const getAnalytics = async (userId: string) => {
  try {
    const payments = await db.payment.findMany({
      where: {
        course: {
          userId: userId,
        },
      },
      include: {
        course: true,
        courseLevel: true,
      },
    });

    const groupedEarnings = groupByMonth(payments);
    const data = Object.entries(groupedEarnings).map(([name, total]) => ({
      name,
      total,
    }));

    const totalRevenue = data.reduce((acc, curr) => acc + curr.total, 0);
    const totalSales = payments.length;

    return {
      data,
      totalRevenue,
      totalSales,
    };
  } catch (error) {
    console.log("[GET_ANALYTICS]", error);
    return {
      data: [],
      totalRevenue: 0,
      totalSales: 0,
    };
  }
};
