"use client";

import toast from "react-hot-toast";
import { CreateObjectFormValues, useCreateObjectForm } from "../model/schema";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { ADMIN_PAGES } from "@/shared/config/pages.config";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { UploadObjectImage } from "../../upload-object-image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileItem } from "@/entities/file/model/types";
import { useCreateObjectMutation } from "@/entities/object/api/object-admin-api";


export default function CreateObject() {
  const router = useRouter();
  const form = useCreateObjectForm();
  const [image, setImage] = useState<FileItem | null>(null);
  const [createObject, { isLoading }] = useCreateObjectMutation();


  const onSubmit = async (data: CreateObjectFormValues) => {
    console.log("Form data:", data);
    console.log("Selected image:", image);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");

      if (image?.file)
        formData.append("image", image.file, image.name);
      
      await createObject(formData).unwrap();

      toast.success("Об'єкт успішно створено");
      form.reset();
      router.push(ADMIN_PAGES.OBJECTS)
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg);
      console.error(msg, error);
    }
  }


  return (
     <div className={"w-full mt-4"}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name={"name"}
            control={form.control}
            render={({field, fieldState}) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Назва об&#39;єкта</FieldLabel>
                <Input
                  {...field}
                  disabled={isLoading}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
          
          <Controller
            name={"description"}
            control={form.control}
            render={({field, fieldState}) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Опис</FieldLabel>
                <Textarea
                  {...field}
                  disabled={isLoading}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                  rows={6}
                />
              </Field>
            )}
          />

          <UploadObjectImage files={image} setFiles={setImage} />

          <div className={"w-full md:flex md:justify-end"}>
            <Button type="submit" disabled={isLoading} className={"mt-4 w-full md:w-auto"}>
              {isLoading && <Loader/>}
              Створити
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}