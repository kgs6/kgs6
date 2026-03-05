import { Badge } from "@/components/ui/badge";

interface FileBadgesProps {
    type: string;
    isSigned: boolean;
}

export default function FileBadges({ type, isSigned }: FileBadgesProps) {
    let typeClasses = "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300";
    let label = type.toUpperCase();

    switch (type) {
        case "pdf":
            typeClasses = "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
            break;
        case "xml":
            typeClasses = "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300";
            break;
        case "doc":
            typeClasses = "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300";
            label = "DOC";
            break;
        case "docx":
            typeClasses = "bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300";
            label = "DOCX";
            break;
        case "txt":
            typeClasses = "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300";
            break;
        default:
            typeClasses = "bg-gray-50 text-gray-700 dark:bg-gray-950 dark:text-gray-300";
            label = "UNK";
    }

    return (
        <div className="flex flex-row items-center gap-2">
            <Badge
                className={`bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 ${
                    !isSigned ? "invisible" : ""
                }`}
            >
                ЕЦП
            </Badge>
            <Badge className={typeClasses}>{label}</Badge>
        </div>
    );
}
