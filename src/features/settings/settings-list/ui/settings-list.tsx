"use client";

import { useGetSettingsQuery } from "@/entities/settings/api/settings-admin-api";
import { BrandingSettings, BrandingSettingsSkeleton } from "../../branding-settings";
import { ContactSettings } from "../../contact-settings";
import ContactSettingsSkeleton from "../../contact-settings/ui/contact-settings-skeleton";
import { AboutSettings } from "../../about-settings";
import { RouteSettings } from "../../route-settings";


export default function SettingsList() {
  const { data: settings, isLoading } = useGetSettingsQuery();

  return (
    <div>
       {isLoading ? (
        <div>
          <BrandingSettingsSkeleton />
          <ContactSettingsSkeleton />
        </div>
      ) : settings ? (
        <div>
          <BrandingSettings settings={settings} />
          <ContactSettings settings={settings} />
          <AboutSettings settings={settings} />
          <RouteSettings settings={settings} />
          <div className="h-64"/>
        </div>
      ) : (
        <p>Настройки не найдены</p>
      )} 

    </div>
  )
}