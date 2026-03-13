import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/lib/utils";

import { Check, X } from "lucide-react"; // Если используешь Lucide (стандарт для shadcn)

interface AllowUserOauthBadgeProps {
  allowed: boolean;
}

export default function AllowUserOauthBadge({ allowed }: AllowUserOauthBadgeProps) {
  const config = allowed
    ? {
        label: "Дозволено",
        icon: <Check className="mr-1 h-3 w-3" />,
        styles: "bg-emerald-50/50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30",
      }
    : {
        label: "Заборонено",
        icon: <X className="mr-1 h-3 w-3" />,
        styles: "bg-rose-50/50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30",
      };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium px-2 py-0.5 rounded-md transition-all", 
        config.styles
      )}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
}