import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

export const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden group hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-slate-50/50">
        <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="text-3xl font-bold text-slate-900 group-hover:text-electric-blue-600 transition-colors">
          {shouldFormat ? `₦${value.toLocaleString()}` : value}
        </div>
      </CardContent>
    </Card>
  );
};
