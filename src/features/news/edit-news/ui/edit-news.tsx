"use client";

import {NewsEditValues, useEditNewsForm} from "@/features/news/edit-news/model/schema";
import {NewsDTO, NewsEditDTO, useUpdateNewsMutation} from "@/entities/news";
import toast from "react-hot-toast";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import DatePicker from "@/components/shared/date-picker";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";

interface EditNewsProps {
  news: NewsDTO,
}

export default function EditNews({news}: EditNewsProps) {
  const form = useEditNewsForm(news.title, news.description);
  const {isDirty} = form.formState;
  const [updateNews, {isLoading: isUpdatingNews}] = useUpdateNewsMutation();

  const onSubmit = async (data: NewsEditValues) => {
    try {
      const editedNews: NewsEditDTO = {
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt || new Date().toISOString(),
      }

      await updateNews({
        id: news.id,
        data: editedNews,
      }).unwrap();

      toast.success("Новина успішно створена");
      form.reset();
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
                  disabled={isUpdatingNews}
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
                  disabled={isUpdatingNews}
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                  className={"h-64"}
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
            <Button type="submit" disabled={isUpdatingNews || !isDirty || isUpdatingNews}
                    className={"mt-4 w-full md:w-auto"}>
              {isUpdatingNews || isUpdatingNews && <Loader className="animate-spin"/>}
              Зберегти
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}