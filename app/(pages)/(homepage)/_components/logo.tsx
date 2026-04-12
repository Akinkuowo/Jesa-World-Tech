import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center group cursor-pointer transition-opacity hover:opacity-90">
            <div className="relative w-48 h-14">
                <Image
                    src="/logo.png"
                    alt="JESA World Technology Logo"
                    fill
                    className="object-contain brightness-0 invert"
                />
            </div>
        </Link>
    );
};