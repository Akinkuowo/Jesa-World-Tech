import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center group cursor-pointer transition-opacity hover:opacity-90 mb-8">
        <div className="relative w-64 h-20">
          <Image
            src="/logo.png"
            alt="JESA World Technology Logo"
            fill
            className="object-contain brightness-0 invert"
          />
        </div>
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
