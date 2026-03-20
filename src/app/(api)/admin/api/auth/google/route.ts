import { NextResponse } from "next/server";



export async function GET() {
  const GOOGLE_CLINT_ID = process.env.AUTH_GOOGLE_ID;

  if (!GOOGLE_CLINT_ID)
    return NextResponse.json({ error: 'Невідома помилка' }, { status: 500 });

  const params = new URLSearchParams({
    client_id: GOOGLE_CLINT_ID,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/admin/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  );
}