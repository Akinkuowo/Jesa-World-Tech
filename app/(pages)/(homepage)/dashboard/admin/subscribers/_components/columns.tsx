"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock } from "lucide-react";

export type SubscriberWithDetails = {
  id: string;
  validUntil: Date;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
  courseLevel: {
    name: string;
  };
};

export const columns: ColumnDef<SubscriberWithDetails>[] = [
  {
    accessorKey: "user.name",
    header: "Student",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{user.name || "N/A"}</span>
          <span className="text-xs text-slate-500">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "courseLevel.name",
    header: "Plan",
    cell: ({ row }) => {
      const level = row.original.courseLevel.name;
      return (
        <Badge variant="outline" className="bg-electric-blue-50 text-electric-blue-700 border-electric-blue-200">
          {level}
        </Badge>
      );
    },
  },
  {
    accessorKey: "validUntil",
    header: "Status",
    cell: ({ row }) => {
      const validUntil = new Date(row.original.validUntil);
      const isActive = validUntil > new Date();

      return (
        <div className="flex items-center gap-x-2">
          {isActive ? (
            <Badge className="bg-emerald-500 hover:bg-emerald-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-slate-100 text-slate-500">
              <Clock className="h-3 w-3 mr-1" />
              Expired
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "validUntil",
    header: "Expiry Date",
    cell: ({ row }) => {
      const date = new Date(row.original.validUntil);
      return (
        <div className="text-slate-600">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(date)}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-slate-500 text-xs">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(date)}
        </div>
      );
    },
  },
];
