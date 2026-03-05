import {prisma} from "@/shared/lib/prisma";
import {isAuthenticated} from "@/shared/lib/auth";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  if (!(await isAuthenticated()))
    return Response.json({ error: "Помилка автентифікації" }, { status: 401 });

  const { year } = await params;

  if (!year) {
    return Response.json({ error: "Невірний рік" }, { status: 400 });
  }

  try {
    const yearData = await prisma.year.findUnique({
      where: { year: parseInt(year) },
      include: {
        sections: {
          include: {
            entries: true
          },
          orderBy: { orderNo: "asc" },
        }
      }
    });


    if (!yearData) {
      return Response.json({ error: "Запис не знайдено" }, { status: 404 });
    }

    return Response.json(yearData);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}