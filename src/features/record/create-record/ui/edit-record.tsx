"use client";

import DatePicker from "@/components/shared/date-picker";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Controller } from "react-hook-form";
import { CreateRecordFormValues, useCreateRecordForm } from "../model/schema";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Button } from "@/components/ui/button";
import { FileItem } from "@/entities/file/model/types";
import { useMemo, useState } from "react";
import FileUploader from "@/components/shared/file-uploader";
import { useEditRecordMutation } from "@/entities/record/api/record-admin-api";
import { Loader } from "lucide-react";
import RecordAdminDTO from "@/entities/record/model/types";

interface EditRecordProps {
  record: RecordAdminDTO;
}

export default function EditRecord({ record }: EditRecordProps) {

  const initialFilesFromRecord: FileItem[] =
    record.attachments?.map((att) => ({
      id: att.id,
      url: att.url,
      name: att.fileName,
      size: att.fileSize,
      type: att.type,
      orderNo: att.orderNo,
    })) ?? [];

  const [initialFiles, setInitialFiles] =
    useState<FileItem[]>(initialFilesFromRecord);

  const [files, setFiles] = useState<FileItem[]>(initialFilesFromRecord);

  const form = useCreateRecordForm(
    record.title,
    record.description,
    record.publishedAt
  );

  const { isDirty } = form.formState;

  const [updateRecord, { isLoading }] = useEditRecordMutation();

  const isFilesDirty = useMemo(() => {
    if (files.length !== initialFiles.length) return true;

    return files.some((file, index) => {
      if (file.file) return true;
      return file.id !== initialFiles[index]?.id;
    });
  }, [files, initialFiles]);

  const canSave = isDirty || isFilesDirty;

  const onSubmit = async (data: CreateRecordFormValues) => {
    try {

      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description || "");

      if (data.publishedAt) {
        formData.append("date", data.publishedAt);
      }

      files.forEach((file) => {
        if (file.file) {
          formData.append("files", file.file, file.name);
        } else if (file.id) {
          formData.append(
            "existingFiles",
            JSON.stringify({
              id: file.id,
              name: file.name,
              url: file.url,
              size: file.size,
              type: file.type,
              orderNo: file.orderNo,
            })
          );
        }
      });

      await updateRecord({
        id: record.id,
        data: formData,
      }).unwrap();

      // обновляем baseline файлов
      setInitialFiles(files);

      toast.success("Запис успішно оновлено");

    } catch (error) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg);
      console.error(msg, error);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>

          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Заголовок</FieldLabel>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder="Введіть..."
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Опис</FieldLabel>
                <Textarea
                  {...field}
                  placeholder="Введіть..."
                  disabled
                  aria-invalid={fieldState.invalid}
                  className="h-12"
                />
              </Field>
            )}
          />

          <Controller
            name="publishedAt"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Дата публікації</FieldLabel>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(newDate) =>
                    field.onChange(
                      newDate ? newDate.toISOString() : undefined
                    )
                  }
                />
              </Field>
            )}
          />

          <FileUploader files={files} setFiles={setFiles} />

          <div className="w-full md:flex md:justify-end">
            <Button
              type="submit"
              disabled={isLoading || !canSave}
              className="mt-4 w-full md:w-40"
            >
              {isLoading && <Loader className="animate-spin mr-2" />}
              Зберегти запис
            </Button>
          </div>

        </FieldGroup>
      </form>
    </div>
  );
}