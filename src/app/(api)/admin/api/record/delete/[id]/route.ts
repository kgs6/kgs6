import { isAuthenticated } from "@/shared/lib/auth";
import isUUID from "@/shared/lib/isUUID";
import { prisma } from "@/shared/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Помилка автентифікації" }, { status: 401 });
  }

  const { id } = await params;

  if (!id || !isUUID(id)) {
    return Response.json({ error: "Невірний ID" }, { status: 400 });
  }

  try {
    const record = await prisma.entry.findUnique({
      where: { id },
    });

    if (!record) {
      return Response.json({ error: "Запис не знайдено" }, { status: 404 });
    }

    await prisma.entry.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error: unknown) {
    console.error(error);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}