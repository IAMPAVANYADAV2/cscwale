const statusStyles: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  processing: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  approved: "bg-green-500/15 text-green-300 border-green-500/30",
  completed: "bg-green-500/15 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/15 text-red-300 border-red-500/30",
  rejected: "bg-red-500/15 text-red-300 border-red-500/30",
  declined: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  unread: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  read: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  replied: "bg-green-500/15 text-green-300 border-green-500/30",
  archived: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  spam: "bg-red-500/15 text-red-400 border-red-500/30",
  "follow-up": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  active: "bg-green-500/15 text-green-300 border-green-500/30",
  blocked: "bg-red-500/15 text-red-300 border-red-500/30",
  inactive: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  new: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  contacted: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  converted: "bg-green-500/15 text-green-300 border-green-500/30",
  lost: "bg-red-500/15 text-red-300 border-red-500/30",
  trial: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  lite: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  pro: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  free: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  paid: "bg-green-500/15 text-green-300 border-green-500/30",
  unpaid: "bg-slate-500/15 text-slate-300 border-slate-500/30",
  failed: "bg-red-500/15 text-red-300 border-red-500/30",
  refunded: "bg-blue-500/15 text-blue-300 border-blue-500/30",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = statusStyles[status] || "bg-slate-500/15 text-slate-300 border-slate-500/30";
  return (
    <span className={`inline-flex text-xs px-2.5 py-0.5 rounded-md border font-medium ${style} ${className}`}>
      {status.replace("-", " ")}
    </span>
  );
}
