import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(1, "Ім'я є обов'язковим"),
    email: z.email('Невірний формат електронної пошти'),
    role: z.enum(['ADMIN', 'USER'], "Роль має бути або 'ADMIN', або 'USER'"),
    allowOauth: z.boolean(),
    allowPassword: z.boolean(),
    password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.allowPassword && (!data.password || data.password.length < 8)) {
        return false;
      }
      return true;
    },
    {
      message: "Пароль обов'язковий, якщо увімкнено стандартний вхід",
      path: ['password'],
    },
  )
  .refine(
    (data) => {
      return data.allowOauth || data.allowPassword;
    },
    {
      message: 'Оберіть хоча б один метод входу',
      path: ['allowOauth'],
    },
  );

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export const useCreateUserForm = () => {
  return useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      allowOauth: false,
      allowPassword: true,
      password: '',
      role: 'USER',
    },
  });
};
