"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/shared/header/header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/about");
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col py-2">
      <Header/>
      <main className="px-10 py-4 w-full">
      </main>
    </div>
  );
}
