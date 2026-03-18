import { isAdmin, isAuthenticated } from "@/shared/lib/auth";
import isUUID from "@/shared/lib/isUUID";
import { prisma } from "@/shared/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated()))
    return Response.json({message: "Помилка автентифікації"}, {status: 401});

  if (!(await isAdmin()))
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

export async function PATCH(
  req: Request,
  { params }: {params: Promise<{id: string}>}
) {
  if (!(await isAuthenticated()))
    return Response.json({message: "Помилка автентифікації"}, {status: 401});

  if (!(await isAdmin()))
    return Response.json({message: "Помилка автентифікації"}, {status: 403});

  const { id } = await params;

  if (!id || !isUUID(id))
      return Response.json({ error: "Невірний ID" }, { status: 400 });

  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: {id: id},
      data: {
        name: body.name,
        email: body.email,
        role: body.role,
        oauthOnly: !body.allowPassword && body.allowOauth,
      }
    })

    return Response.json(updatedUser)
  } catch (error) {
    console.error(error);
    return Response.json({error: "Помилка сервера"}, {status: 500})
  }
}