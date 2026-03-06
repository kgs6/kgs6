"use client";

import { useRef } from "react";
import { X, Upload } from "lucide-react";
import Image from "next/image";

export interface LogoImage {
  file?: File;
  url?: string;
}

interface LogoUploaderProps {
  logo: LogoImage | null;
  setLogo: (file: LogoImage | null) => void;
}

export default function LogoUploader({ logo, setLogo }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (file: File) => {
    setLogo({ file });
  };

  const handleRemove = () => {
    setLogo(null);
  };

  const previewUrl =
    logo?.file
      ? URL.createObjectURL(logo.file)
      : logo?.url
      ? logo.url
      : null;

  return (
    <div className="flex flex-col items-start gap-2">
      <div
        className="relative w-40 aspect-square border rounded-xl overflow-hidden cursor-pointer bg-muted hover:bg-muted/70 transition"
        onClick={() => inputRef.current?.click()}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Logo preview"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm gap-2">
            <Upload size={20} />
            <span>Upload logo</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleSelect(file);
        }}
      />
    </div>
  );
}