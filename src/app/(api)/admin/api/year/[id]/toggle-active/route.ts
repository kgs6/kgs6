import {isAuthenticated} from "@/shared/lib/auth";
import isUUID from "@/shared/lib/isUUID";
import {prisma} from "@/shared/lib/prisma";


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated()))
    return  Response.json({message: "Помилка автентифікації"}, {status: 401});

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ error: "Невірний ID" }, { status: 400 });

  try {
    const currentState = await prisma.year.findUnique({
      where: { id },
      select: { isActive: true }
    })

    if (!currentState) {
      return Response.json({ error: "Рік не знайдено" }, { status: 404 });
    }

    await prisma.year.update({
      where: {id},
      data: {
        isActive: !currentState.isActive
      }
    })

    return Response.json({ success: true });
  } catch (error) {
    console.error(error)
    return Response.json({error: "Помилка сервера"}, { status: 500 })
  }
}