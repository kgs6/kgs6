import {isAuthenticated} from "@/shared/lib/auth";
import {prisma} from "@/shared/lib/prisma";

export async function GET() {
  if (await !isAuthenticated())
    return Response.json({error: "Помилка автентифікації"}, {status: 401});

  try {
    const news = await prisma.news.findMany({
      orderBy: {
        publishedAt: "desc"
      },
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        isActive: true,
      },
    });

    return Response.json(news, {status: 200});
  } catch (error) {
    console.log(error);
    return Response.json({error: "Помилка сервера"}, {status: 500});
  }
}


export async function POST(request: Request) {
  if (await !isAuthenticated())
    return Response.json({error: "Помилка автентифікації"}, {status: 401});

  try {
    const body = await request.json();

    const {title, description, publishedAt} = body;

    if (!title || !description || !publishedAt) 
      return Response.json({error: "Невірні дані"}, {status: 400});

    await prisma.news.create({
      data: {
        title,
        description,
        publishedAt: new Date(publishedAt),
      }
    })

    return Response.json({message: "Новина успішно створена"}, {status: 201});
  } catch (error) {
    console.log(error);
    return Response.json({error: "Помилка сервера"}, {status: 500});
  }
}