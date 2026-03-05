import React from 'react';
import {Badge} from "@/components/ui/badge";

interface ActivityStatusProps {
  isActive: boolean;
}

const ActivityStatus = ({isActive}: ActivityStatusProps) => {
  return (
    <div>
      {isActive ? (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">Відображається</Badge>
      ) : (
        <Badge variant="secondary">Приховано</Badge>
      )}
    </div>
  );
};

export default ActivityStatus;