import { isAuthenticated } from '@/shared/lib/auth';
import { prisma } from '@/shared/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  if (!(await isAuthenticated()))
    return Response.json('Помилка авторизації', { status: 401 });

  try {
    let settings = await prisma.siteSettings.findFirst({
      include: { routes: true },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          companyName: '',
          siteTitle: '',
          description: '',
          phone: '',
          email: '',
          address: '',
          mapsUrl: '',
          routes: {
            create: {
              title: 'Головна',
              isActive: false,
            },
          },
        },
        include: { routes: true },
      });
    }

    if (settings.routes.length === 0) {
      const defaultRoute = await prisma.route.create({
        data: {
          title: 'Головна',
          isActive: false,
          siteId: settings.id,
        },
      });
      settings.routes = [defaultRoute];
    }

    return Response.json(settings, { status: 200 });
  } catch {
    return Response.json('Помилка сервера', { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAuthenticated()))
    return Response.json('Помилка авторизації', { status: 401 });

  try {
    const formData = await request.formData();
    const logo = formData.get('logo');

    let imageUrl: string | undefined = undefined;

    if (logo instanceof File) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = join(`${process.env.NEXT_PUBLIC_UPLOADS_URL}`, 'uploads', 'logo');
      await mkdir(uploadDir, { recursive: true });

      const fileName = `${Date.now()}-${logo.name}`;
      const filePath = join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      imageUrl = `/api/uploads/logo/${fileName}`;
    } else if (typeof logo === 'string') {
      if (logo === '') {
        imageUrl = '';
      }
    }

    const settings = await prisma.siteSettings.findFirst();
    if (!settings) {
      return Response.json('Налаштування не знайдені', { status: 404 });
    }

    const dataToUpdate: Record<string, string | File> = {};

    const keys = [
      'companyName',
      'description',
      'siteTitle',
      'address',
      'phone',
      'email',
      'mapsUrl',
    ] as const;

    keys.forEach((key) => {
      if (formData.has(key)) {
        const value = formData.get(key);
        dataToUpdate[key] = value ?? '';
      }
    });

    if (imageUrl !== undefined) {
      dataToUpdate.imageUrl = imageUrl;
    }

    const updatedSettings = await prisma.siteSettings.update({
      where: { id: settings.id },
      data: dataToUpdate,
    });


    return Response.json(updatedSettings, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('Помилка сервера', { status: 500 });
  }
}
