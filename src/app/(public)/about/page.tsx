"use client"

import Footer from "@/components/shared/footer";
import { useGetPublicSettingsQuery } from "@/entities/settings/api/settings-public-api";

function About() {
    const { data: settings } = useGetPublicSettingsQuery();

    return (
        <div className="flex min-h-screen flex-col">
            <main className="px-10 py-4 w-full lg:max-w-7xl mx-auto">
                <div className="w-full flex flex-col gap-1 text-xl whitespace-pre-wrap">
                    {settings?.description}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default About;