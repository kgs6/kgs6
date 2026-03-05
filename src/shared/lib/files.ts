import fs from "fs";
import path from "path";
import { prisma } from "@/shared/lib/prisma";
import { AttachmentType } from "@/generated/prisma/enums";
import { AdminExistingFileDTO } from "@/entities/file";

export async function syncEntryFiles(
  entryId: string,
  formData: FormData
) {
  // * Existing files from frontend
  const existingFilesStr = formData.getAll("existingFiles") as string[];

  const existingFiles: AdminExistingFileDTO[] = existingFilesStr.map(f =>
    JSON.parse(f)
  );

  const dbFiles = await prisma.attachment.findMany({
    where: { entryId },
  });

  // * Delete removed files
  const filesToDelete = dbFiles.filter(
    dbFile => !existingFiles.some(f => f.id === dbFile.id)
  );

  if (filesToDelete.length > 0) {
    await prisma.attachment.deleteMany({
      where: {
        id: {
          in: filesToDelete.map(f => f.id),
        },
      },
    });
  }

  // * Update existing files
  for (const file of existingFiles) {
    await prisma.attachment.update({
      where: { id: file.id },
      data: {
        fileName: file.name,
        orderNo: file.orderNo,
        type: file.type,
        url: file.url,
        fileSize: file.size,
      },
    });
  }

  // * Directory like in your API
  const uploadDir = path.join(process.cwd(), "uploads", "files");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const newFiles: File[] = [];

  for (const [key, value] of formData.entries()) {
    if (key === "files" && value instanceof File) {
      newFiles.push(value);
    }
  }

  for (let i = 0; i < newFiles.length; i++) {
    const file = newFiles[i];

    const uniqueFileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    await prisma.attachment.create({
      data: {
        entryId,
        url: `/api/uploads/files/${uniqueFileName}`,
        fileName: file.name,
        fileSize: file.size,
        orderNo: existingFiles.length + i + 1,
        type: AttachmentType.OTHER,
      },
    });
  }
}