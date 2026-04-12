import { Zap } from "lucide-react";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue-600 to-cyan-accent-600 flex items-center justify-center shadow-lg shadow-electric-blue-500/20">
                <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg leading-tight">
                <span className="text-navy-900">JESA</span>
                <span className="text-electric-blue-600"> World</span>
            </span>
        </Link>
    );
};