"use client";

import {NewsCreateValues, useCreateNewsForm} from "@/features/news/create-news/model/schema";
import {useCreateNewsMutation} from "@/entities/news";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import DatePicker from "@/components/shared/date-picker";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";
import {ADMIN_PAGES} from "@/shared/config/pages.config";

export default function CreateNews() {
  const router = useRouter();
  const form = useCreateNewsForm();
  const [createNews, {isLoading}] = useCreateNewsMutation();

  const onSubmit = async (data: NewsCreateValues) => {
    try {
      await createNews({
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt || new Date().toISOString(),
      }).unwrap();

      toast.success("Новина успішно створена");
      form.reset();
      router.push(ADMIN_PAGES.NEWS)
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
            render={({field, fieldState}) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Заголовок</FieldLabel>
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
          <Controller
            name={"publishedAt"}
            control={form.control}
            render={({field}) => (
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

          <div className={"w-full md:flex md:justify-end"}>
            <Button type="submit" disabled={isLoading} className={"mt-4 w-full md:w-auto"}>
              {isLoading && <Loader/>}
              Створити
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};
