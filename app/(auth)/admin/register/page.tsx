"use client";

import { useState } from "react";
import { signupAdmin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminRegisterPage() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrors({});
    const result = await signupAdmin(formData);
    if (result?.errors) {
      setErrors(result.errors as Record<string, string[]>);
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-electric-blue-500/10 mb-4 border border-electric-blue-500/20">
          <ShieldCheck className="w-8 h-8 text-electric-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Registration</h1>
        <p className="text-white/50 text-sm">Create a master account with full privileges</p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        {errors.email && errors.email[0] === "Email already in use." && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.email[0]}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/60 text-xs uppercase tracking-wider">Full Name</Label>
          <Input 
            id="name" 
            name="name" 
            type="text" 
            placeholder="Admin One" 
            required 
            className={`bg-navy-800/50 border-white/10 text-white placeholder:text-white/20 focus:border-electric-blue-500/50 transition-all ${errors.name ? "border-red-500/50" : ""}`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider">Admin Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="admin@jesaworld.tech" 
            required 
            className={`bg-navy-800/50 border-white/10 text-white placeholder:text-white/20 focus:border-electric-blue-500/50 transition-all ${errors.email ? "border-red-500/50" : ""}`}
          />
          {errors.email && errors.email[0] !== "Email already in use." && <p className="text-red-400 text-xs mt-1">{errors.email[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-white/60 text-xs uppercase tracking-wider">Password</Label>
          <PasswordInput 
            id="password" 
            name="password" 
            placeholder="••••••••" 
            required 
            className={`bg-navy-800/50 border-white/10 text-white placeholder:text-white/20 focus:border-electric-blue-500/50 transition-all ${errors.password ? "border-red-500/50" : ""}`}
          />
          {errors.password && <p className="text-red-400 text-[10px] mt-2 leading-relaxed">{errors.password.join(" ")}</p>}
        </div>

        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-electric-blue-600 to-indigo-600 text-white font-semibold py-6 mt-4 hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register Admin"}
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-white/40 text-sm">
          Already have an admin account?{" "}
          <Link href="/admin/login" className="text-cyan-accent-400 hover:text-cyan-accent-300 transition-colors font-medium">
            Admin Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
