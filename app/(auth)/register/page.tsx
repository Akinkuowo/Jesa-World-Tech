"use client";

import { useState } from "react";
import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setErrors({});
    const result = await signup(formData);
    if (result?.errors) {
      setErrors(result.errors as Record<string, string[]>);
      setIsLoading(false);
    }
  }

  const passwordErrors = errors.password || [];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-white/50 text-sm">Join the JESA World Technology network</p>
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
            placeholder="John Doe" 
            required 
            className={`bg-navy-800/50 border-white/10 text-white placeholder:text-white/20 focus:border-electric-blue-500/50 transition-all ${errors.name ? "border-red-500/50" : ""}`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/60 text-xs uppercase tracking-wider">Email Address</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="name@example.com" 
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
          className="w-full bg-gradient-to-r from-electric-blue-600 to-cyan-accent-600 text-white font-semibold py-6 mt-4 hover:shadow-lg hover:shadow-electric-blue-500/30 transition-all duration-300"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
        </Button>
      </form>

      <div className="text-center pt-2">
        <p className="text-white/40 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-accent-400 hover:text-cyan-accent-300 transition-colors font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
