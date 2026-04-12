import { db } from "@/lib/db";
import { ProjectsClient } from "./_components/projects-client";

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="space-y-6">
       <ProjectsClient initialData={projects} />
    </div>
  );
}
