import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/lib/utils";

interface UserRoleBadgeProps {
  role: string;
}

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  const currentRole = role.toUpperCase();

  const roleConfig: Record<string, string> = {
    ADMIN: "bg-indigo-50/50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/30",
    USER: "bg-emerald-50/50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30",
  };

  const selectedStyle = roleConfig[currentRole] || "bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";

  return (
    <Badge 
      variant="outline" 
      className={cn("font-medium px-2.5 py-0.5 rounded-full transition-colors", selectedStyle)}
    >
      {currentRole}
    </Badge>
  );
}