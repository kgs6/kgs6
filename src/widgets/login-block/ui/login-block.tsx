"use client";

import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import kgsLogo from '../../../../public/kgs-logo.png';
import { LoginForm } from '@/features/user/login-form';
import { PAGES } from '@/shared/config/pages.config';
import Link from 'next/link';
import { useGetPublicSettingsQuery } from '@/entities/settings/api/settings-public-api';

export default function LoginBlock() {
  const { data: settings } = useGetPublicSettingsQuery();

  return (
    <div className={cn('w-full flex flex-col gap-6')}>
      <Card className="w-full md:max-w-sm mx-auto">
        <CardHeader className="text-center flex flex-col items-center gap-2">
          {settings ? (
            <Link href={PAGES.ABOUT}>
              <Image src={kgsLogo} alt="Login Image" width={70} height={70} />
            </Link>
          ) : (
            <div className='h-13.25'/>
          )}

          <CardTitle>Увійти до свого облікового запису</CardTitle>
          <CardDescription>
            Введіть свою електронну пошту та пароль нижче, щоб увійти до свого
            облікового запису
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
