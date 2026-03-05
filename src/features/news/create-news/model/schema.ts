import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const newsCreateSchema = z.object({
  title: z.string().min(1, "Заголовок не може бути порожнім"),
  description: z.string().min(1, "Опис не може бути порожнім"),
  publishedAt: z.string().optional(),
})

export type NewsCreateValues = z.infer<typeof newsCreateSchema>;

export const useCreateNewsForm = () => {
  return useForm<NewsCreateValues>({
    resolver: zodResolver(newsCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      publishedAt: new Date().toISOString(),
    }
  });
}