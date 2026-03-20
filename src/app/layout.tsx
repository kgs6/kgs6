import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsPublicDTO } from "@/entities/settings";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

async function getSiteSettings(): Promise<SettingsPublicDTO | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/settings`,
      {
        next: { revalidate: 86400 }, 
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const siteSettings: SettingsPublicDTO = await response.json();
    return siteSettings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}


export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const baseUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}`)
  
  return {
    title: `Офіційний інтернет-сайт ${settings?.companyName}`,
    description: `Офіційний інтернет-сайт ${settings?.companyName}`,
    metadataBase: baseUrl,
    icons: {
      icon: `${baseUrl}${settings?.imageUrl}`
    },
     alternates: {
      canonical: baseUrl.toString(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
