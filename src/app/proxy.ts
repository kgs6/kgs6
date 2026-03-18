import { NextRequest, NextResponse } from 'next/server'
 
const allowedOrigins = [
  'http://localhost:3000', 
  'http://10.64.54.36:3000'
]
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}
 
export function proxy(request: NextRequest) {
  const { nextUrl, method, headers } = request;
  const origin = headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

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
  matcher: ['/api/:path*', '/dashboard/:path*'],
}