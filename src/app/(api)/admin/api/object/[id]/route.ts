import { isAuthenticated } from '@/shared/lib/auth';
import isUUID from '@/shared/lib/isUUID';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { prisma } from '@/shared/lib/prisma';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated()))
    return Response.json(
      { message: 'Помилка автентифікації' },
      { status: 401 },
    );

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ message: 'Невірний формат UUID' }, { status: 400 });

  try {
    const currentState = await prisma.object.findUnique({
      where: { id },
      select: { isActive: true },
    });

    if (!currentState) {
      return Response.json({ error: 'Новину не знайдено' }, { status: 404 });
    }

    await prisma.object.update({
      where: { id },
      data: {
        isActive: !currentState.isActive,
      },
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated()))
    return Response.json(
      { message: 'Помилка автентифікації' },
      { status: 401 },
    );

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ message: 'Невірний формат UUID' }, { status: 400 });

  try {
    const deletedObject = await prisma.object.delete({
      where: { id },
    });

    return Response.json(deletedObject);
  } catch {
    return Response.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated()))
    return Response.json(
      { message: 'Помилка автентифікації' },
      { status: 401 },
    );

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ message: 'Невірний формат UUID' }, { status: 400 });

  try {
    const object = await prisma.object.findUnique({
      where: { id },
      include: {
        image: true,
      },
    });

    if (!object) {
      return Response.json({ error: 'Обʼєкт не знайдено' }, { status: 404 });
    }

    return Response.json(object);
  } catch {
    return Response.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated()))
    return Response.json(
      { message: 'Помилка автентифікації' },
      { status: 401 },
    );

  const { id } = await params;

  if (!id || !isUUID(id))
    return Response.json({ message: 'Невірний  UUID' }, { status: 400 });

  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const removeImage = formData.get('removeImage') === 'true';

    if (!name) {
      return Response.json(
        { error: 'Назва обʼєкта є обовʼязковою' },
        { status: 400 },
      );
    }

    const currentObject = await prisma.object.findUnique({
      where: { id },
      include: { image: true },
    });

    if (!currentObject) {
      return Response.json({ error: 'Обʼєкт не знайдено' }, { status: 404 });
    }

    const isNewFileProvided = imageFile instanceof File && imageFile.size > 0;

    let imageUpdateData = undefined;

    // ? =========================
    // ?   1️⃣ Новый файл
    // ? =========================
    if (isNewFileProvided) {
      if (currentObject.image?.url) {
        const oldPath = join(`${process.env.NEXT_PUBLIC_UPLOADS_URL}`, 'uploads', 'images', currentObject.image.url);

        try {
          await unlink(oldPath);
        } catch (e) {
          console.error('Не удалось удалить старый файл:', e);
        }
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uniqueFileName = `${uuidv4()}-${imageFile.name}`;

      const uploadDir = join(`${process.env.NEXT_PUBLIC_UPLOADS_URL}`, 'uploads', 'images');
      await mkdir(uploadDir, { recursive: true });

      const filePath = join(uploadDir, uniqueFileName);

      await writeFile(filePath, buffer);

      imageUpdateData = {
        image: {
          upsert: {
            create: {
              url: `/api/uploads/images/${uniqueFileName}`,
              fileName: imageFile.name,
              fileSize: imageFile.size,
            },
            update: {
              url: `/api/uploads/images/${uniqueFileName}`,
              fileName: imageFile.name,
              fileSize: imageFile.size,
            },
          },
        },
      };
    }

    // ? =========================
    // ?  2️⃣ Delete by flag
    // ? ========================== 
    if (removeImage && currentObject.image) {
      if (currentObject.image.url) {
        const oldPath = join(process.cwd(), 'public', currentObject.image.url);

        try {
          await unlink(oldPath);
        } catch (e) {
          console.error('Не удалось удалить файл:', e);
        }
      }

      imageUpdateData = {
        image: {
          delete: true,
        },
      };
    }

    const updatedObject = await prisma.object.update({
      where: { id },
      data: {
        name,
        description,
        ...imageUpdateData,
      },
      include: { image: true },
    });

    return Response.json(updatedObject);
  } catch (error) {
    console.error(error);

    return Response.json({ error: 'Помилка сервера' }, { status: 500 });
  }
}
