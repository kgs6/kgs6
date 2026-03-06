import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AdminEndPageHeaderProps {
  title: string;
  backUrl: string;
}

export default function AdminEndPageHeader({
  title,
  backUrl,
}: AdminEndPageHeaderProps) {

  return (
    <header
      className={
        'flex flex-col gap-2 md:flex-row items-start md:items-center justify-between'
      }
    >
      <h1 className={'block md:hidden text-center w-full text-2xl font-bold'}>
        {title}
      </h1>

      <div>
        <Link href={backUrl}>
          <Button variant={'ghost'} className={'w-auto'}>
            <ArrowLeft />
            Назад
          </Button>
        </Link>
      </div>

      <h1 className={'hidden md:block text-2xl font-bold'}>{title}</h1>

      <div className={'hidden md:block min-w-36'} />
    </header>
  );
}
