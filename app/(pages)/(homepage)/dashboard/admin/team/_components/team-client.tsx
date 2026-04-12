"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { TeamMember } from "@prisma/client";
import { Button } from "@/components/ui/button";

import { getColumns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TeamForm } from "./team-form";
import { deleteTeamMember } from "@/actions/marketing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DataTable } from "../../../teacher/courses/_components/data-table";

interface TeamClientProps {
  initialData: TeamMember[];
}

export const TeamClient = ({ initialData }: TeamClientProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const onEdit = (member: TeamMember) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    
    try {
      const res = await deleteTeamMember(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Member deleted");
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  const columns = getColumns({ onEdit, onDelete });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Our Team</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingMember(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
            </DialogHeader>
            <TeamForm 
              initialData={editingMember} 
              onSuccess={() => setIsDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4 bg-white rounded-xl border shadow-sm">
         <DataTable columns={columns} data={initialData} />
      </div>
    </div>
  );
};
