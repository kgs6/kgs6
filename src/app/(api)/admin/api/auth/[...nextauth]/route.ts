import { handlers } from '@/app/auth';
import { NextRequest, NextResponse } from 'next/server';
import { cookie } from '@/shared/lib/cookie';
import { prisma } from '@/shared/lib/prisma';
import { signAccess, signRefresh } from '@/shared/lib/jwt';
import { sha256 } from '@/shared/lib/tokenHash';
import { decode } from 'next-auth/jwt';

if (process.env.AUTH_URL && process.env.AUTH_URL.includes(',')) {
  process.env.AUTH_URL = process.env.AUTH_URL.split(',')[0].trim();
}
if (process.env.NEXTAUTH_URL && process.env.NEXTAUTH_URL.includes(',')) {
  process.env.NEXTAUTH_URL = process.env.NEXTAUTH_URL.split(',')[0].trim();
}

const originalGet = handlers.GET;

export const GET = async (req: NextRequest) => {
  const response = await originalGet(req);

  if (req.nextUrl.pathname.includes('/callback/google')) {
    const allCookies = response.headers.getSetCookie();
    const sessionCookie = allCookies.find((c) =>
      c.includes('authjs.session-token'),
    );

    const tokenValue = sessionCookie?.split(';')[0].split('=')[1];

    if (tokenValue) {
      const decoded = await decode({
        token: tokenValue,
        secret: process.env.AUTH_SECRET!,
        salt: 'authjs.session-token',
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

          const redirectResponse = NextResponse.json(
            { error: 'Ok' },
            { status: 200 },
          );

          console.log('✅ Delete NextAuth tokens');
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
