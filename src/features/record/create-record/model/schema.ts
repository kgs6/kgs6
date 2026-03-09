import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";


export const createRecordSchema = z.object({
  title: z.string().min(1, "Заголовок не может быть пустым"),
  description: z.string().optional(),
  publishedAt: z.string().optional(),
})

export type CreateRecordFormValues = z.infer<typeof createRecordSchema>;

export const useCreateRecordForm = (title: string, description: string, publishedAt: string) => {
  return useForm({
    resolver: zodResolver(createRecordSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      publishedAt: publishedAt || new Date().toISOString(),
    }
  });
}