import { isAdmin, isAuthenticated } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  if (!(await isAuthenticated()))
    return Response.json({error: "Помилка автентифікації"}, {status: 401});

  if (!(await isAdmin())) 
    return Response.json({message: "Помилка автентифікації"}, {status: 403});

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        oauthOnly: true,
      },
    });

    if (!users) {
      return NextResponse.json({error: "Користувачі не знайдені"}, {status: 404});
    }

    return NextResponse.json(users);

  } catch (error) {
    console.log(error);
    return Response.json({error: "Помилка сервера"}, {status: 500});
  }
}