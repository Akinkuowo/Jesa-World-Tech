"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("jesa_cookie_consent");
        if (!consent) {
            // Delay showing to ensure a smooth transition
            const timer = setTimeout(() => setIsVisible(true), 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const onAccept = () => {
        localStorage.setItem("jesa_cookie_consent", "true");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100] animate-in slide-in-from-bottom-5 duration-500">
            <div className="glass-card bg-navy-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                {/* Accent blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-electric-blue-500/10 blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-accent-500/10 blur-3xl -z-10" />

                <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-electric-blue-600/20 flex items-center justify-center text-electric-blue-400">
                        <Cookie className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-white font-bold flex items-center gap-2">
                                Cookie Consent
                                <Info className="w-4 h-4 text-cyan-accent-400 cursor-help" />
                            </h3>
                            <p className="text-white/60 text-sm mt-1 leading-relaxed">
                                We use cookies to enhance your experience, analyze site traffic, and provide personalized training content. 
                                By clicking <b>"Accept"</b>, you agree to our storage of cookies on your device.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <Button 
                                onClick={onAccept}
                                className="w-full sm:w-auto bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 hover:opacity-90 text-white font-bold rounded-xl h-10 px-6 transition-all"
                            >
                                Accept All
                            </Button>
                            <Link href="/cookies" className="text-white/40 hover:text-white text-xs underline underline-offset-4 transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};
