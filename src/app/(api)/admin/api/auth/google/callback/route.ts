// /app/api/auth/google/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/shared/lib/prisma';
import { signAccess, signRefresh } from '@/shared/lib/jwt';
import { sha256 } from '@/shared/lib/tokenHash';
import { cookie } from '@/shared/lib/cookie';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code!,
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();

    console.log(tokens);

    const userRes = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );

    const userGoogle = await userRes.json();

    const email = await userGoogle.email;

    console.log(userGoogle);

    if (!email)
      return NextResponse.json({ error: 'Помилка сервера' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const resError = NextResponse.redirect(new URL('/login?error=AccessDenied', req.url));

      return resError
    }

    const accessToken = signAccess({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const tid = crypto.randomUUID();
    const refreshToken = signRefresh({ sub: user.id, tid });

    const tokenHash = sha256(refreshToken);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.refreshToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const res = NextResponse.redirect(new URL('/dashboard', req.url));

    res.headers.append(
      'Set-Cookie',
      cookie('accessToken', accessToken, 7 * 24 * 60 * 60),
    );
    res.headers.append(
      'Set-Cookie',
      cookie('refreshToken', refreshToken, 7 * 24 * 60 * 60),
    );

    return res;
  } catch {
    return NextResponse.json({ error: 'Невідома помилка' }, { status: 500 });
  }
}
