"use client";

import Footer from "@/components/shared/footer";
import { Separator } from "@/components/ui/separator";
import { useGetPublicSettingsQuery } from "@/entities/settings/api/settings-public-api";
import Link from "next/link";


export default function ContactsFeed() {
  const { data: settings } = useGetPublicSettingsQuery();

  return (
    <div className="min-h-screen flex flex-col">
      <header className={"mt-4"}>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 wrap-break-words">
          Контакти
        </h1>
        <p className="sm:text-base text-muted-foreground">
          Контакти {settings?.companyName ? `${settings.companyName}` : "компанії"}
        </p>
        <Separator className="mt-6 mb-6" />
      </header>

      {settings && (
        <div>
          {settings.address && (
            <p className={"mb-2"}>
              <strong>Адреса:</strong> {settings.address}
            </p>
          )}

          {settings.phone && (
            <p className={"mb-2"}>
              <strong>Телефон: </strong>
              <Link href={`tel:${settings.phone.replace(/\D/g, '')}`}>
                {settings.phone}
              </Link>
            </p>
          )}

          {settings.email && (
            <p className={"mb-2"}>
              <strong>Email: </strong>
              <Link href={`mailto:${settings.email}`}>
                {settings.email}
              </Link>
            </p>
          )}

          {settings.mapsUrl && (
          <div className="w-full h-128 bg-gray-200 rounded-lg mb-4 mt-12">
            <iframe
              src={settings.mapsUrl}
              loading="lazy" className="w-full h-full rounded-lg border-0"
            >
            </iframe>
          </div>
          )}
        </div>
      )}

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}