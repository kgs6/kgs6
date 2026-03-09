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
import { useState } from "react";
import FileUploader from "@/components/shared/file-uploader";
import { useCreateRecordMutation } from "@/entities/record/api/record-admin-api";


export default function CreateRecord() {
  const { section } = useParams() as { section: string }
  const [files, setFiles] = useState<FileItem[]>([]);
  const form = useCreateRecordForm("", "", "");
  const [createRecord] = useCreateRecordMutation();

  const onSubmit = async (data: CreateRecordFormValues) => {
    try {
      const formData = new FormData();
      formData.append("sectionName", section);
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

      await createRecord(formData).unwrap();
      toast.success("Запис успішно створений");
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
            <Button type="submit" className={"mt-4 w-full md:w-auto"}>
              {/* {isLoading && <Loader/>} */}
              Створити
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
