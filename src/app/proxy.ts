import { NextRequest, NextResponse } from 'next/server'
import { auth } from "@/app/auth" // Твой конфиг NextAuth
import { cookie } from '@/shared/lib/cookie'

const allowedOrigins = [
  'http://localhost:3000', 
  'http://10.64.54.36:3000'
]

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}

export async function proxy(request: NextRequest) {
  const { nextUrl, method, headers } = request;
  const origin = headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const session = await auth();

  const response = NextResponse.next();

  if (session?.accessToken && session?.refreshToken) {
    response.headers.append('Set-Cookie', cookie('accessToken', session.accessToken, 7 * 24 * 60 * 60));
    response.headers.append('Set-Cookie', cookie('refreshToken', session.refreshToken, 7 * 24 * 60 * 60));
  }

  if (nextUrl.pathname.startsWith('/api')) {
    const isPreflight = method === 'OPTIONS';

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/api/auth/:path*', 
    '/dashboard/:path*', 
    '/'],
}