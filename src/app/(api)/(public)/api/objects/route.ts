import { prisma } from "@/shared/lib/prisma";



export async function GET() {
  try {
    const objects = await prisma.object.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        name: true,
        description: true,
        image: {
          select: {
            url: true,
          },
        }
      }
    });

    if (!objects) {
      return  Response.json('Об\'єкти не знайдені', { status: 404 });
    } 

    return Response.json(objects);
  } catch {
    return Response.json('Помилка сервера', { status: 500 });
  }
}