"use client";

import toast from "react-hot-toast";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadObjectImage } from "../../upload-object-image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FileItem } from "@/entities/file/model/types";
import { EditObjectFormValues, useEditObjectForm } from "../model/schema";
import { useGetObjectByIdQuery, useUpdateObjectMutation } from "@/entities/object/api/object-admin-api";
import { Loader } from "lucide-react";


export default function EditObject() {
  const params = useParams();
  const obejctId = params.id as string;
  const [image, setImage] = useState<FileItem | null>(null);
  const form = useEditObjectForm();
  const { data: objectData, isLoading } = useGetObjectByIdQuery(obejctId);
  const [updateObject, { isLoading: isUpdating }] = useUpdateObjectMutation();


  useEffect(() => {
    const setDefaultValues = () => {
      if (!objectData) return;

      form.reset({
        name: objectData.name,
        description: objectData.description || "",
      });

      if (objectData.image && !image) {
        setImage(prev => {
          if (!prev && objectData.image) {
            return {
              id: 1,
              url: objectData.image.url,
              name: objectData.image.fileName,
              size: objectData.image.fileSize,
              type: "image",
              orderNo: 0,
            };
          }
          return prev;
        });
      }
    }

    setDefaultValues();

    // ! If provide image in useEffect dependencies, 
    // ! it will cause blocking of deleteing and updating image,
    // ! because after update or delete, image will be null, 
    // ! and useEffect will set it again with objectData.image
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectData, form]);

  const onSubmit = async (data: EditObjectFormValues) => {
    console.log("Form data:", data);
    console.log("Selected image:", image);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");

      if (image?.file)
        formData.append("image", image.file, image.name);

      if (!image && objectData?.image)
        formData.append("removeImage", "true");

      await updateObject({ id: obejctId, data: formData }).unwrap();

      toast.success("Об'єкт успішно оновлено");
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
            name={"name"}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Назва об`єкта</FieldLabel>
                <Input
                  {...field}
                  disabled={isLoading || isUpdating}
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
                  disabled={isLoading || isUpdating}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                  rows={6}
                />
              </Field>
            )}
          />

          <UploadObjectImage files={image} setFiles={setImage} />

          <div className={"w-full md:flex md:justify-end"}>
            <Button type="submit" className={"mt-4 w-full md:w-auto"} disabled={isLoading || isUpdating}>
              {isLoading || isUpdating ? <Loader className="animate-spin" /> : null}
              Зберегти
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}