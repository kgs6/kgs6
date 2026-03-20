import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { prisma } from '@/shared/lib/prisma';
import { signAccess, signRefresh } from '@/shared/lib/jwt';
import { sha256 } from '@/shared/lib/tokenHash';

export const { handlers, auth, signIn, signOut } = NextAuth({
  basePath: '/admin/api/auth',
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("Попытка входа через Google:", user.email);
      if (!user.email) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        console.log('Отказ: пользователя нет в базе данных.');
        return false;
      }

      console.log("Успех: пользователь найден, пускаем.");
      return true;
    },

    async jwt({ token, user }) {
      if (user && user.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          const accessToken = signAccess({
            sub: dbUser.id,
            email: dbUser.email,
            role: dbUser.role,
          });

          const tid = crypto.randomUUID();
          const refreshToken = signRefresh({ sub: dbUser.id, tid });
          const tokenHash = sha256(refreshToken);
          const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

          await prisma.refreshToken.create({
            data: {
              userId: dbUser.id,
              tokenHash,
              expiresAt,
            },
          });

          token.accessToken = accessToken;
          token.refreshToken = refreshToken;
          token.sub = dbUser.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        if (token.accessToken && token.refreshToken) {
          session.accessToken = token.accessToken as string;
          session.refreshToken = token.refreshToken as string;
        }

        if (session.user && token.sub) {
          session.user.id = token.sub;
        }
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/login',
    error: "/login"
  },
});
