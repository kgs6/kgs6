
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod"

export const aboutSettingsSchema = z.object({
  description: z.string()
})

export type AboutSettingsFormVlues = z.infer<typeof aboutSettingsSchema>;

export const useAboutSettingsForm = (description: string) => {
  return useForm({
    resolver: zodResolver(aboutSettingsSchema),
    defaultValues: {
      description: description || ""
    }
  })
}