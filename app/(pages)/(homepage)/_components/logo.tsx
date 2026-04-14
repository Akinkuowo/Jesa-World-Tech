import Image from "next/image";

interface LogoProps {
    className?: string;
}

export const Logo = ({ className }: LogoProps) => {
    return (
        <div className="relative w-48 h-14">
            <Image
                src="/logo.png"
                alt="JESA World Technology Logo"
                fill
                className={`object-contain ${className || ""}`}
            />
        </div>
    );
};