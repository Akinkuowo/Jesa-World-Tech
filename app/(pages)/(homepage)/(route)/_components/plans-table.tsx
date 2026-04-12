// plans-table.tsx

"use client";

import { useAuth, useUser } from '@clerk/nextjs';  
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { db } from '@/lib/db';

// Dynamically import PaystackButton without SSR
const PaystackButton = dynamic(() => import('react-paystack').then(mod => mod.PaystackButton), { ssr: false });

export const PlansTable = () => {
    const { isSignedIn } = useAuth();
    const { user } = useUser(); 
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false); // Track if component is mounted in client
    const [subscriptions, setSubscriptions] = useState<{ [key: string]: boolean }>({});
    
    useEffect(() => {
        // Ensure the component is only rendered on the client
        setIsClient(true);
    }, []);


    // Return null if not on the client side
    if (!isClient) {
        return null;
    }

    // Extract user's email
    const email = user?.emailAddresses[0]?.emailAddress || '';
    
    // Define level IDs and their respective prices
    const plans = {
        BASIC: { id: "058dcd46-9d78-45df-9e52-6687f51f76e1", price: 2000 },
        INTERMEDIATE: { id: "9f4e9154-7b5f-411e-aec9-619148baefcf", price: 3500 },
        ADVANCE: { id: "836d9f62-73f8-4c27-942c-c7ac06707296", price: 5000 },
    };

    // Payment configuration for Paystack
    const getPaymentConfig = (levelId: string, amount: number) => ({
        email,
        amount: amount * 100, // Convert to kobo
        publicKey: 'pk_test_77fbe4b19bee6d1fe6aa9aac47c6f3dcfb559e15', 
        metadata: {
            custom_fields: [
                {
                    display_name: "Subscription Level",
                    variable_name: "levelId",
                    value: levelId,
                },
                {
                    display_name: "Email",
                    variable_name: "email",
                    value: email,
                },
                {
                    display_name: "UserId",
                    variable_name: "userId",
                    value: user?.id,
                }
            ]
        },
        onSuccess: (reference: any) => {
            // Handle successful payment
            toast.success("Payment was successful! Awaiting verification", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });

            // Send reference or transaction data to your server for verification
            axios.post('/api/payment/', { reference, paidAmount: amount })
            .then(response => {
                console.log(response.data);
                toast.success("Payment Verified and subscription updated", {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                });
            })
            .catch(error => {
                console.error(error);
            });

        },
        onClose: () => {
            toast.error("Payment was not completed", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
    });

    const renderPlan = (title: string, price: number, levelId: string) => (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className={`p-6 text-center text-white font-bold text-lg ${price === 2000 ? 'bg-teal-500' : price === 3500 ? 'bg-blue-500' : 'bg-teal-500'}`}>
                {title} Plan
            </div>
            <div className="p-6 text-center">
                <p className="text-4xl font-bold text-gray-800">₦{price}</p>
                <ul className="my-4 space-y-2 text-gray-600">
                    <li>{price === 2000 ? "All Basic Level Tutorials" : price === 3500 ? "All Intermediate Level Tutorials" : "All Advanced Level Tutorials"}</li>
                    <li>News</li>
                    <li>Career Opportunities</li>
                    {price === 5000 && <li>Online Classes</li>}
                </ul>
                <PaystackButton
                    className="bg-teal-500 text-white font-semibold py-2 px-4 rounded"
                    {...getPaymentConfig(levelId, price)}
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Subscribe'}
                </PaystackButton>
            </div>
        </div>
    );

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                {/* Free Plan */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="bg-teal-500 p-6 text-center text-white font-bold text-lg">Free Plan</div>
                    <div className="p-6 text-center">
                        <p className="text-4xl font-bold text-gray-800">₦0</p>
                        <ul className="my-4 space-y-2 text-gray-600">
                            <li>Free Course Videos</li>
                            <li>News</li>
                            <li>Career Opportunities</li>
                        </ul>
                    </div>
                </div>

                {/* Basic Plan */}
                {renderPlan('Basic', plans.BASIC.price, plans.BASIC.id)}

                {/* Intermediate Plan */}
                {renderPlan('Intermediate', plans.INTERMEDIATE.price, plans.INTERMEDIATE.id)}

                {/* Advance Plan */}
                {renderPlan('Advance', plans.ADVANCE.price, plans.ADVANCE.id)}
            </div>
        </div>
    );
};
