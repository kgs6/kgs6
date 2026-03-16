import bcrypt from 'bcrypt';
import { prisma } from '@/shared/lib/prisma';
import { signAccess, signRefresh } from '@/shared/lib/jwt';
import { sha256 } from '@/shared/lib/tokenHash';
import { cookie } from '@/shared/lib/cookie';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: 'Перевірте свої облікові дані' },
      { status: 404 },
    );
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok)
    return Response.json(
      { error: 'Перевірте свої облікові дані' },
      { status: 404 },
    );

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

  const res = Response.json({
    message: 'ok',
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });

  res.headers.append('Set-Cookie', cookie('accessToken', accessToken, 7 * 24 * 60 * 60));
  res.headers.append(
    'Set-Cookie',
    cookie('refreshToken', refreshToken, 7 * 24 * 60 * 60),
  );

  return res;
}
