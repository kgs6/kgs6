import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const contactSettingsSchema = z.object({
  address: z.string().max(255).optional(),
  phone: z.string().trim().optional(),
  // .refine(
  //   (val) =>
  //     !val ||
  //     /^\[1-9]\d{9,14}$/.test(val),
  //   {
  //     message: "Телефон повинен бути у форматі +380XXXXXXXXX",
  //   }
  // ),
  email: z.email("Введіть коректний email (example@mail.com)").optional(),
  mapsUrl: z.string().optional(),
});

export type ContactSettingsFormValues = z.infer<typeof contactSettingsSchema>;

export const useContactSettingsForm = (
  address: string | undefined, 
  phone: string | undefined, 
  email: string | undefined, 
  mapsUrl: string | undefined
) => {
  return useForm({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: {
      address: address || "",
      phone: phone || "",
      email: email || "",
      mapsUrl: mapsUrl || "",
    }
  });
}
