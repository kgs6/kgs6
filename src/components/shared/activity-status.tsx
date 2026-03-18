import React from 'react';
import {Badge} from "@/components/ui/badge";
import { useIsMobile } from '@/hooks/use-mobile';
import { Check, X } from 'lucide-react';

interface ActivityStatusProps {
  isActive: boolean;
}

const ActivityStatus = ({isActive}: ActivityStatusProps) => {
  const isMobile = useIsMobile();

  return (
    <div>
      {isActive ? (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          {isMobile ? <Check /> : 'Відображається'}
        </Badge>
      ) : (
        <Badge variant="secondary">{isMobile ? <X /> : 'Приховано'}</Badge>
      )}
    </div>
  );
};

export default ActivityStatus;