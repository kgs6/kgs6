import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";



export const brandingSettingsSchema = z.object({
  companyName: z.string(),
  siteTitle: z.string(),
});

export type BrandingSettingsFormValues = z.infer<typeof brandingSettingsSchema>;

export const useBrandingSettingsForm = (companyName: string, siteTitle: string) => {
  return useForm({
    resolver: zodResolver(brandingSettingsSchema),
    defaultValues: {
      companyName: companyName || "",
      siteTitle: siteTitle || "",
    }
  });
}