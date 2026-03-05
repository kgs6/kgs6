import { isAuthenticated } from "@/shared/lib/auth";
import { syncEntryFiles } from "@/shared/lib/files";
import isUUID from "@/shared/lib/isUUID";
import { prisma } from "@/shared/lib/prisma";


export async function GET(
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
      include: {
        attachments: true
      }
    });

    if (!record) {
      return Response.json({ error: "Запис не знайдено" }, { status: 404 });
    }

    return Response.json(record);
  } catch (error: unknown) {
    console.error(error);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

export async function PUT(
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

    const formData = await req.formData();

    const title = (formData.get("title") as string) ?? "";
    const description = (formData.get("description") as string) ?? null;
    const dateStr = (formData.get("date") as string) ?? null;
    const publishedAt = dateStr ? new Date(dateStr) : new Date();

    await syncEntryFiles(id, formData);

    const updatedRecord =
      await prisma.entry.update({
        where: { id },
        data: {
          title,
          description,
          publishedAt,
        },
      });

    return Response.json(updatedRecord);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}