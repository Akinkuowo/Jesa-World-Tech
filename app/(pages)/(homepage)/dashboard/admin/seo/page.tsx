import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getSEOConfig } from "@/actions/admin-seo";
import { SEOForm } from "./_components/seo-form";
import { Search } from "lucide-react";
import { db } from "@/lib/db";

const AdminSEOPage = async () => {
    const session = await getSession();
    const userId = session?.userId as string;

    if (!userId) {
        return redirect("/");
    }

    const user = await db.user.findUnique({
        where: { id: userId }
    });

    if (user?.role !== "ADMIN") {
        return redirect("/dashboard");
    }

    const seoConfig = await getSEOConfig();

    if (!seoConfig) {
        return <div>Failed to load SEO configuration.</div>;
    }

    return ( 
        <div className="p-6 lg:p-10 max-w-5xl mx-auto">
            <div className="flex flex-col gap-y-2 mb-10">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-x-3">
                    <Search className="h-8 w-8 text-electric-blue-600" />
                    SEO Management
                </h1>
                <p className="text-slate-500">
                    Fine-tune JESA World Technology&apos;s digital presence across search engines and social platforms.
                </p>
            </div>

            <SEOForm initialData={seoConfig} />
        </div>
    );
}
 
export default AdminSEOPage;
