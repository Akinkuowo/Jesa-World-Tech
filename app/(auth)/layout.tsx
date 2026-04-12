import { Zap } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-blue-600 to-cyan-accent-600 flex items-center justify-center shadow-lg shadow-electric-blue-500/20">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="font-display font-bold text-2xl text-white">
          JESA <span className="gradient-text">World</span>
        </span>
      </Link>
      <div className="w-full max-w-md">
        <div className="gradient-border rounded-2xl p-px">
          <div className="bg-navy-900 rounded-2xl p-8 shadow-2xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
