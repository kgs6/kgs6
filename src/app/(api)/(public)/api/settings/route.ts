import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      
      select: {
        siteTitle: true,
        companyName: true,
        description: true,
        imageUrl: true,
        address: true,
        phone: true,
        email: true,
        mapsUrl: true,
        routes: {
          where: { isActive: true },
          select: {
            title: true,
            isActive: true,
          },
        },
      }
    });

    if (!settings) {
      const newSettings = await prisma.siteSettings.create({
        data: {
          companyName: "",
          siteTitle: "",
          description: "",
          phone: "",
          email: "",
          address: "",
          mapsUrl: "",
          routes: {
            create: {
              title: 'Спеціальна сторінка',
              isActive: false,
            },
          }
        },
        select: {
          siteTitle: true,
          companyName: true,
          description: true,
          imageUrl: true,
          address: true,
          phone: true,
          email: true,
          mapsUrl: true,
          routes: {
            where: { isActive: true },
            select: {
              title: true,
              isActive: true,
            },
          },
        }
      });
      
      return Response.json(newSettings, { status: 200 });
    }

    return Response.json(settings, { status: 200 });

  } catch (error) {
    console.error("Public API Error:", error);
    return Response.json("Помилка сервера", { status: 500 });
  }
}