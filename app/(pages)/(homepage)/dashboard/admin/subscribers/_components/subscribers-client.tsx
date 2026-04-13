"use client";

import { DataTable } from "../../../teacher/courses/_components/data-table";
import { columns, SubscriberWithDetails } from "./columns";

interface SubscribersClientProps {
  initialData: SubscriberWithDetails[];
}

export const SubscribersClient = ({ initialData }: SubscribersClientProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h2 className="text-xl font-semibold text-slate-700 tracking-tight">Active Subscriptions</h2>
          <p className="text-sm text-slate-500">
            A comprehensive list of students currently enrolled in your training plans.
          </p>
        </div>
      </div>
      <div className="p-4 bg-white rounded-xl border shadow-sm">
         <DataTable columns={columns} data={initialData} />
      </div>
    </div>
  );
};
