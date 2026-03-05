import {prisma} from "@/shared/lib/prisma";
import isUUID from "@/shared/lib/isUUID";


export async function GET(request: Request, { params }: { params: Promise<{ yearNumber: string }> }) {
  const { yearNumber } = await params;

  if (!yearNumber) {
    return Response.json({ error: "Невірний рік" }, { status: 400 });
  }

  try {
    const yearData = await prisma.year.findFirst({
      where: {
        year: parseInt(yearNumber),
        isActive: true
      },
      select: {
        year: true,
        sections: {
          where: { isActive: true },
          orderBy: { orderNo: "asc" },
          select: {
            title: true,
            orderNo: true,
            entries: {
              where: { isActive: true },
              orderBy: { orderNo: "asc" },
              select: {
                title: true,
                description: true,
                publishedAt: true,
                attachments: {
                  where: { isActive: true },
                  select: {
                    url: true,
                    fileName: true,
                    fileSize: true,
                    orderNo: true
                  }
                }
              }
            }
          }
        }
      }
    });
    if (!yearData)
      return new Response("Рік не знайдений", {status: 404});

    return new Response(JSON.stringify(yearData));
  } catch {
    return new Response("Помилка при отриманні даних про рік", {status: 500});
  }
}
  