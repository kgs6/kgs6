import { prisma } from "@/shared/lib/prisma";
import { verifyAccess } from "@/shared/lib/jwt";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";
import { AttachmentType } from "@/generated/prisma/enums";
import { isAuthenticated } from "@/shared/lib/auth";

export async function POST(req: Request) {
    if (!(await isAuthenticated())) 
        return Response.json({ error: "Помилка авторизації" }, { status: 401 });
    
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string | undefined;
    const dateStr = formData.get("date") as string | null;
    const sectionName = formData.get("sectionName") as string;

    if (!title || !sectionName) {
        return Response.json({ error: "Невірні дані" }, { status: 400 });
    }

    const publishedAt = dateStr ? new Date(dateStr) : new Date();

    const files: File[] = [];
    for (const entry of formData.entries()) {
        const [key, value] = entry;
        if (key === "files" && value instanceof File) {
            files.push(value);
        }
    }

    try {
        const section = await prisma.section.findFirst({
            where: {
                name: sectionName
            }
        });

        if (!section) {
            return Response.json({ error: "Розділ не знайдено" }, { status: 404 });
        }

        const sectionId = section.id;

        const lastEntry = await prisma.entry.findFirst({
            where: { sectionId },
            orderBy: { orderNo: "desc" },
        });
        const orderNo = lastEntry ? lastEntry.orderNo + 1 : 1;

        const entry = await prisma.entry.create({
            data: {
                title,
                description,
                sectionId,
                publishedAt,
                orderNo,
                isActive: true,
            },
        });

        const attachmentsData = [];
        const uploadDir = path.join(process.cwd(), "public/uploads", entry.id);
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = file.name;
            const filePath = path.join(uploadDir, fileName);
            const arrayBuffer = await file.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            attachmentsData.push({
                entryId: entry.id,
                url: `/uploads/${entry.id}/${fileName}`,
                fileName: file.name,
                fileSize: file.size,
                orderNo: i + 1,
                type: AttachmentType.OTHER,
            });
        }

        if (attachmentsData.length > 0) {
            await prisma.attachment.createMany({
                data: attachmentsData,
            });
        }

        return Response.json({ entry, attachments: attachmentsData });
    } catch (error: any) {
        console.error(error);
        return Response.json({ error: "Помилка сервера" }, { status: 500 });
    }
}

