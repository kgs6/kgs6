import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { useSortable } from '@dnd-kit/sortable';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/shared/lib/get-error-message';
import {
  Eye,
  EyeOff,
  GripVertical,
  MoreHorizontalIcon,
  Pencil,
} from 'lucide-react';
import ActivityStatus from '@/components/shared/activity-status';
import VisibilityButton from '@/components/shared/visibility-button';
import Link from 'next/link';
import DeletionAlert from '@/components/shared/deletion-alert';
import { CSS } from '@dnd-kit/utilities';
import {
  useDeleteRecordMutation,
  useToggleRecordActiveMutation,
} from '@/entities/record/api/record-admin-api';
import { ADMIN_PAGES } from '@/shared/config/pages.config';
import { useParams } from 'next/navigation';
import { RecordDTO } from '@/entities/record/model/types';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RecordTableRowProps {
  record: RecordDTO;
  allowReorder?: boolean;
}

export default function RecordTableRow({
  record,
  allowReorder,
}: RecordTableRowProps) {
  const { year, section } = useParams() as { year: string; section: string };
  const [toggleActive, { isLoading: isToggleLoading }] =
    useToggleRecordActiveMutation();
  const [deleteRecord] = useDeleteRecordMutation();
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: record.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isMobile = useIsMobile();

  const handleDelete = async () => {
    try {
      await deleteRecord(record.id).unwrap();
      toast.success('Запис видалено');
    } catch (e) {
      toast.error(getErrorMessage(e) || 'Помилка видалення');
    }
  };

  const handleToggleActive = async () => {
    try {
      await toggleActive(record.id).unwrap();
      toast.success(record.isActive ? 'Запис приховано' : 'Запис активовано');
    } catch (e) {
      toast.error(getErrorMessage(e) || 'Помилка зміни статусу');
    }
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="hover:bg-muted/50 cursor-pointer bg-background"
    >
      <TableCell className="w-12">
        <div className="flex items-center justify-center">
          {allowReorder && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none p-1 hover:bg-accent rounded"
            >
              <GripVertical size={18} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </TableCell>

      <TableCell className="w-22 whitespace-nowrap overflow-hidden">
        {record.publishedAt
          ? new Date(record.publishedAt).toLocaleDateString('uk-UA')
          : '—'}
      </TableCell>

      <TableCell className="max-w-0">
        <div className="truncate block w-full" title={record.title}>
          {record.title}
        </div>
      </TableCell>

      <TableCell className="text-center w-28">
        <ActivityStatus isActive={record.isActive} />
      </TableCell>

      <TableCell className="text-center w-40">
        {isMobile ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={ADMIN_PAGES.EDIT_RECORD(year, section, record.id)}>
                <DropdownMenuItem>
                  <Pencil className="me-2" />
                  Редагувати
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleToggleActive}>
                {record.isActive ? (
                  <>
                    <EyeOff className="me-2" />
                    Приховати
                  </>
                ) : (
                  <>
                    <Eye className="me-2" />
                    Відобразити
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" asChild>
                <DeletionAlert
                  onDelete={handleDelete}
                  alertTitle="Видалити запис?"
                  alertDescription="Ця дія видалить запис та всі пов'язані файли без можливості відновлення."
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <VisibilityButton
              isActive={record.isActive}
              handleToggleActive={handleToggleActive}
              isIconOnly
              isLoading={isToggleLoading}
            />
            <Link href={ADMIN_PAGES.EDIT_RECORD(year, section, record.id)}>
              <Button size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeletionAlert
              onDelete={handleDelete}
              isIconButton
              alertTitle="Видалити запис?"
              alertDescription="Ця дія видалить запис та всі пов'язані файли без можливості відновлення."
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
