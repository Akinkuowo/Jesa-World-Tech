// plans-table.tsx

"use client";

import { useAuth } from '@/components/providers/auth-provider';  
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import { Level } from '@prisma/client';
import { Loader2, ShieldCheck } from 'lucide-react';

// Dynamically import PaystackButton without SSR
const PaystackButton = dynamic(() => import('react-paystack').then(mod => mod.PaystackButton), { ssr: false });

interface PlansTableProps {
    levels: Level[];
    activeSubscriptions?: any[]; // Array of subscription objects with courseLevelId
}

export const PlansTable = ({ levels, activeSubscriptions = [] }: PlansTableProps) => {
    const { user, isLoading } = useAuth();
    const isSignedIn = !!user;
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-electric-blue-600" />
            </div>
        );
    }

    const email = user?.email || '';
    
    // Find the actual IDs from the levels prop based on expected names
    const getLevelId = (name: string) => {
        return levels.find(l => l.name.toLowerCase() === name.toLowerCase())?.id;
    };

    const plans = [
        { 
            name: "Basic", 
            dbName: "Beginner",
            price: 2000, 
            id: getLevelId("Beginner"),
            features: ["All Basic Level Tutorials", "News", "Career Opportunities"]
        },
        { 
            name: "Intermediate", 
            dbName: "Intermediate",
            price: 3500, 
            id: getLevelId("Intermediate"),
            features: ["All Intermediate Level Tutorials", "News", "Career Opportunities"]
        },
        { 
            name: "Advance", 
            dbName: "Advance",
            price: 5000, 
            id: getLevelId("Advance"),
            features: ["All Advanced Level Tutorials", "News", "Career Opportunities", "Online Classes"]
        },
    ];

    const getPaymentConfig = (levelId: string, amount: number) => ({
        email,
        amount: amount * 100, // Convert to kobo
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '', 
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
            toast.success("Payment successful! Verifying...", {
                style: { borderRadius: '10px', background: '#333', color: '#fff' }
            });

            axios.post('/api/payment/', { reference, paidAmount: amount })
            .then(response => {
                toast.success("Subscription updated successfully!", {
                    style: { borderRadius: '10px', background: '#333', color: '#fff' }
                });
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                toast.error("Verification failed. Please contact support.");
            });
        },
        onClose: () => {
            toast.error("Payment cancelled");
        }
    });

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 p-6 lg:p-10">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Path</h1>
                <p className="text-slate-500 max-w-2xl mx-auto">
                    Select the level that matches your career goals. Gain immediate access to professional technical guides and industry insights.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                {/* Free Plan */}
                <div className="bg-white shadow-sm border border-slate-200 rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Always</span>
                        <h2 className="text-2xl font-bold text-slate-800 mt-1">Free Plan</h2>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                        <div className="text-center mb-8">
                            <span className="text-4xl font-bold text-slate-900">₦0</span>
                        </div>
                        <ul className="space-y-4 text-slate-600 mb-10 flex-1">
                            <li className="flex items-start gap-x-2">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                </div>
                                Free Course Videos
                            </li>
                            <li className="flex items-start gap-x-2">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                </div>
                                News & Firm Updates
                            </li>
                            <li className="flex items-start gap-x-2">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                </div>
                                Career Opportunities
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full rounded-2xl h-12 font-bold border-2" disabled>
                            Included by Default
                        </Button>
                    </div>
                </div>

                {/* Paid Plans */}
                {plans.map((plan) => (
                    <div key={plan.name} className="bg-white shadow-sm border border-slate-200 rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-shadow relative group">
                        <div className="bg-electric-blue-50 p-8 text-center border-b border-slate-100">
                            <span className="text-sm font-bold text-electric-blue-600 uppercase tracking-widest">{plan.name}</span>
                            <h2 className="text-2xl font-bold text-slate-800 mt-1">{plan.name} Plan</h2>
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                            <div className="text-center mb-8">
                                <span className="text-4xl font-bold text-slate-900">₦{plan.price}</span>
                                <span className="text-slate-400 text-sm ml-1">/ month</span>
                            </div>
                            <ul className="space-y-4 text-slate-600 mb-10 flex-1">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-x-2">
                                        <div className="h-5 w-5 rounded-full bg-electric-blue-100 flex items-center justify-center mt-0.5">
                                            <div className="h-2 w-2 rounded-full bg-electric-blue-600" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            
                            {plan.id ? (
                                (() => {
                                    const isSubscribed = activeSubscriptions.some(sub => sub.courseLevelId === plan.id);
                                    
                                    if (isSubscribed) {
                                        return (
                                            <Button 
                                                className="w-full h-12 bg-emerald-500 text-white font-bold rounded-2xl cursor-default opacity-80"
                                                disabled
                                            >
                                                <ShieldCheck className="mr-2 h-5 w-5" />
                                                Subscribed
                                            </Button>
                                        );
                                    }

                                    return (
                                        <PaystackButton
                                            className="w-full h-12 bg-electric-blue-600 text-white font-bold rounded-2xl hover:bg-electric-blue-700 transition-all flex items-center justify-center shadow-lg shadow-electric-blue-200"
                                            {...getPaymentConfig(plan.id, plan.price)}
                                        >
                                            Subscribe Now
                                        </PaystackButton>
                                    );
                                })()
                            ) : (
                                <Button className="w-full h-12 rounded-2xl font-bold" disabled>
                                    Plan Unavailable
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
