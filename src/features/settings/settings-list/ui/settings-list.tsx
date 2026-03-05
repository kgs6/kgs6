"use client";

import { useGetSettingsQuery } from "@/entities/settings/api/settings-admin-api";
import { BrandingSettings, BrandingSettingsSkeleton } from "../../branding-settings";
import { ContactSettings } from "../../contact-settings";
import ContactSettingsSkeleton from "../../contact-settings/ui/contact-settings-skeleton";
import { Separator } from "@/components/ui/separator";


export default function SettingsList() {
  const { data: settings, isLoading } = useGetSettingsQuery();

  return (
    <div className="p-4">
       {isLoading ? (
        <div>
          <BrandingSettingsSkeleton />
          <ContactSettingsSkeleton />
        </div>
      ) : settings ? (
        <div>
          <BrandingSettings settings={settings} />
          <Separator  />
          <ContactSettings settings={settings}/>
        </div>
      ) : (
        <p>Настройки не найдены</p>
      )} 

    </div>
  )
}