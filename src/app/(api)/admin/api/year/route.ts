import {prisma} from "@/shared/lib/prisma";
import {SectionType} from "@/generated/prisma/enums";
import {isAuthenticated} from "@/shared/lib/auth";

export async function GET() {
  try {
    const years = await prisma.year.findMany({
      orderBy: { year: "asc" },
      select: {
        id: true,
        year: true,
        isActive: true,
        _count: {
          select: {
            sections: true,
          },
        },
      }
    });

    return Response.json(years);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if(!(await isAuthenticated()))
    return Response.json({ error: "Помилка автентифікації" }, { status: 401 });

  const { year } = await req.json();

  if (!year || typeof year !== "number") {
    return Response.json({ error: "Невірний рік" }, { status: 400 });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existing = await tx.year.findUnique({
        where: { year },
      });

      if (existing)
        throw new Error("Рік вже існує");

      const newYear = await tx.year.create({
        data: {
          year,
        },
      });

      await tx.section.createMany({
        data: [
          {
            yearId: newYear.id,
            type: SectionType.SPECIAL,
            title: "Особлива інформація",
            name: `section-${year}-1`,
            orderNo: 1,
          },
          {
            yearId: newYear.id,
            type: SectionType.REGULAR,
            title: "Регулярна інформація",
            name: `section-${year}-2`,
            orderNo: 2,
          },
          {
            yearId: newYear.id,
            type: SectionType.OTHER,
            title: "Інша інформація",
            name: `section-${year}-3`,
            orderNo: 3,
          },
        ],
      });

      return Response.json({status: 201});
    });

    return Response.json(result);
  } catch (error: Error | unknown) {
    if (error instanceof Error && error.message === "Рік вже існує" ) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}