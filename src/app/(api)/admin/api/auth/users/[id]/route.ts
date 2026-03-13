import { isAuthenticated } from "@/shared/lib/auth";
import isUUID from "@/shared/lib/isUUID";
import { isAdmin } from "@/shared/lib/jwt";
import { prisma } from "@/shared/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated))
    return Response.json({message: "Помилка автентифікації"}, {status: 401});

  if (!(await isAdmin))
    return Response.json({message: "Помилка автентифікації"}, {status: 403});

  const { id } = await params;

  if (!id || !isUUID(id))
      return Response.json({ error: "Невірний ID" }, { status: 400 });

  try {
    await prisma.user.delete({
      where: {id: id}
    })

    return Response.json({message: "Успішно видалено користувача"})
  } catch {
    return Response.json({error: "Помилка сервера"}, {status: 500})
  }
}