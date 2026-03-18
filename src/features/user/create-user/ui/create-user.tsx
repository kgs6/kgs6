'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  Eye,
  EyeOff,
  UserRoundPlus,
  Lock,
  AlertCircle,
  Chromium,
  Loader,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';

import { CreateUserFormValues, useCreateUserForm } from '../model/schema';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import { useRegisterMutation } from '@/entities/user/api/user-api';
import { RegisterDTO } from '@/entities/user';

export default function CreateUser() {
  const form = useCreateUserForm();
  const { isDirty, isValid, errors } = form.formState;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const [isOpen, setIsOpen] = useState(false);

  const watchAllowPassword = form.watch('allowPassword');

  const onSubmit = async (data: CreateUserFormValues) => {
    try {
      const registerData: RegisterDTO = {
        name: data.name,
        email: data.email,
        password: data.password || '',
        allowOauth: data.allowOauth,
        allowPassword: data.allowPassword,
        role: data.role,
      };

      await register(registerData).unwrap();
      toast.success('Користувача успішно створено');
      setIsOpen(false);
      form.reset();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      form.reset();
      setIsOpen(!isOpen);
    }}>
      <DialogTrigger asChild>
        <Button>
          <UserRoundPlus className="mr-2 h-4 w-4" />
          Створити користувача
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Стоврити користувача</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Повне ім&apos;я</FieldLabel>
                  <Input
                    {...field}
                    placeholder="Імʼя"
                    aria-invalid={fieldState.invalid}
                  />
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email адреса</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    placeholder="admin@company.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete={'none'}
                  />
                </Field>
              )}
            />

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Способи входу в систему</p>
                {/* Глобальная ошибка, если ни один метод не выбран */}
                {errors.allowPassword?.root?.message && (
                  <span className="text-[10px] text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />{' '}
                    {errors.allowPassword.root.message}
                  </span>
                )}
              </div>

              <Controller
                name="allowOauth"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div
                    className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${!field.value && !watchAllowPassword ? 'border-destructive' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Chromium className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        Google OAuth 2.0
                      </span>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                    />
                  </div>
                )}
              />

              <Controller
                name="allowPassword"
                control={form.control}
                render={({ field }) => (
                  <div
                    className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${!field.value && !form.watch('allowOauth') ? 'border-destructive' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">
                        Логін та пароль
                      </span>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                )}
              />
            </div>

            {watchAllowPassword && (
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className="animate-in slide-in-from-top-1 duration-200"
                  >
                    <FieldLabel>Пароль для входу</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Мінімум 8 символів"
                        autoComplete="new-password"
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          type="button"
                          size="icon-xs"
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
                        >
                          {isPasswordVisible ? <Eye /> : <EyeOff />}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.error && (
                      <span className="text-[11px] text-destructive mt-1">
                        {fieldState.error.message}
                      </span>
                    )}
                  </Field>
                )}
              />
            )}

            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Роль</FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Користувач</SelectItem>
                      <SelectItem value="ADMIN">Адміністратор</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={!isDirty || !isValid || isLoading}
            className="mt-8 w-full"
          >
            {isLoading && <Loader className="animate-spin mr-2" />}
            {isLoading ? 'Створення' : 'Створити користувача'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
