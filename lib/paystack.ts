import axios from 'axios';
import { db } from './db';
import { getSession } from './session';
import { NextResponse } from 'next/server';

export default async function handler(req: Request) {
    const { reference, levelId } = await req.json();
    const session = await getSession();
    const userId = session?.userId as string;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!reference || !levelId) {
        return NextResponse.json({ error: 'Payment reference or level ID is missing' }, { status: 400 });
    }

    try {
        // Verify the payment with Paystack
        const verificationResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            },
        });

        const paymentData = verificationResponse.data;

        if (paymentData.status !== 'success') {
            return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
        }

        // Check if the user already has an active subscription
        const existingSubscription = await db.subscription.findFirst({
            where: {
                userId,
                courseLevelId: levelId,
                validUntil: { gte: new Date() },
            },
        });

        if (existingSubscription) {
            return NextResponse.json({ error: 'You already have an active subscription to this level' }, { status: 400 });
        }

        // Calculate the expiration date (30 days from now)
        const validUntil = new Date();
        validUntil.setDate(validUntil.getDate() + 30);

        // Create a new subscription
        const subscription = await db.subscription.create({
            data: {
                userId,
                courseLevelId: levelId,
                validUntil,
            },
        });

        // Record the payment
        await db.payment.create({
            data: {
                userId,
                courseLevelId: levelId,
                courseId: paymentData.metadata.courseId,
                createdAt: new Date(),
            },
        });

        return NextResponse.json({ subscription });
    } catch (error) {
        return NextResponse.json({ error: 'Payment verification failed'}, { status: 500 });
    }
}
