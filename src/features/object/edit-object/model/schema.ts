import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const editObjectSchema = z.object({
  name: z.string().min(1, "Название не может быть пустым"),
  description: z.string().optional(),
})

export type EditObjectFormValues = z.infer<typeof editObjectSchema>;

export const useEditObjectForm = (name: string, description: string) => {
  return useForm({
    resolver: zodResolver(editObjectSchema),
    defaultValues: {
      name: name || "",
      description: description || "",
    }
  });
}