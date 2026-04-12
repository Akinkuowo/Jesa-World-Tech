"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/auth";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function NewVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg shadow-navy-900/5">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-display font-bold text-navy-900">
            Verify your email
          </h1>
          <p className="text-sm text-slate-500">
            Confirming your verification token...
          </p>
        </div>

        <div className="flex flex-col items-center w-full justify-center min-h-[100px]">
          {!success && !error && (
            <Loader2 className="w-8 h-8 animate-spin text-electric-blue-600" />
          )}

          {success && (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-md w-full text-center text-sm font-medium">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md w-full text-center text-sm font-medium">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Link
            href="/login"
            className="text-sm font-medium text-electric-blue-600 hover:text-electric-blue-700 transition"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
