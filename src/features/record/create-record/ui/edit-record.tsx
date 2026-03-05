import DatePicker from "@/components/shared/date-picker";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { Controller } from "react-hook-form";
import { CreateRecordFormValues, useCreateRecordForm } from "../model/schema";
import toast from "react-hot-toast";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Button } from "@/components/ui/button";
import { FileItem } from "@/entities/file/model/types";
import { useEffect, useState } from "react";
import FileUploader from "@/components/shared/file-uploader";
import { useEditRecordMutation, useGetRecordByIdQuery } from "@/entities/record/api/record-admin-api";
import { Loader } from "lucide-react";

export default function EditRecord() {
  const { id } = useParams() as { id: string }
  const [files, setFiles] = useState<FileItem[]>([]);
  const [initialFiles, setInitialFiles] = useState<FileItem[]>([]);
  const form = useCreateRecordForm();
  const { isDirty } = form.formState;
  const { data: defaultRecord, isLoading: recordIsLoading } = useGetRecordByIdQuery(id);
  const [updateRecord, { isLoading: updateIsLoading }] = useEditRecordMutation();

  useEffect(() => {
    if (defaultRecord) {
      form.reset({
        title: defaultRecord.title,
        description: defaultRecord.description,
        publishedAt: defaultRecord.publishedAt,
      });

      const initialFiles = defaultRecord.attachments?.map(att => ({
        id: att.id,
        url: att.url,
        name: att.fileName,
        size: att.fileSize,
        type: att.type,
        orderNo: att.orderNo,
      })) ?? [];

      setFiles(initialFiles);
      setInitialFiles(initialFiles);
    }
  }, [defaultRecord, form]);

  const isFilesDirty =
    files.length !== initialFiles.length ||
    files.some((file, index) => {
      if (file.file) return true;
      return file.id !== initialFiles[index]?.id;
    });

  const canSave = isDirty || isFilesDirty;

  const onSubmit = async (data: CreateRecordFormValues) => {
    try {

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      if (data.publishedAt) formData.append("date", data.publishedAt);

      files.forEach((file: FileItem) => {
        if (file.file) {
          formData.append("files", file.file, file.name);
        } else if (file.id) {
          formData.append("existingFiles", JSON.stringify({
            id: file.id,
            name: file.name,
            url: file.url,
            size: file.size,
            type: file.type,
            orderNo: file.orderNo,
          }));
        }
      });

      // ! Change to edit record mutation 
      await updateRecord({ id, data: formData }).unwrap();
      toast.success("Запис успішно оновлено");
      // form.reset();
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg);
      console.error(msg, error);
    }
  }

  return (
    <div className={"w-full"}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name={"title"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Заголовок</FieldLabel>
                <Input
                  {...field}
                  // disabled={isLoading}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
          <Controller
            name={"description"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Опис</FieldLabel>
                <Textarea
                  {...field}
                  // disabled={isLoading}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                  rows={6}
                />
              </Field>
            )}
          />
          <Controller
            name={"publishedAt"}
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Дата публікації</FieldLabel>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  setDate={(newDate) => {
                    field.onChange(newDate ? newDate.toISOString() : undefined);
                  }}
                />
              </Field>
            )}
          />

          <FileUploader files={files} setFiles={setFiles} />

          <div className={"w-full md:flex md:justify-end"}>
            <Button
              type="submit"
              disabled={updateIsLoading || recordIsLoading || !canSave}
              className={"mt-4 w-full md:w-40"}
            >
              {updateIsLoading || recordIsLoading && <Loader className="animate-spin" />}
              Зберегти запис
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
