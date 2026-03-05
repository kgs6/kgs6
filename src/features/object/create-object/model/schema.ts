import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export const createObjectSchema = z.object({
  name: z.string().min(1, "Название не может быть пустым"),
  description: z.string().optional(),
})

export type CreateObjectFormValues = z.infer<typeof createObjectSchema>;

export const useCreateObjectForm = () => {
  return useForm({
    resolver: zodResolver(createObjectSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  });
}