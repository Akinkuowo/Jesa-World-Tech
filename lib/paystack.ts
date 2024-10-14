// import { dbClient } from '@db/client';
import axios from 'axios';
import { db } from './db';
import { auth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { reference, levelId } = req.body;
    const { userId } = auth();  // Clerk authentication to get user ID

    if (!reference || !levelId) {
        return res.status(400).json({ error: 'Payment reference or level ID is missing' });
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
            return res.status(400).json({ error: 'Payment verification failed' });
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
            return res.status(400).json({ error: 'You already have an active subscription to this level' });
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

        return res.status(200).json({ subscription });
    } catch (error) {
        return res.status(500).json({ error: 'Payment verification failed'});
    }
}
