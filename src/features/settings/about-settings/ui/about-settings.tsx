import { SettingsAdminDTO } from "@/entities/settings"
import { AboutSettingsFormVlues, useAboutSettingsForm } from "../model/schema"
import { getErrorMessage } from "@/shared/lib/get-error-message";
import toast from "react-hot-toast";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateSettingsMutation } from "@/entities/settings/api/settings-admin-api";
import { Loader } from "lucide-react";


interface AboutSettingsProps {
  settings: SettingsAdminDTO
}


export default function AboutSettings({ settings }: AboutSettingsProps) {
  const form = useAboutSettingsForm(settings.description);
  const isDirty = form.formState.isDirty;
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const onSubmit = async (data: AboutSettingsFormVlues) => {
    try {
      const formData = new FormData();
      formData.append("description", data.description);

      await updateSettings(formData).unwrap();

      toast.success("Налаштування оновлено")
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg)
    }
  }

  return (
    <div className="w-full mt-6">
      <h1 className="text-2xl font-bold mb-4">Про компанію</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Опис сторінки &quot;Про компанію&quot;
                </FieldLabel>
                <Textarea className="min-h-128" {...field} placeholder="Введіть..."/>
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