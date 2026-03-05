import { isAuthenticated } from "@/shared/lib/auth";
import isUUID from "@/shared/lib/isUUID";
import { prisma } from "@/shared/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated()))
    return Response.json({ message: "Помилка автентифікації" }, { status: 401 });

  const { id } = await params;

  if (!id || !isUUID(id)) 
    return Response.json({ error: "Невірний ID" }, { status: 400 });

  try {
    const section = await prisma.section.findUnique({ where: { id } });

    if (!section)
      return Response.json({ error: "Секція не знайдена" }, { status: 404 });

    const updatedSection = await prisma.section.update({
      where: { id },
      data: { isActive: !section.isActive },
    });

    return Response.json(updatedSection);
  } catch {
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
