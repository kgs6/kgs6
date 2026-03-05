"use client";

import Image from "next/image";
import Link from "next/link";

import { Menu, User } from "lucide-react";


import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { usePathname, useRouter } from "next/navigation";
import { PAGES } from "@/shared/config/pages.config";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/shared/header/nav-link";
import { useGetPublicSettingsQuery } from "@/entities/settings/api/settings-public-api";

const menuLinks = [
    { href: PAGES.ABOUT, text: "Про компанію" },
    { href: PAGES.NEWS, text: "Новини" },
    { href: PAGES.OBJECTS, text: "Обʼєкти" },
    { href: PAGES.STOCK_INFO, text: "Інформація для акціонерів та стейкхолдерів" },
    { href: PAGES.CONTACTS, text: "Контакти" },
]

function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { data: settings } = useGetPublicSettingsQuery();

    return (
        <header className="sticky top-0 bg-background z-50 flex justify-between items-center px-10 py-4 w-full lg:max-w-7xl mx-auto">
            {settings && settings.imageUrl ? (
                <Image src={settings.imageUrl} alt="KGS Logo" width={75} height={75} />
            ) : (
                <div className="w-20 h-2" />
            )}

            <nav className="hidden items-center gap-4 lg:flex">
                {menuLinks.map((link, index) => (
                    <NavLink
                        key={index}
                        href={link.href}
                        pathname={pathname}
                        linkText={link.text}
                    />
                ))}
            </nav>
            <Link href="/login" className="hidden lg:block">
                <Button variant="outline">
                    <User />
                    Вхід
                </Button>
            </Link>
            <Drawer
                direction="top"
            >
                <DrawerTrigger className="lg:hidden outline-0">
                    <Menu />
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="flex justify-center py-2">
                            {settings && settings.imageUrl ? (
                                <Image src={settings.imageUrl} alt="KGS Logo" width={75} height={75} />
                            ) : (
                                <div className="w-20 h-2" />
                            )}
                        </DrawerTitle>
                        <DrawerDescription>
                            Офіційний інтернет-сайт<br />
                            {settings ? settings.companyName : ""}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex justify-end">
                        <nav className="text-xl text-end text- flex flex-col items-end gap-4 px-6 pb-8">
                            {menuLinks.map((link, index) => (
                                <NavLink
                                    key={index}
                                    href={link.href}
                                    pathname={pathname}
                                    linkText={link.text}
                                />
                            ))}
                        </nav>
                    </div>
                    <DrawerFooter>
                        <Button
                            variant="ghost"
                            className="w-full mb-6"
                            onClick={() => router.push("/login")}
                        >
                            <User />
                            Вхід
                        </Button>
                    </DrawerFooter>
                    <div className="flex justify-center pb-2">
                        <div className="w-28 h-1.5 bg-gray-300 rounded-full" />
                    </div>

                </DrawerContent>
            </Drawer>

        </header>
    );
}

export default Header;