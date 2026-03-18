import { isAuthenticated } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma'; // Путь к вашему инстансу Prisma
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return new Response('Помилка авторизації', { status: 401 });
  }

  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!name) {
      return new Response('Назва обʼєкта є обовʼязковою', { status: 400 });
    }

    let imageData = null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Генерируем уникальное имя файла
      const uniqueFileName = `${uuidv4()}-${imageFile.name}`;

      // Новая директория для хранения логотипов
      const uploadDir = join(`${process.env.NEXT_PUBLIC_UPLOADS_URL}`, 'uploads' , 'images');
      await mkdir(uploadDir, { recursive: true });

      // Путь до файла
      const filePath = join(uploadDir, uniqueFileName);

      // Сохраняем файл
      await writeFile(filePath, buffer);

      // Формируем данные для ответа
      imageData = {
        url: `/api/uploads/images/${uniqueFileName}`, // URL для API route
        fileName: imageFile.name,
        fileSize: imageFile.size,
      };
    }

    const newObject = await prisma.object.create({
      data: {
        name,
        description,
        isActive: true,
        image: imageData
          ? {
              create: imageData,
            }
          : undefined,
      },
      include: {
        image: true,
      },
    });

    return new Response(JSON.stringify(newObject), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Save Error:', error);
    return new Response('Помилка сервера', { status: 500 });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return new Response('Помилка авторизації', { status: 401 });
  }

  try {
    const objects = await prisma.object.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        isActive: true,
        image: {
          select: {
            url: true,
            fileName: true,
            fileSize: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(objects), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fetch Error:', error);
    return new Response('Помилка сервера', { status: 500 });
  }
}
