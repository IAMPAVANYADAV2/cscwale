import { type ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: number | string;
  subtitle?: string;
  icon: ReactNode;
  color: "blue" | "green" | "red" | "purple" | "pink" | "cyan" | "amber" | "teal";
}

const colorMap = {
  blue: "from-blue-900/30 to-blue-800/10 border-blue-600/30 text-blue-300",
  green: "from-green-900/30 to-green-800/10 border-green-600/30 text-green-300",
  red: "from-red-900/30 to-red-800/10 border-red-600/30 text-red-300",
  purple: "from-purple-900/30 to-purple-800/10 border-purple-600/30 text-purple-300",
  pink: "from-pink-900/30 to-pink-800/10 border-pink-600/30 text-pink-300",
  cyan: "from-cyan-900/30 to-cyan-800/10 border-cyan-600/30 text-cyan-300",
  amber: "from-amber-900/30 to-amber-800/10 border-amber-600/30 text-amber-300",
  teal: "from-teal-900/30 to-teal-800/10 border-teal-600/30 text-teal-300",
};

const subtitleColorMap = {
  blue: "text-blue-400",
  green: "text-green-400",
  red: "text-red-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
  cyan: "text-cyan-400",
  amber: "text-amber-400",
  teal: "text-teal-400",
};

export default function StatsCard({ label, value, subtitle, icon, color }: StatsCardProps) {
  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} rounded-xl p-4 border`}>
      <div className="flex items-center justify-between mb-2">
        <p className={`text-sm font-medium ${colorMap[color].split(" ").pop()}`}>{label}</p>
        <div className="opacity-60">{icon}</div>
      </div>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      {subtitle && <p className={`text-xs mt-1.5 ${subtitleColorMap[color]}`}>{subtitle}</p>}
    </div>
  );
}
