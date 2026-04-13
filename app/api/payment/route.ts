import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server'; // Use NextRequest and NextResponse for App Router
import { db } from '@/lib/db';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse JSON request body in App Router
    const { reference, paidAmount } = body;

    if (!reference || !paidAmount) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    // Handle case where reference might be an object or a string
    const trfRef = typeof reference === 'string' ? reference.trim() : reference?.reference?.trim();

    if (!trfRef) {
      return NextResponse.json({ message: 'Invalid transaction reference' }, { status: 400 });
    }

    // Make the request to Paystack's verification endpoint
    const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${trfRef}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    // Check if the payment was successful
    if (data.data.status === 'success') {
      const { metadata, amount } = data.data;

      // Extract the courseLevelId and userId from the metadata
      const courseLevelId = metadata?.custom_fields?.find(
        (field: any) => field.variable_name === 'levelId'
      )?.value;

      const userId = metadata?.custom_fields?.find(
        (field: any) => field.variable_name === 'userId'
      )?.value;

      // Optionally, validate the amount
      const expectedAmount = paidAmount * 100; // Convert to kobo (if needed)
      if (amount !== expectedAmount) {
        return NextResponse.json({ message: 'Invalid payment amount' }, { status: 400 });
      }

      // Ensure courseLevelId and userId are not undefined
      if (!courseLevelId || !userId) {
        return NextResponse.json({ message: 'Invalid metadata' }, { status: 400 });
      }

      // Update or create a subscription record for the user
      const validUntil = new Date();
      validUntil.setMonth(validUntil.getMonth() + 1);

      await db.subscription.upsert({
        where: {
          userId_courseLevelId: {
            userId,
            courseLevelId,
          },
        },
        update: {
          validUntil,
        },
        create: {
          userId,
          courseLevelId,
          validUntil,
        },
      });

     let paystackCustomer =  await db.paystackCustomer.findUnique({
        where: {
          userId: userId
        },
        select: {
          paystackCustomerId: true
        }
      })

      if(!paystackCustomer){
        const newPaystackCustomer = await db.paystackCustomer.create({
          data: {
            userId: userId,
            paystackCustomerId: userId
          }
        })
      }

      return NextResponse.json({ message: 'Payment verified and subscription updated.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Payment not successful' }, { status: 400 });
    }
  } catch (error: any) {
    console.log('Error verifying payment:', error);
    if (error.response) {
      console.log('Paystack Error Response:', error.response.data);
    }

    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
