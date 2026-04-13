import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { getSubscribers } from "@/actions/get-subscribers";
import { SubscribersClient } from "./_components/subscribers-client";
import { SubscriberWithDetails } from "./_components/columns";

export default async function AdminSubscribersPage() {
  const session = await getSession();

  if (session?.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  const subscribers = await getSubscribers() as SubscriberWithDetails[];

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Subscriptions</h1>
        <p className="text-sm text-slate-500">
          Monitor and track all student payment plans and subscription statuses.
        </p>
      </div>
      <SubscribersClient initialData={subscribers} />
    </div>
  );
}
