"use client";

import { SettingsAdminDTO } from "@/entities/settings"
import { ContactSettingsFormValues, useContactSettingsForm } from "../model/schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import { useUpdateSettingsMutation } from "@/entities/settings/api/settings-admin-api";
import { Loader } from "lucide-react";


interface ContactSettingsProps {
  settings: SettingsAdminDTO
}

export default function ContactSettings({ settings }: ContactSettingsProps) {
  const form = useContactSettingsForm(settings.address, settings.phone, settings.email, settings.mapsUrl);
  const isDirty = form.formState.isDirty;
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const onSubmit = async (data: ContactSettingsFormValues) => {
    try {
      const formData = new FormData();
      formData.append("address", data.address ?? "");
      formData.append("phone", data.phone ?? "");
      formData.append("email", data.email ?? "");
      if (!data.mapsUrl) {
        formData.append("mapsUrl", "");
      } else {
        const div = document.createElement('div');
        div.innerHTML = data.mapsUrl ?? "";
        const src = (div.querySelector('iframe') as HTMLIFrameElement).src;

        formData.append("mapsUrl", src ?? "");
      }

      await updateSettings(formData).unwrap();
      // console.log(data);
      toast.success("Налаштування оновлено");
      form.reset(data);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg);
    }
  }

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">Контакти</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="address"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Адреса</FieldLabel>
                <Input {...field} placeholder="01234, Україна вул. Вулична 134" />
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Телефон</FieldLabel>
                <Input
                  {...field}
                  placeholder="+380441234567"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  placeholder="example@mail.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="mapsUrl"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>URL для карти</FieldLabel>
                <Input {...field} placeholder="https://maps.google.com/1#@!asfdas..." />
              </Field>
            )}
          />
        </FieldGroup>
        <div>
          <div className={"w-full md:flex md:justify-end"}>
            <Button
              type="submit"
              disabled={!isDirty}
              className={`${!isDirty ? "hidden" : "mt-4"} w-full md:w-auto`}
            >
              {isLoading && <Loader />}
              Зберегти
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}