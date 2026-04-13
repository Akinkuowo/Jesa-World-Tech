import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const footer = await db.footerConfig.findUnique({
      where: { id: "default" },
    });
    return NextResponse.json(footer);
  } catch (error) {
    console.log("[FOOTER_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    const footer = await db.footerConfig.upsert({
      where: { id: "default" },
      update: {
        ...values,
      },
      create: {
        id: "default",
        ...values,
      },
    });

    return NextResponse.json(footer);
  } catch (error) {
    console.log("[FOOTER_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
