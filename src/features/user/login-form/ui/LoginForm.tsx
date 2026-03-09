"use client";

import toast from "react-hot-toast";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import {LoginFormValues, useLoginForm} from "@/features/user/login-form/model/schema";
import {Field, FieldGroup, FieldLabel} from "@/components/ui/field";
import {Controller} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react";
import {useRouter} from "next/navigation";
import {ADMIN_PAGES} from "@/shared/config/pages.config";
import {useLoginMutation} from "@/entities/user/api/user-api";


export default function LoginForm() {
  const router = useRouter();
  const form = useLoginForm();
  const [login, {isLoading}] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      toast.success("Успішний вхід");
      router.push(ADMIN_PAGES.DASHBOARD);
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || "Невідома помилка";
      toast.error(msg);
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name={"email"}
            control={form.control}
            render={({field, fieldState}) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  disabled={isLoading}
                  type="email"
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />
          <Controller
            name={"password"}
            control={form.control}
            render={({field, fieldState}) => (
              <Field
                data-invalid={fieldState.invalid}
              >
                <FieldLabel>Пароль</FieldLabel>
                <Input
                  {...field}
                  disabled={isLoading}
                  type="password"
                  placeholder={"Введіть..."}
                  aria-invalid={fieldState.invalid}
                />
              </Field>
            )}
          />

          <Button type="submit" disabled={isLoading} className={"mt-4 w-full md:w-auto"}>
            {isLoading && <Loader className={"animate-spin"}/>}
            Увійти
          </Button>
        </FieldGroup>
      </form>
    </div>
  )
}