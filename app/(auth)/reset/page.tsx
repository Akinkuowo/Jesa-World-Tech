"use client";

import { useState } from "react";
import { reset } from "@/actions/auth";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function ResetPage() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(undefined);
    setSuccess(undefined);

    const formData = new FormData(e.currentTarget);

    reset(formData)
      .then((data) => {
        setError(data?.error || data?.errors?.email?.[0]);
        setSuccess(data?.success);
      })
      .catch(() => setError("Something went wrong!"))
      .finally(() => setIsPending(false));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg shadow-navy-900/5">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-display font-bold text-navy-900">
            Forgot your password?
          </h1>
          <p className="text-sm text-slate-500">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              disabled={isPending}
              required
              placeholder="you@example.com"
              className="w-full p-2.5 border rounded-lg border-slate-200 focus:outline-none focus:ring-2 focus:ring-electric-blue-500/50 focus:border-electric-blue-500 transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-900 hover:to-navy-950 text-white rounded-lg font-medium transition-all shadow-md shadow-navy-900/20 disabled:opacity-70 flex items-center justify-center"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Send reset email"
            )}
          </button>
        </form>

        <div className="pt-4 text-center border-t border-slate-100">
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
