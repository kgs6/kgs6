import { isAuthenticated } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";



export async function PATCH(
  request: Request
) {
  if (!(await isAuthenticated()))
    return Response.json('Помилка авторизації', { status: 401 });

  try {
    const { routeId, routeTitle, routeIsActive } = await request.json();

    if (!routeId) {
      return Response.json('Невірні дані: відсутній routeId', { status: 400 });
    }

    const route = await prisma.route.findUnique({
      where: { id: routeId },
    });

    if (!route) {
      return Response.json('Розділ не знайдено', { status: 404 });
    }

    await prisma.route.update({
      where: { id: routeId },
       data: {
        title: routeTitle,
        isActive: routeIsActive,
       }
     });

     return Response.json('Налаштування сторінки оновлено', { status: 200 });

   } catch {
    return Response.json('Помилка сервера', { status: 500 });
   } 
}