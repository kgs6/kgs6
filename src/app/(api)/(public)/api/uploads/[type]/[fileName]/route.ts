import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ type: string; fileName: string }> }
) {
  const { type, fileName } = await params;

  console.log(type, fileName)

  const allowedTypes = ["logo", "images", "files"];
  if (!allowedTypes.includes(type)) {
    return new NextResponse("Invalid type", { status: 400 });
  }

  const filePath = path.join(process.cwd(), "uploads", type, fileName);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  let mimeType = "application/octet-stream";

  if (ext === ".png") mimeType = "image/png";
  if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
  if (ext === ".gif") mimeType = "image/gif";
  if (ext === ".webp") mimeType = "image/webp";
  if (ext === ".pdf") mimeType = "application/pdf";

  const fileBuffer = await fs.promises.readFile(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": mimeType,
    },
  });
}