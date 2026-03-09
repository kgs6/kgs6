"use client";

import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VisibilityButtonProps {
  isActive: boolean;
  handleToggleActive: () => void;
  isIconOnly?: boolean;
  isLoading: boolean;
  className?: string;
}

const VisibilityButton = ({
  isActive,
  handleToggleActive,
  isIconOnly,
  isLoading,
  className,
}: VisibilityButtonProps) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const buttonSize = isMobile ? "icon-lg" : "icon";

  return (
    <Button
      variant="outline"
      className={`${className || ""} gap-2 flex items-center justify-center`}
      onClick={handleToggleActive}
      size={isIconOnly ? buttonSize : "default"}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : isActive ? (
        <>
          {isIconOnly ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <>
              <EyeOff className="h-4 w-4" />
              <span>Приховати</span>
            </>
          )}
        </>
      ) : (
        <>
          {isIconOnly ? (
            <Eye className="h-4 w-4" />
          ) : (
            <>
              <Eye className="h-4 w-4" />
              <span>Активувати</span>
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default VisibilityButton;