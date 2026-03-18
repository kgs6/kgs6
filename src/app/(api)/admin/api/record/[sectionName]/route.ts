import { isAuthenticated } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sectionName: string }> }
) {
  if (!await isAuthenticated())
    return Response.json({ message: "Помилка автентифікації" }, { status: 401 });

  const { sectionName } = await params;

  if (!sectionName)
    return Response.json({ error: "Невірна секція" }, { status: 400 });

  try {
    const records = await prisma.entry.findMany({
      where: { section: { name: sectionName } },
      select: {
        id: true,
        title: true,
        orderNo: true,
        isActive: true,
        publishedAt: true,
      },
      orderBy: { orderNo: "asc" },
    });

    return Response.json(records);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  } 
}
