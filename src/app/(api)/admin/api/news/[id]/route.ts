import {isAuthenticated} from "@/shared/lib/auth";
import isUUID from "@/shared/lib/isUUID";
import {prisma} from "@/shared/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated()))
    return Response.json({message: "Помилка автентифікації"}, {status: 401});

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ error: "Невірний ID" }, { status: 400 });

  try {
    const news = await prisma.news.findUnique({
      where: {id}
    });

    if (!news)
      return Response.json({ error: "Новина не найдена" }, { status: 404 });

    return Response.json(news);
  } catch (error) {
    console.error(error)
    return Response.json({error: "Помилка сервера"}, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated()))
    return  Response.json({message: "Помилка автентифікації"}, {status: 401});

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ error: "Невірний ID" }, { status: 400 });

  try {
    await prisma.news.delete({
      where: {id}
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error)
    return Response.json({error: "Помилка сервера"}, { status: 500 })
  }
}

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
    const body = await request.json();

    const {title, description, publishedAt} = body;
    
    const news = await prisma.news.findUnique({
      where: {id}
    });

    if (!news)
      return Response.json({ error: "Новина не найдена" }, { status: 404 });

    await prisma.news.update({
      where: {id},
      data: {
        title: title,
        description: description,
        publishedAt: publishedAt ? new Date(publishedAt) : news.publishedAt,
      }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error)
    return Response.json({error: "Помилка сервера"}, { status: 500 })
  }
}