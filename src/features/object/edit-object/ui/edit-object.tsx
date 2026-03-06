"use client";

import toast from "react-hot-toast";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadObjectImage } from "../../upload-object-image";
import { useEffect, useState } from "react";
import { FileItem } from "@/entities/file/model/types";
import { EditObjectFormValues, useEditObjectForm } from "../model/schema";
import { useUpdateObjectMutation } from "@/entities/object/api/object-admin-api";
import { Loader } from "lucide-react";
import { ObjectDTO } from "@/entities/object";

interface EditObjectProps {
  object: ObjectDTO
}


export default function EditObject({object}: EditObjectProps) {
  const [image, setImage] = useState<FileItem | null>(null);
  const form = useEditObjectForm(object.name, object.description);
  const [updateObject, { isLoading: isUpdating }] = useUpdateObjectMutation();

  useEffect(() => {
    const setDefaultValues = () => {
      if (!object) return;

      if (object.image && !image) {
        setImage(prev => {
          if (!prev && object.image) {
            return {
              id: 1,
              url: object.image.url,
              name: object.image.fileName,
              size: object.image.fileSize,
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
  }, [object, form]);

  const onSubmit = async (data: EditObjectFormValues) => {
    console.log("Form data:", data);
    console.log("Selected image:", image);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description || "");

      if (image?.file)
        formData.append("image", image.file, image.name);

      if (!image && object?.image)
        formData.append("removeImage", "true");

      await updateObject({ id: object.id, data: formData }).unwrap();

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
                  disabled={isUpdating}
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
                  disabled={isUpdating}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                  className={"h-64"}
                />
              </Field>
            )}
          />

          <UploadObjectImage files={image} setFiles={setImage} />

          <div className={"w-full md:flex md:justify-end"}>
            <Button type="submit" className={"mt-4 w-full md:w-auto"} disabled={ isUpdating}>
              { isUpdating ? <Loader className="animate-spin" /> : null}
              Зберегти
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}