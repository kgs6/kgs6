"use client";

import {FileItem} from "@/types/interfaces/file-item";
import {
  useSensors,
  useSensor,
  PointerSensor,
  DragEndEvent,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {useRef, useState, DragEvent, ChangeEvent } from "react";
import {Card} from "../ui/card";
import {Button} from "../ui/button";
import {Upload} from "lucide-react";
import SortableFileItem from "./sortable-file-item";
import {toast} from "react-hot-toast";

interface FileUploaderProps {
  files: FileItem[];
  setFiles: (files: FileItem[]) => void;
}

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".xml", ".p7s", ".zip"];

export default function FileUploader({files, setFiles}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const idCounter = useRef(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  function isFileAllowed(file: File) {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  }

  function addFiles(fileList: FileList) {
    const startOrder = files.length;
    const newFiles: FileItem[] = [];

    Array.from(fileList).forEach((file) => {
      if (!isFileAllowed(file)) {
        toast.error(`Файл "${file.name}" має недопустимий формат`);
        return;
      }
      newFiles.push({
        id: idCounter.current++,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        orderNo: startOrder + newFiles.length + 1,
      });
    });

    if (newFiles.length > 0) {
      setFiles([...files, ...newFiles]);
    }
  }


  function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    addFiles(e.target.files);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    const oldIndex = files.findIndex((i) => i.id === active.id);
    const newIndex = files.findIndex((i) => i.id === over.id);

    const newArray = arrayMove(files, oldIndex, newIndex).map((file, index) => ({
      ...file,
      orderNo: index + 1,
    }));

    setFiles(newArray);
  }


  function updateName(id: number | string, value: string) {
    setFiles(files.map((file) => (file.id === id ? {...file, name: value} : file)));
  }


  function removeFile(id: number | string) {
    const newArray = files.filter((file) => file.id !== id).map((file, index) => ({
      ...file,
      orderNo: index + 1,
    }));
    setFiles(newArray);
  }


  return (
    <Card className="p-4">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition
          ${isDragging ? "border-primary bg-primary/5" : "border-muted"}
        `}
      >
        <Upload className="mx-auto mb-4 opacity-70" size={28}/>

        <p className="text-sm text-muted-foreground mb-4">
          Перетягніть файли сюди або оберіть їх вручну<br/>(.pdf, .doc, .docx, .xml, .p7s, .zip)
        </p>

        <label>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xml,.p7s,.zip"
            multiple
            onChange={handleUpload}
            className="hidden"
          />

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
          >
            Обрати файли
          </Button>

        </label>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={files.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {files.length > 0 && (
              <div>
                <h1 className="text-lg font-semibold">Додані файли</h1>
                <p className="text-sm text-muted-foreground">
                  Додано {files.length} файлів (Перетягніть, щоб змінити порядок)
                </p>
              </div>
            )}


            {files.map((file) => (
              <SortableFileItem
                key={file.id}
                file={file}
                onChangeName={updateName}
                onRemove={removeFile}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Card>
  );
}
