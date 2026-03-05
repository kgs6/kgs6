import type {Metadata} from "next";
import Header from "@/components/shared/header/header";

export const metadata: Metadata = {
  title: "ПрАТ \"Трест Київміськбуд-6\"",
  description: "Офіційний інтернет-сайт Приватного акціонерного товариства \"ТРЕСТ КИЇВМІСЬКБУД-6\"",
  icons: {
    icon: "/kgs-logo.png",
  }
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`antialiased`}
    >
      <Header/>
      {children}
    </main>
  );
}
