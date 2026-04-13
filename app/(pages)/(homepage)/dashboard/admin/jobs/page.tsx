import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { JobsClient } from "./_components/jobs-client";

export default async function AdminJobsPage() {
  const session = await getSession();

  if (session?.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  const jobs = await db.jobListing.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Careers Management</h1>
        <p className="text-sm text-slate-500">
          Create and manage job opportunities for JESA World Technology.
        </p>
      </div>
      <JobsClient initialData={jobs} />
    </div>
  );
}
