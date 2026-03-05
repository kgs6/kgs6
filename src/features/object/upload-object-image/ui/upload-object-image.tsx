"use client";

import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";
import { FileItem } from "@/entities/file/model/types";
import { toast } from "react-hot-toast";

interface UploadObjectImageProps {
  files: FileItem | null;
  setFiles: (file: FileItem | null) => void;
}

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg"];

export default function UploadObjectImage({ files, setFiles }: UploadObjectImageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!files) {
      setPreviewUrl(null);
      return;
    }

    if (files.file) {
      const objectUrl = URL.createObjectURL(files.file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    if (files.url) {
      setPreviewUrl(files.url);
    }
  }, [files]);

  function isFileAllowed(file: File) {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
  }

  function handleFile(file: File) {
    if (!isFileAllowed(file)) {
      toast.error(`Файл "${file.name}" має недопустимий формат (дозволено PNG, JPG)`);
      return;
    }

    const newFileItem: FileItem = {
      id: crypto.randomUUID(),
      file: file,
      name: file.name,
      size: file.size,
      type: file.type,
      orderNo: 0,
    };

    setFiles(newFileItem);
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <Card className="p-4">
      {!files ? (
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
          <Upload className="mx-auto mb-4 opacity-70" size={28} />
          <p className="text-sm text-muted-foreground mb-4">
            Перетягніть файл сюди або оберіть вручную<br />(.png, .jpg, .jpeg)
          </p>
          <input
            ref={inputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={handleUpload}
            className="hidden"
          />
          <Button type="button" onClick={() => inputRef.current?.click()}>
            Обрати файл
          </Button>
        </div>
      ) : (
        <div className="mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 p-3 border rounded-xl bg-card">
            <div className="w-full lg:w-74 shrink-0">
              <div className="relative overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-muted-foreground opacity-20" size={40} />
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between grow py-1">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground line-clamp-1">
                  {files.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {files.type.split('/')[1]?.toUpperCase() || 'IMG'} • {(files.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <div className="mt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20 w-full sm:w-auto"
                  onClick={() => setFiles(null)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Видалити
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}