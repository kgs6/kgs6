'use client';

import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { LoginForm } from '@/features/user/login-form';
import { PAGES } from '@/shared/config/pages.config';
import Link from 'next/link';
import { useGetPublicSettingsQuery } from '@/entities/settings/api/settings-public-api';
import { GoogleSignIn } from '@/components/shared/google-sign-in';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function LoginBlock() {
  const { data: settings } = useGetPublicSettingsQuery();
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  useEffect(() => {
    if (error) {
      const errorMessages: Record<string, string> = {
        AccessDenied: "Помилка входу",
        Configuration: "Помилка конфігурації сервера авторизації.",
        Default: "Сталося помилка при вході. Спробуйье пізнішє.",
      }

      const message = errorMessages[error] || errorMessages.Default

      toast.error(message || "Помилка авторизації")
    }
  }, [error])

  return (
    <div className={cn('w-full flex flex-col gap-6')}>
      <Card className="w-full md:max-w-sm mx-auto">
        <CardHeader className="text-center flex flex-col items-center gap-2">
          {settings && settings.imageUrl ? (
            <Link href={PAGES.ABOUT}>
              <Image
                src={`${settings.imageUrl.toString()}`}
                alt="Login Image"
                width={70}
                height={70}
              />
            </Link>
          ) : (
            <div className="h-13.25" />
          )}

          <CardTitle>Увійти до свого облікового запису</CardTitle>
          <CardDescription>
            Введіть свою електронну пошту та пароль нижче, щоб увійти до свого
            облікового запису
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
          <Separator className='w-full mx-y'/>
          <GoogleSignIn />
        </CardContent>
      </Card>
    </div>
  );
}
