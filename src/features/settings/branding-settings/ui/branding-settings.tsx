"use client";

import { LogoImage, SettingsAdminDTO } from "@/entities/settings/model/types";
import { BrandingSettingsFormValues, useBrandingSettingsForm } from "../model/schema";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUpdateSettingsMutation } from "@/entities/settings/api/settings-admin-api";
import { Loader } from "lucide-react";
import { useState } from "react";
import LogoUploader from "./logo-uploader";


interface BrandingSettingsProps {
  settings: SettingsAdminDTO
}

export default function BrandingSettings({ settings }: BrandingSettingsProps) {
  const [logo, setLogo] = useState<LogoImage | null>(settings.imageUrl ? { url: settings.imageUrl } : null);
  const initialLogoUrl = settings.imageUrl ?? null;
  const isLogoDirty =
  // ? If there was no initial logo, but now there is one (either file or url)
  (!initialLogoUrl && logo !== null) ||
  // ? If there was an initial logo, but now it's removed
  (initialLogoUrl && logo === null) ||
  // ? If there was an initial logo, but the file has been updated
  (initialLogoUrl && logo?.file) ||
  // ? If the URL has been updated
  (initialLogoUrl && logo?.url && logo.url !== initialLogoUrl);

  const form = useBrandingSettingsForm(settings.companyName, settings.siteTitle);
  const isDirty = form.formState.isDirty || isLogoDirty;
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const onSubmit = async (data: BrandingSettingsFormValues) => {
    try {
      console.log(data, logo);
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append("siteTitle", data.siteTitle);
      formData.append("logo", logo?.file || logo?.url || "");

      await updateSettings(formData).unwrap();
      toast.success("Налаштування оновлено");
      form.reset(data);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg);
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4">Брендинг</h1>
      <LogoUploader logo={logo} setLogo={setLogo} />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-6"
      >
        <FieldGroup>
          <Controller
            name="siteTitle"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Заголовок сайту</FieldLabel>
                <Input {...field} placeholder="Введіть..." />
              </Field>
            )}
          />
          <Controller
            name="companyName"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>Назва компанії</FieldLabel>
                <Input {...field} placeholder="Введіть..." />
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
  );
}