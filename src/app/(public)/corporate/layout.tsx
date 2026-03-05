import type {Metadata} from "next";

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
      {children}
    </main>
  );
}
