import { prisma } from "@/shared/lib/prisma";
import { cookies } from "next/headers";
import { verifyAccess } from "@/shared/lib/jwt"; // сделай/используй свою verifyAccess

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { sub: string; email?: string; role?: string };

  try {
    payload = verifyAccess(accessToken) as any;
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = payload.sub;
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json(user);
}
