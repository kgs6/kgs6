import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const newsEditSchema = z.object({
  title: z.string().min(1, "Заголовок не може бути порожнім"),
  description: z.string().min(1, "Опис не може бути порожнім"),
  publishedAt: z.string().optional(),
})

export type NewsEditValues = z.infer<typeof newsEditSchema>;

export const useEditNewsForm = (title: string | undefined, description: string | undefined) => {
  return useForm<NewsEditValues>({
    resolver: zodResolver(newsEditSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      publishedAt: new Date().toISOString(),
    }
  });
}