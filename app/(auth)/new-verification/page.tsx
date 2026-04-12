"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/auth";
import Link from "next/link";
import { Loader2, ShieldCheck, ShieldAlert, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NewVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const hasMounted = React.useRef(false);

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        } else {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#0a1128] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-navy-800 via-[#0a1128] to-[#0a1128] z-0"></div>
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-electric-blue-600/10 blur-[120px] z-0 pointer-events-none"></div>
      <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-cyan-accent-500/10 blur-[120px] z-0 pointer-events-none"></div>

      <div className="w-full max-w-2xl z-10 space-y-6">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-12 rounded-3xl shadow-2xl overflow-hidden relative group">
          {/* Subtle accent line mapping to loading state */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-electric-blue-600 to-cyan-accent-400 opacity-60">
            {!success && !error && (
              <div className="h-full bg-white/40 animate-pulse w-full"></div>
            )}
          </div>

          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 border border-white/10 flex items-center justify-center shadow-inner relative">
              <div className="absolute inset-0 rounded-2xl bg-electric-blue-500/20 blur-xl"></div>
              <KeyRound className="w-8 h-8 text-cyan-accent-400 relative z-10" />
            </div>

            <div>
              <h1 className="text-2xl font-display font-bold text-white mb-2">
                Authentication
              </h1>
              <p className="text-white/60 text-sm">
                {!success && !error && "Confirming your identity securely..."}
                {success && "Security verification complete."}
                {error && "Security verification failed."}
              </p>
            </div>

            <div className="flex flex-col items-center w-full justify-center min-h-[120px] py-4">
              {!success && !error && (
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-t-2 border-electric-blue-500 animate-spin w-14 h-14 opacity-50"></div>
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-accent-400" />
                </div>
              )}

              {success && (
                <div className="w-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex flex-col items-center gap-3 animate-in fade-in zoom-in slide-in-from-bottom-2 duration-500">
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                  <span className="text-sm font-medium">{success}</span>
                </div>
              )}

              {error && (
                <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex flex-col items-center gap-3 animate-in fade-in zoom-in slide-in-from-bottom-2 duration-500">
                  <ShieldAlert className="w-10 h-10 text-red-400" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Button asChild className="w-full bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 backdrop-blur-md rounded-xl py-6 transition-all duration-300">
                <Link href="/login" className="block w-full">
                  Return to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 font-medium">
          Secured by JESA World Technology
        </p>
      </div>
    </div>
  );
}
