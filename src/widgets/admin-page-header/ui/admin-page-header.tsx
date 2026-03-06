'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminPageHeaderProps {
  title: string;
  backUrl: string;
  actionButton?: ReactNode;
  forwardAction?: {
    url: string;
    label: string;
  };
}

export default function AdminPageHeader({
  title,
  backUrl,
  actionButton,
  forwardAction,
}: AdminPageHeaderProps) {
  return (
    <header className={'flex items-center justify-between'}>
      <Link href={backUrl}>
        <Button variant={'ghost'}>
          <ArrowLeft />
          Назад
        </Button>
      </Link>

      <h1 className={'hidden md:block text-2xl font-bold'}>{title}</h1>

      {actionButton && actionButton}

      {forwardAction && (
        <Link href={forwardAction.url}>
          <Button variant={'default'}>
            <Plus />
            {forwardAction?.label}
          </Button>
        </Link>
      )}
    </header>
  );
}
