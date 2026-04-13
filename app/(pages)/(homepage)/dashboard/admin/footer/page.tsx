import { db } from "@/lib/db";
import { FooterForm } from "./_components/footer-form";

export default async function FooterAdminPage() {
  const footerConfig = await db.footerConfig.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-bold text-navy-950">Manage Footer</h1>
        <p className="text-sm text-slate-500">
          Control the marketing landing page footer content, links, and contact information.
        </p>
      </div>
      <FooterForm initialData={footerConfig} />
    </div>
  );
}
