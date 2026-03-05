"use client";

import {NewsEditValues, useEditNewsForm} from "@/features/news/edit-news/model/schema";
import {useParams} from "next/navigation";
import {NewsEditDTO, useGetNewsByIdQuery, useUpdateNewsMutation} from "@/entities/news";
import toast from "react-hot-toast";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import DatePicker from "@/components/shared/date-picker";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {useEffect} from "react";

export default function EditNews() {
  const params = useParams();
  const newsId = params.id as string;
  const form = useEditNewsForm();
  const {isDirty} = form.formState;
  const {data: newsData, isLoading: isLoadingNews} = useGetNewsByIdQuery(newsId ?? "", {
    skip: !newsId,
  });
  const [updateNews, {isLoading: isUpdatingNews}] = useUpdateNewsMutation();

  useEffect(() => {
    if (newsData) {
      form.reset({
        title: newsData.title,
        description: newsData.description,
        publishedAt: newsData.publishedAt,
      });
    }
  }, [newsData, form]);

  const onSubmit = async (data: NewsEditValues) => {
    try {
      const editedNews: NewsEditDTO = {
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt || new Date().toISOString(),
      }

      await updateNews({
        id: newsId,
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
                  disabled={isLoadingNews}
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
                  disabled={isLoadingNews}
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
            <Button type="submit" disabled={isLoadingNews || !isDirty || isUpdatingNews}
                    className={"mt-4 w-full md:w-auto"}>
              {isLoadingNews || isUpdatingNews && <Loader className="animate-spin"/>}
              Зберегти
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}