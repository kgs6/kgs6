// lib/get-file-type.ts
export function getFileType(fileName: string): { type: string; isSigned: boolean } {
  const lower = fileName.toLowerCase();
  let isSigned = false;

  // Найдем все .p7s в конце, учитывая варианты типа .p7s-2, .p7s-3 и т.д.
  const p7sRegex = /\.p7s(-\d+)?$/;
  let name = lower;
  while (p7sRegex.test(name)) {
    isSigned = true;
    name = name.replace(p7sRegex, ""); // убираем последний .p7s или .p7s-2
  }

  // Определяем основной тип
  const dotIndex = name.lastIndexOf(".");
  const ext = dotIndex !== -1 ? name.slice(dotIndex + 1) : "";

  let type = "unknown";
  switch (ext) {
    case "pdf":
      type = "pdf";
      break;
    case "xml":
      type = "xml";
      break;
    case "doc":
      type = "doc";
      break;
    case "docx":
      type = "docx";
      break;
    case "txt":
      type = "txt";
      break;
    default:
      type = "unknown";
  }

  return { type, isSigned };
}
