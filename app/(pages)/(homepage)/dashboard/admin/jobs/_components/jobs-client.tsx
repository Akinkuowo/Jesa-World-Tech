"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { JobListing } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getColumns } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { JobForm } from "./job-form";
import { deleteJobListing } from "@/actions/marketing";
import { DataTable } from "../../../teacher/courses/_components/data-table";

interface JobsClientProps {
  initialData: JobListing[];
}

export const JobsClient = ({ initialData }: JobsClientProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobListing | null>(null);

  const onEdit = (job: JobListing) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    
    try {
      const res = await deleteJobListing(id);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success(res.success || "Job deleted");
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
        <h2 className="text-xl font-semibold text-slate-700">Job Listings</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingJob(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-electric-blue-600 hover:bg-electric-blue-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? "Edit Job Listing" : "Create New Job Listing"}</DialogTitle>
            </DialogHeader>
            <JobForm 
              initialData={editingJob} 
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
