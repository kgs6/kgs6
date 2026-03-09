import { NextRequest, NextResponse } from 'next/server'
 
const allowedOrigins = [
  'https://acme.com', 
  'https://my-app.org', 
  'http://localhost:3000', 
  'http://10.64.54.36:3000'
]
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true', // Важно для кук
}
 
export function proxy(request: NextRequest) {
  const { nextUrl, method, headers, cookies } = request;
  const origin = headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);
 
  // --- 1. ЗАЩИТА АДМИНКИ ---
  if (nextUrl.pathname.startsWith('/dashboard')) {
    const accessToken = cookies.get('accessToken')?.value;
    const refreshToken = cookies.get('refreshToken')?.value;

    // Если нет ни одного токена — редирект на логин
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // --- 2. ЛОГИКА CORS ДЛЯ API ---
  if (nextUrl.pathname.startsWith('/api')) {
    const isPreflight = method === 'OPTIONS';
 
    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }
 
    const response = NextResponse.next();
 
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
 
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
 
    return response;
  }

  return NextResponse.next();
}
 
export const config = {
  // Расширяем matcher, чтобы он включал и API, и Дашборд
  matcher: ['/api/:path*', '/dashboard/:path*'],
}