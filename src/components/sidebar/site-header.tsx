"use client"

import { SidebarIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { ModeToggle } from "../theme-toggle"

const breadcrumbMap: Record<string, string> = {
  dashboard: "Головна",
  objects: "Обʼєкти",
  news: "Новини",
  
  year: "Інформація для акціонерів та стейкхолдерів",

  section: "Розділи",
  record: "Записи",

  settings: "Налаштування",
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SECTION_PATTERN = /^section-\d{4}-\d+$/i;

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean);

    const visibleSegments = segments
    .map((segment, index) => ({
      label: segment,
      href: "/" + segments.slice(0, index + 1).join("/"),
      isTechnical: 
        UUID_REGEX.test(segment) || 
        SECTION_PATTERN.test(segment) || 
        /^\d{4}$/.test(segment) // Скрывает просто цифры года (2025)
    }))
    .filter(item => !item.isTechnical);

  return (
    <header className=" p-2 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {visibleSegments.map((segment, index) => {
              const isLast = index === visibleSegments.length - 1;
              const label = breadcrumbMap[segment.label] || 
                            segment.label.charAt(0).toUpperCase() + segment.label.slice(1);
              const href = segment.href;

              return (
                <div key={href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>
                        {label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator className={"ml-2"} />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="block sm:hidden text-lg font-bold truncate">
          {segments[1] === "info" && segments[2]
            ? `${segments[2]}: ${breadcrumbMap["info"]}`
            : breadcrumbMap[segments[1]] || segments[1]}
        </h1>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
