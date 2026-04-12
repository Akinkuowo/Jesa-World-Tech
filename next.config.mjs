/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            }
        ]
    },
    transpilePackages: ["uploadthing", "@uploadthing/react"]
};

export default nextConfig;

