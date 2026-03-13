'use client';

import { UserAdminDTO } from '@/entities/user/model/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { Pencil } from 'lucide-react';

interface EditUserProps {
  user: UserAdminDTO;
}

export default function EditUser({ user }: EditUserProps) {
  const isMobile = useIsMobile();


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={isMobile ? "icon-lg" : "icon"}>
          <Pencil/>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
