import { getMySubscriptions } from "@/actions/get-my-subscriptions";
import { CreditCard, ShieldCheck, Calendar, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MySubscriptionPage = async () => {
    const subscriptions = await getMySubscriptions();

    return ( 
        <div className="p-6 lg:p-10 max-w-5xl mx-auto min-h-screen">
            <div className="flex flex-col gap-y-2 mb-10">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-x-2">
                    <ShieldCheck className="h-8 w-8 text-electric-blue-600" />
                    My Subscriptions
                </h1>
                <p className="text-slate-500">
                    Manage your active plans and view your digital learning access.
                </p>
            </div>

            {subscriptions.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center flex flex-col items-center gap-y-4">
                    <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <Zap className="h-8 w-8 text-slate-400" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">No active subscriptions</h2>
                    <p className="text-slate-500 max-w-sm">
                        You haven&apos;t joined any professional learning paths yet. Subscribe to unlock elite technical guides and career growth tools.
                    </p>
                    <Link href="/dashboard/plan">
                        <Button className="mt-4 bg-electric-blue-600 hover:bg-electric-blue-700 text-white rounded-2xl h-12 px-8 font-bold flex items-center gap-x-2 transition-all shadow-lg shadow-electric-blue-200">
                            Explore Plans
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {subscriptions.map((sub: any) => (
                        <div key={sub.id} className="bg-white shadow-sm border border-slate-200 rounded-3xl p-8 hover:shadow-md transition-all group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-electric-blue-50 text-electric-blue-600 group-hover:scale-110 transition-transform">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                                    Active
                                </span>
                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                {sub.courseLevel.name} Plan
                            </h3>
                            
                            <div className="flex flex-col gap-y-4 mt-6">
                                <div className="flex items-center gap-x-3 text-slate-600">
                                    <Calendar className="h-5 w-5 text-slate-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 font-medium">Next Renewal</span>
                                        <span className="text-sm font-semibold">
                                            {new Date(sub.validUntil).toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            })}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100">
                                    <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-3">Included Benefits</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-x-2 text-sm text-slate-600">
                                            <div className="h-1.5 w-1.5 rounded-full bg-electric-blue-600" />
                                            Professional Technical Guides
                                        </li>
                                        <li className="flex items-center gap-x-2 text-sm text-slate-600">
                                            <div className="h-1.5 w-1.5 rounded-full bg-electric-blue-600" />
                                            Firm Updates & News
                                        </li>
                                        <li className="flex items-center gap-x-2 text-sm text-slate-600">
                                            <div className="h-1.5 w-1.5 rounded-full bg-electric-blue-600" />
                                            Career Growth Tools
                                        </li>
                                    </ul>
                                </div>

                                <div className="mt-8 flex gap-x-4">
                                    <Link href="/dashboard/plan" className="flex-1">
                                        <Button variant="outline" className="w-full rounded-2xl border-2 font-bold h-12">
                                            Manage Plan
                                        </Button>
                                    </Link>
                                    <Link href="/dashboard" className="flex-1">
                                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold h-12">
                                            Go to Study
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
 
export default MySubscriptionPage;
