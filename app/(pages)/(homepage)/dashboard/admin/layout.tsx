import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return redirect("/dashboard");
  }

  return (
    <div className="h-full p-6">
      <div className="flex flex-col gap-y-2 mb-8">
        <h1 className="text-2xl font-bold text-navy-900 border-b pb-4">
          Marketing Administration
        </h1>
        <p className="text-sm text-slate-500">
          Manage your IT firm's public presence, including projects, blog articles, and your expert team.
        </p>
      </div>
      {children}
    </div>
  );
}
