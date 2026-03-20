import { LoginBlock } from '@/widgets/login-block';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={<LoginLoadingSkeleton />}>
          <LoginBlock />
        </Suspense>
      </div>
    </div>
  );
}

function LoginLoadingSkeleton() {
  return (
    <div className="w-full h-100 animate-pulse bg-card rounded-lg border" />
  );
}