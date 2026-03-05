import { prisma } from "@/shared/lib/prisma";



export async function GET() {
  try {
    let settings = await prisma.siteSettings.findFirst({
      select: {
        siteTitle: true,
        companyName: true,
        description: true,
        imageUrl: true,
        address: true,
        phone: true,
        email: true,
        mapsUrl: true,
      }
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          companyName: "",
          siteTitle: "",
          description: "",
          phone: "",
          email: "",
          address: "",
          mapsUrl: "",
        }
      })
    }

    return Response.json(settings, { status: 200 });

  } catch {
    return Response.json("Помилка сервера", { status: 500 });
  }
}