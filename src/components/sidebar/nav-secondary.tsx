"use client"

import * as React from "react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LucideIcon, User } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { ADMIN_PAGES } from "@/shared/config/pages.config"
import { useMemo } from "react"


export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const user = useAppSelector((state) => state.auth.user);

  const menuItems = useMemo(() => {
    const baseItems = [...items];

    if (user?.role === "ADMIN") {
      return [
        {
          title: "Користувачі",
          url: ADMIN_PAGES.USERS,
          icon: User,
        },
        ...baseItems,
      ];
    }
    
    return baseItems;
  }, [items, user]);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
