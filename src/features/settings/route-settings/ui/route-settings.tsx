'use client';

import { useEffect } from 'react';
import { SettingsAdminDTO } from '@/entities/settings';
import { RouteSettingsFormValues, useRouteSettingsForm } from '../model/schema';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import toast from 'react-hot-toast';
import { FieldLabel } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import VisibilityButton from '@/components/shared/visibility-button';
import ActivityStatus from '@/components/shared/activity-status';
import { useUpdateSettingsRouteMutation } from '@/entities/settings/api/settings-admin-api';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';

interface RouteSettingsProps {
  settings: SettingsAdminDTO;
}

export default function RouteSettings({ settings }: RouteSettingsProps) {
  const currentRoute = settings.routes[0];

  const form = useRouteSettingsForm(currentRoute?.title || '');
  const { isDirty } = form.formState;

  const [updateSettingsRoute, { isLoading }] = useUpdateSettingsRouteMutation();

  // Синхронізація форми, якщо дані змінилися зовні (наприклад, після мутації)
  useEffect(() => {
    if (currentRoute?.title) {
      form.reset({ title: currentRoute.title });
    }
  }, [currentRoute?.title, form]);

  const onSubmit = async (data: RouteSettingsFormValues) => {
    if (!currentRoute) return;

    try {
      const route = {
        routeId: currentRoute.id,
        routeTitle: data.title,
        routeIsActive: currentRoute.isActive,
      };

      await updateSettingsRoute(route).unwrap();

      // Скидаємо стан "брудної" форми до нових значень
      form.reset({ title: data.title });
      toast.success('Налаштування оновлено');
    } catch (error: unknown) {
      const msg = getErrorMessage(error) || 'Невідома помилка';
      toast.error(msg);
    }
  };

  const handleToggleActive = async () => {

    if (!currentRoute) return;

    try {
      const route = {
        routeId: currentRoute.id,
        routeTitle: currentRoute.title,
        routeIsActive: !currentRoute.isActive,
      };

      await updateSettingsRoute(route).unwrap();
       form.reset({ title: currentRoute.title });
      toast.success('Статус сторінки оновлено');
    } catch (e: unknown) {
      const msg = getErrorMessage(e) || 'Помилка зміни статусу розділу';
      toast.error(msg);
    }
  };

  if (!currentRoute) return null;

  return (
    <div className="mt-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Сторінки</h1>

      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-2"> 
          <FieldLabel className="mb-0">Назва сторінки</FieldLabel>
          <ActivityStatus isActive={currentRoute.isActive} />
        </div>

        <div className="flex gap-2 items-start w-full">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
            <Controller
              name="title"
              control={form.control}
              render={({ field }) => (
                <Input {...field} placeholder="Введіть..." className="w-full" />
              )}
            />

            <div className="w-full md:flex md:justify-end mt-4">
              <Button
                type="submit"
                disabled={!isDirty || isLoading}
                className={`${!isDirty ? 'hidden' : ''} w-full md:w-auto`}
              >
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Зберегти
              </Button>
            </div>
          </form>

          <VisibilityButton
            isActive={currentRoute.isActive}
            handleToggleActive={() => handleToggleActive()}
            isIconOnly
            isLoading={isLoading}
            className="shrink-0 h-9"
          />
        </div>
      </div>
    </div>
  );
}
