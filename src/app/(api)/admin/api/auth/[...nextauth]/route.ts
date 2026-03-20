// src/app/admin/api/auth/[...nextauth]/route.ts
import { handlers } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';
import { cookie } from '@/shared/lib/cookie';
import { prisma } from '@/shared/lib/prisma';
import { signAccess, signRefresh } from '@/shared/lib/jwt';
import { sha256 } from '@/shared/lib/tokenHash';
import { decode } from 'next-auth/jwt'; // Потребуется для расшифровки токена напрямую

const originalGet = handlers.GET;

export const GET = async (req: NextRequest) => {
  const response = await originalGet(req);

  if (req.nextUrl.pathname.includes('/callback/google')) {
    // 1. Пытаемся достать сессионную куку прямо из ответа, который сгенерил Auth.js
    const allCookies = response.headers.getSetCookie();
    const sessionCookie = allCookies.find((c) =>
      c.includes('authjs.session-token'),
    );

    // Вырезаем само значение токена
    const tokenValue = sessionCookie?.split(';')[0].split('=')[1];

    if (tokenValue) {
      // 2. Расшифровываем JWT напрямую, не дожидаясь записи в браузер
      const decoded = await decode({
        token: tokenValue,
        secret: process.env.AUTH_SECRET!,
        salt: 'authjs.session-token', // Стандартная соль Auth.js
      });

      if (decoded?.email) {
        const user = await prisma.user.findUnique({
          where: { email: decoded.email, oauthOnly: true },
        });

        if (user) {
          const accessToken = signAccess({
            sub: user.id,
            email: user.email,
            role: user.role,
          });
          const tid = crypto.randomUUID();
          const refreshToken = signRefresh({ sub: user.id, tid });
          const tokenHash = sha256(refreshToken);
          await prisma.refreshToken.create({
            data: {
              userId: user.id,
              tokenHash,
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });

          // 3. Создаем финальный редирект
          const redirectResponse = NextResponse.redirect(
            new URL('/dashboard', req.url),
          );

          console.log('✅ Delete NextAuth tokens');
          // 4. Принудительно убиваем куки Auth.js, чтобы они не висели в браузере
          redirectResponse.cookies.delete('authjs.session-token');
          redirectResponse.cookies.delete('authjs.callback-url');
          redirectResponse.cookies.delete('authjs.csrf-token');
          redirectResponse.cookies.delete('authjs.pkce.code_verifier');

          try {
            redirectResponse.headers.append(
              'Set-Cookie',
              cookie('accessToken', accessToken, 7 * 24 * 60 * 60),
            );
            redirectResponse.headers.append(
              'Set-Cookie',
              cookie('refreshToken', refreshToken, 7 * 24 * 60 * 60),
            );
            console.log('✅ Set api tokens');
          } catch {
            console.log('🛑 No api tokens');
          }

          return redirectResponse;
        } else {
          const redirectResponse = NextResponse.json(
            { error: 'Помилка входу' },
            { status: 400 },
          );

          redirectResponse.cookies.delete('authjs.session-token');
          redirectResponse.cookies.delete('authjs.callback-url');
          redirectResponse.cookies.delete('authjs.csrf-token');
          redirectResponse.cookies.delete('authjs.pkce.code_verifier');

          return response;
        }
      }
    }
  }

  const redirectResponse = NextResponse.json(
    { error: 'Помилка входу' },
    { status: 400 },
  );

  redirectResponse.cookies.delete('authjs.session-token');
  redirectResponse.cookies.delete('authjs.callback-url');
  redirectResponse.cookies.delete('authjs.csrf-token');
  redirectResponse.cookies.delete('authjs.pkce.code_verifier');

  return response;
};

export const POST = handlers.POST;
