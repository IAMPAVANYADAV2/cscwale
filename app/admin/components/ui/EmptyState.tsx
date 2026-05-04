import { type ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-12 text-center">
      <div className="flex justify-center mb-4 text-slate-500">
        {icon || <Inbox className="w-10 h-10" />}
      </div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      {description && <p className="text-slate-400 text-sm">{description}</p>}
    </div>
  );
}
