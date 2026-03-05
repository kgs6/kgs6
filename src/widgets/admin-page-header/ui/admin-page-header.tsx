"use client"

import React, {ReactNode} from 'react';
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowLeft, Plus} from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  backUrl: string;
  actionButton?: ReactNode;
  forwardAction?: {
    url: string;
    label: string;
  };
}

export default function AdminPageHeader({title, backUrl, actionButton, forwardAction}: AdminPageHeaderProps) {
  const router = useRouter();

  return (
    <header className={"flex items-center justify-between"}>
      <Button variant={"ghost"} onClick={() => {
        router.push(backUrl)
      }}>
        <ArrowLeft/>
        Назад
      </Button>

      <h1 className={"hidden md:block text-2xl font-bold"}>
        {title}
      </h1>

      {actionButton && actionButton}

      {forwardAction && (
        <Button variant={"default"} onClick={() => {
          router.push(forwardAction?.url)
        }}>
          <Plus />
          {forwardAction?.label}
        </Button>
      )}
    </header>
  )
}