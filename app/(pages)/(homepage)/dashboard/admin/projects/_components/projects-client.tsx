"use client";

import { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { Project } from "@prisma/client";
import { Button } from "@/components/ui/button";

import { getColumns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "./project-form";
import { deleteProject } from "@/actions/marketing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DataTable } from "../../../teacher/courses/_components/data-table";

// Since this is a client component but needs the initial list, 
// we'll expect the projects to be fetched in a parent or via a separate fetch.
// Actually, I'll make the main page a Server Component and pass data to a Client Component.

interface ProjectsClientProps {
  initialData: Project[];
}

export const ProjectsClient = ({ initialData }: ProjectsClientProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const onEdit = (project: Project) => {
    setEditingProject(project);
    setIsDialogOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const res = await deleteProject(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Project deleted");
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
        <h2 className="text-xl font-semibold">Project List</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingProject(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
            </DialogHeader>
            <ProjectForm 
              initialData={editingProject} 
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
