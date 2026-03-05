import React from 'react';
import {Eye, EyeOff, Trash, Trash2} from "lucide-react";
import {Button} from "@/components/ui/button";

interface VisibilityButtonProps {
  isActive: boolean;
  handleToggleActive: () => void;
  isIconOnly?: boolean;
}

const VisibilityButton = ({isActive, handleToggleActive, isIconOnly}: VisibilityButtonProps) => {
  const isMobile = window.innerWidth < 768;

  const buttonSize = isMobile ? "icon-lg" : "icon";

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={handleToggleActive}
      size={isIconOnly ? buttonSize  : "default"}
    >
      {isActive ? (
        <div>
          {isIconOnly ? <EyeOff className="h-4 w-4"/> : (
            <>
              <EyeOff className="h-4 w-4"/>
              Приховати
            </>
          )}
        </div>
      ) : (
        <div>
          {isIconOnly ? <Eye className="h-4 w-4"/> : (
            <>
              <Eye className="h-4 w-4"/>
              Активувати
            </>
          )}
        </div>
      )}
    </Button>
  );
};

export default VisibilityButton;