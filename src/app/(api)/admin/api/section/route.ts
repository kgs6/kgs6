import { SectionType } from "@/generated/prisma/enums";
import { isAuthenticated } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export async function POST(request: Request) {
  if (!(await isAuthenticated()))
    return new Response("Помилка авторизації", { status: 401 });

  try {
    const body = await request.json();

    const yearValue = body.year;
    const titleValue = body.title;

    if (!yearValue || !titleValue)
      return Response.json({ error: "Невірні дані" }, { status: 400 });

    const yearNumber = parseInt(yearValue);

    if (isNaN(yearNumber))
      return Response.json({ error: "Невірний формат року" }, { status: 400 });

    const year = await prisma.year.findUnique({
      where: {
        year: yearNumber,
      },
      include: {
        sections: {
          orderBy: {
            orderNo: "desc",
          },
          take: 1,
        },
      },
    });

    if (!year)
      return Response.json({ error: "Рік не знайдено" }, { status: 404 });

    const nextOrderNo =
      year.sections.length > 0 ? year.sections[0].orderNo + 1 : 1;

    const section = await prisma.section.create({
      data: {
        yearId: year.id,
        title: titleValue,
        name: `section-${year.year}-${nextOrderNo}`,
        type: SectionType.OTHER,
        orderNo: nextOrderNo,
      },
    });

    return Response.json(section);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
