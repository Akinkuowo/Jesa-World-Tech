"use client"

import { CurrencyIcon } from "lucide-react";
import { useAuth } from '@clerk/nextjs';  // Assuming Clerk for authentication
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

export const PlansTable = () => {
    const { isSignedIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const subscribe = async (levelId: any) => {
        if (!isSignedIn) {
            return (
              toast.error("You need to be signed in to subscribe", {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  }
            })
            )
        }

        try {
            setLoading(true);
            const response = await axios.post('/api/paystack', { levelId });
            toast.success("Subscription was successful", {
              style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                }
          })
        } catch (err) {
          toast.error(`An Error occured ${err}`, {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              }
        })
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto">
            {/* Pricing Card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-teal-500 p-6 text-center text-white font-bold text-lg">Free Plan</div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold text-gray-800">₦0</p>
                <ul className="my-4 space-y-2 text-gray-600">
                  <li>Free Course Video</li>
                  <li>News</li>
                  <li>Career oppurtunities</li>
                </ul>
                {/* <button className="bg-teal-500 text-white font-semibold py-2 px-4 rounded">SIGN UP</button> */}
              </div>
            </div>
    
            {/* Repeat for each pricing card */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-teal-500 p-6 text-center text-white font-bold text-lg">Basic Plan</div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold text-gray-800">₦2,000</p>
                <ul className="my-4 space-y-2 text-gray-600">
                  <li>All Basic Level Tutorials</li>
                  <li>News</li>
                  <li>Career oppurtunities</li>
                </ul>
                <Button 
                  className="bg-teal-500 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => subscribe("058dcd46-9d78-45df-9e52-6687f51f76e1")}  // Assuming levelId 1 is for Basic Plan
                  disabled={loading}  
                >
                  Subscribe
                  </Button>
              </div>
            </div>
    
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative">
              {/* <div className="absolute top-0 right-0 bg-blue-500 text-white font-bold px-2 py-1 rounded-bl-lg">Most popular</div> */}
              <div className="bg-blue-500 p-6 text-center text-white font-bold text-lg">Intermediate Plan</div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold text-gray-800">₦3,500</p>
                <ul className="my-4 space-y-2 text-gray-600">
                  <li>All Intermediate Level Tutorials</li>
                  <li>News</li>
                  <li>Career oppurtunities</li>
                </ul>
                <Button 
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => subscribe("9f4e9154-7b5f-411e-aec9-619148baefcf")}  
                  disabled={loading}
                >
                  Subscribe
                </Button>
              </div>
            </div>
    
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="bg-teal-500 p-6 text-center text-white font-bold text-lg">Advance Plan</div>
              <div className="p-6 text-center">
                <p className="text-4xl font-bold text-gray-800">₦5,000</p>
                <ul className="my-4 space-y-2 text-gray-600">
                  <li>All Advance Level Tutorials</li>
                  <li>Online classes</li>
                  <li>News</li>
                  <li>Career oppurtunities</li>
                </ul>
                <Button 
                  className="bg-teal-500 text-white font-semibold py-2 px-4 rounded"
                  onClick={() => subscribe("836d9f62-73f8-4c27-942c-c7ac06707296")}  
                  disabled={loading}
                >
                    Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
}