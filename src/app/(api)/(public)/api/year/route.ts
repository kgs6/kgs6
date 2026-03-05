import {prisma} from "@/shared/lib/prisma";


export async function GET() {
  try {
    const years = await prisma.year.findMany({
      orderBy: { year: "desc" },
      where: {
        isActive: true
      },
    });

    if (!years || !years.length)
      return new Response(JSON.stringify({message: "Роки не знайдені"}), {status: 404});

    const responseYears = years.map(year => ({
      year: year.year,
      createdAt: year.createdAt.toISOString(),
    }));

    return new Response(JSON.stringify(responseYears));

  } catch (error: unknown) {
    console.error(error);

    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}