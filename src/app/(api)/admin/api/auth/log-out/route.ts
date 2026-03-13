import { prisma } from '@/shared/lib/prisma';
import { sha256 } from '@/shared/lib/tokenHash';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { verifyRefresh } from '@/shared/lib/jwt';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (refreshToken) {
      // 1. Декодируем токен, чтобы найти его в базе
      // Мы используем verifyRefresh, так как нам нужен хеш именно этого токена
      try {
        const payload = verifyRefresh(refreshToken);
        const tokenHash = sha256(refreshToken);

        // 2. Удаляем токен из базы, чтобы его нельзя было использовать повторно
        await prisma.refreshToken.deleteMany({
          where: {
            tokenHash: tokenHash,
            userId: payload.sub,
          },
        });
      } catch {

      }
    }

    // 3. Создаем ответ
    const response = NextResponse.json({ message: 'Logged out' });

    // 4. Очищаем куки (ставим Max-Age: 0)
    response.headers.append('Set-Cookie', 'accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');
    response.headers.append('Set-Cookie', 'refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0');

    return response;
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}