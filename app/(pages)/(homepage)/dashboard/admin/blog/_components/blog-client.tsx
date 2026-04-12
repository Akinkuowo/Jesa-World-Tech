"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { BlogPost } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../teacher/courses/_components/data-table";
import { getColumns } from "./_components/columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogForm } from "./_components/blog-form";
import { deleteBlogPost } from "@/actions/marketing";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface BlogClientProps {
  initialData: BlogPost[];
}

export const BlogClient = ({ initialData }: BlogClientProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const onEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsDialogOpen(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await deleteBlogPost(id);
      if (res.error) toast.error(res.error);
      else {
        toast.success("Post deleted");
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
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingPost(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Post" : "Create New Post"}</DialogTitle>
            </DialogHeader>
            <BlogForm 
              initialData={editingPost} 
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
