import { AuthBootstrap } from '@/components/shared/auth-boostrap';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { SiteHeader } from '@/components/sidebar/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { PageAnimatePresence } from '@/components/shared/page-animate-presence';
import { auth } from '../auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = await auth();
  const token = cookieStore.get('accessToken')?.value;

  if (!token && !session) {
    redirect('/login');
  }

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <AuthBootstrap />
      <SidebarProvider
        style={
          {
            '--sidebar-width': 'calc(var(--spacing) * 72)',
            '--header-height': 'calc(var(--spacing) * 12)',
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset"/>
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6">
                <PageAnimatePresence>
                    {children}
                </PageAnimatePresence>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
