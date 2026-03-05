import { isAuthenticated } from "@/shared/lib/auth";
import { prisma } from "@/shared/lib/prisma";

export async function PATCH(request: Request) {
  if (!(await isAuthenticated()))
    return Response.json(
      { message: "Помилка автентифікації" },
      { status: 401 },
    );

  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return Response.json(
        { error: "Очікується масив секцій" },
        { status: 400 },
      );
    }

    for (const item of body) {
      if (!item.id || typeof item.orderNo !== "number") {
        return Response.json(
          { error: "Невірний формат даних" },
          { status: 400 },
        );
      }
    }

    await prisma.$transaction(
      body.map((item: { id: string; orderNo: number }) =>
        prisma.section.update({
          where: { id: item.id },
          data: { orderNo: item.orderNo },
        }),
      ),
    );

    return Response.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return Response.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
