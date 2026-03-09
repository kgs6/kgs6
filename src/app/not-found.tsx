"use client";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NotFoundImage from '@/../public/not-found-img.webp';


export default function NotFound() {
  const router = useRouter();

  return (
    <div className="mx-4 flex flex-col items-center justify-center min-h-screen bg-background">
      <div>
        <Image src={NotFoundImage} alt="Not Found" width={300} height={300}/>  
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-2">Не знайдено</h2>
      <p className="text-foreground mb-8 text-center max-w-md">
        Ця сторінка не існує або була видалена. Будь ласка, перевірте URL або
        поверніться на головну сторінку.
      </p>
      <div className="flex flex-col gap-4 md:flex-row md:gap-10">
        <Button variant="ghost" className="ml-4" onClick={()=> router.back()}>
          <ArrowLeft className="mr-2" />
          Назад
        </Button>
        <Link href="/about">
          <Button>
            <Home className="mr-2" />
            На головну
          </Button>
        </Link>
      </div>
    </div>
  );
}
