"use client";

import { useState } from "react";
import { login } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await login(formData);
    if (result?.errors) {
      setError(Object.values(result.errors).flat()[0] as string);
      setIsLoading(false);
    }
    // Redirection is handled in the server action based on user role
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-500/10 mb-4 border border-indigo-500/20">
          <ShieldCheck className="w-8 h-8 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
        <p className="text-white/50 text-sm">Sign in to manage the JESA platform</p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider">Admin Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="admin@jesaworld.tech" 
            required 
            className="bg-navy-800/50 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/50 transition-all"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-white/60 text-xs uppercase tracking-wider">Password</Label>
          </div>
          <PasswordInput 
            id="password" 
            name="password" 
            placeholder="••••••••" 
            required 
            showChecklist={false}
            className="bg-navy-800/50 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/50 transition-all"
          />
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-electric-blue-600 text-white font-semibold py-6 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authorize Admin"}
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-white/40 text-sm">
          New administrator?{" "}
          <Link href="/admin/register" className="text-cyan-accent-400 hover:text-cyan-accent-300 transition-colors font-medium">
            Setup Admin Account
          </Link>
        </p>
      </div>
    </div>
  );
}
