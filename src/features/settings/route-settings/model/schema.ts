import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";


export const routeSettingsSchema = z.object({
  title: z.string().max(255),
});

export type RouteSettingsFormValues = z.infer<typeof routeSettingsSchema>;

export const useRouteSettingsForm = (title: string) => {
  return useForm({
    resolver: zodResolver(routeSettingsSchema),
    defaultValues: {
      title: title || "",
    }
  });
}