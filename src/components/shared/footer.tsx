"use client";

import { useGetPublicSettingsQuery } from "@/entities/settings/api/settings-public-api";
import { Skeleton } from "../ui/skeleton";

function Footer() {
    const { data: settings, isLoading } = useGetPublicSettingsQuery();

    return (
        <footer className="text-center text-sm text-gray-500 py-6">
            {isLoading ? <Skeleton className="w-64 h-4 mx-auto" /> : 
            `Офіційний інтернет-сайт ${settings ? settings.companyName : ""}`
            }
        </footer>
    );
}

export default Footer;