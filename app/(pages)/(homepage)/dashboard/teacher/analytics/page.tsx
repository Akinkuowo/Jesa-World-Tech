import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getAnalytics } from "@/actions/get-analytics";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { TrendingUp, Users } from "lucide-react";

const AnalyticsPage = async () => {
    const session = await getSession();
    const userId = session?.userId as string;

    if (!userId) {
        return redirect("/");
    }

    const { data, totalRevenue, totalSales } = await getAnalytics(userId);

    return ( 
        <div className="p-6 lg:p-10 max-w-6xl mx-auto min-h-screen">
            <div className="flex flex-col gap-y-2 mb-10">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-x-2">
                    <TrendingUp className="h-8 w-8 text-electric-blue-600" />
                    Analytics Dashboard
                </h1>
                <p className="text-slate-500">
                    Track your course performance, revenue, and student growth.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                />
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                />
            </div>

            <div className="mt-8">
                <Chart data={data} />
            </div>

            {data.length === 0 && (
                <div className="mt-10 bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center gap-y-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <Users className="h-8 w-8 text-slate-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">No data available yet</h2>
                    <p className="text-slate-500 max-w-sm">
                        As students enroll in your courses, their payment data will appear here in real-time.
                    </p>
                </div>
            )}
        </div>
    );
}
 
export default AnalyticsPage;