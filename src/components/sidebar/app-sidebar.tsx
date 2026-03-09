'use client';

import * as React from 'react';
import { BookOpen, Newspaper, Hotel, Settings } from 'lucide-react';

import { NavMain } from '@/components/sidebar/nav-main';
import { NavUser } from '@/components/sidebar/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/store/hooks';
import { ADMIN_PAGES } from '@/shared/config/pages.config';
import { useGetYearQuery } from '@/entities/year/api/year-admin-api';
import { NavSecondary } from './nav-secondary';
import Image from 'next/image';
import { useGetSettingsQuery } from '@/entities/settings/api/settings-admin-api';


const navData = {
  navMain: [
    {
      title: 'Новини',
      url: ADMIN_PAGES.NEWS,
      icon: Newspaper,
    },
    {
      title: 'Обʼєкти',
      url: ADMIN_PAGES.OBJECTS,
      icon: Hotel,
    },
    {
      title: 'Інформація для акціонерів та стейкхолдерів',
      url: ADMIN_PAGES.YEARS,
      icon: BookOpen,
      items: [] as { title: string; url: string }[],
    },
  ],
  navSecondary: [
    {
      title: 'Налаштування',
      url: ADMIN_PAGES.SETTINGS,
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector((state) => state.auth.user);

  const { data } = useGetYearQuery();
  const { data: settings } = useGetSettingsQuery();

  React.useEffect(() => {
    if (data) {
      navData.navMain[2].items = data.map((y) => ({
        title: String(y.year),
        url: `/dashboard/year/${y.year}/section`,
      }));
    }
  }, [data]);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        {settings && (
          <SidebarMenu>
            <SidebarMenuItem>
              <a
                href={ADMIN_PAGES.DASHBOARD}
                className="flex items-center gap-2"
              >
                {settings.imageUrl && (
                  <div>
                    <Image src={`${settings.imageUrl.toString()}`} alt="Logo" width={32} height={32} />
                  </div>
                )}

                <span className="text-base font-semibold truncate">
                  {settings.companyName}
                </span>
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarHeader>

      <SidebarContent className="flex flex-col justify-between">
        <NavMain items={navData.navMain} />
        <NavSecondary items={navData.navSecondary} />
      </SidebarContent>
      <SidebarFooter>{user ? <NavUser user={user} /> : null}</SidebarFooter>
    </Sidebar>
  );
}
