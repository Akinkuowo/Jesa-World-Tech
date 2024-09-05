import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";
import axios from 'axios';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function POST(req: Request) {
    try {
        const { userId } = auth();

        // Check if the user is authenticated
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }

        const { levelId } = await req.json();

        // Validate course level
        const courseLevel = await db.level.findUnique({
            where: {
                id: levelId
            }
        });

        if (!courseLevel) {
            return new NextResponse("No course level found", { status: 404 });
        }

        // Redirect to payment page (assume full URL path)
        return redirect(`/payment?levelId=${levelId}`);
    } catch (error) {
        console.error("[payment]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
