import {prisma} from "@/shared/lib/prisma";
import {isAuthenticated} from "@/shared/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  if (!(await isAuthenticated()))
    return  Response.json({message: "Помилка автентифікації"}, {status: 401});

  const { year } = await params;

  if (!year)
    return Response.json({ error: "Невірний рік" }, { status: 400 });

  try {
    const yearWithSections = await prisma.year.findUnique({
      where: { year: parseInt(year) },
      select: {
        sections: {
          orderBy: { orderNo: "asc" },
          select: {
            id: true,
            yearId: true,
            name: true,
            title: true,
            orderNo: true,
            isActive: true,
            _count: { select: { entries: true } }
          }
        }
      }
    });

    if (!yearWithSections)
      return Response.json({ error: "Рік не знайдено" }, { status: 404 });

    return Response.json(yearWithSections.sections);
  } catch (error) {
    console.error(error)
    return Response.json({error: "Помилка сервера"}, { status: 500 })
  }
}