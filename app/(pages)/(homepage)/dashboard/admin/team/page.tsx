import { db } from "@/lib/db";
import { TeamClient } from "./_components/team-client";

export default async function TeamPage() {
  const members = await db.teamMember.findMany({
    orderBy: {
      order: "asc"
    }
  });

  return (
    <div className="space-y-6">
       <TeamClient initialData={members} />
    </div>
  );
}
