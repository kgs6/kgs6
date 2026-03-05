import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/shared/lib/prisma";
import {AttachmentType} from "@/generated/prisma/enums";
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

  // * SOFT Delete files that are in DB but not in existingFiles
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

  // * Update existing files that are in both DB and existingFiles
  // * (in case of changes in orderNo or other metadata)
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

  // * New files from frontend
  const uploadDir = path.join(
    process.cwd(),
    "public/uploads",
    entryId
  );

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

    const fileName = `${uuidv4()}-${file.name}`;

    const filePath = path.join(uploadDir, fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    fs.writeFileSync(filePath, buffer);

    await prisma.attachment.create({
      data: {
        entryId,
        url: `/uploads/${entryId}/${fileName}`,
        fileName: file.name,
        fileSize: file.size,
        orderNo: existingFiles.length + i + 1,
        type: AttachmentType.OTHER,
      },
    });
  }
}