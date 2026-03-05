import { z } from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export const loginFormSchema = z.object({
  email: z.email().min(1, "Email не може бути порожнім"),
  password: z.string()
    .min(1, "Пароль не може бути порожнім")
    .min(8, "Пароль должен быть не менее 8 символов"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const useLoginForm = () => {
  return useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });
}