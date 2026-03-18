import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { RecordDTO } from '@/entities/record';
import {
  DragEndEvent,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  DndContext,
  closestCenter,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import RecordTableRow from './record-table-row';
import { useReorderRecordMutation } from '@/entities/record/api/record-admin-api';
import { getErrorMessage } from '@/shared/lib/get-error-message';

interface RecordTableProps {
  records: RecordDTO[];
  allowReorder: boolean;
}

export default function RecordTable({
  records,
  allowReorder,
}: RecordTableProps) {
  const [items, setItems] = useState<RecordDTO[]>(records);
  const [updateRecordsOrder] = useReorderRecordMutation();

  useEffect(() => {
    setItems(records);
  }, [records]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!allowReorder) return;
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((r) => r.id === active.id);
    const newIndex = items.findIndex((r) => r.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);
    const orderArray = newItems.map((r, index) => ({
      id: r.id,
      orderNo: index + 1,
    }));

    try {
      await updateRecordsOrder(orderArray).unwrap();
      toast.success('Порядок записів оновлено');
    } catch (error: unknown) {
      const msg = getErrorMessage(error);
      toast.error(msg || 'Помилка при оновленні порядку записів');
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((r) => r.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="border rounded-lg overflow-hidden bg-card">
          <Table className="table-fixed w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-10 text-center">#</TableHead>
                <TableHead className="w-22">Дата</TableHead>
                <TableHead className='min-w-22'>Назва запису</TableHead>
                <TableHead className="w-12 md:w-auto text-center">Статус</TableHead>
                <TableHead className="w-12 md:w-40 text-center">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground h-24"
                  >
                    Записів не знайдено
                  </TableCell>
                </TableRow>
              ) : (
                items.map((record) => (
                  <RecordTableRow
                    key={record.id}
                    record={record}
                    allowReorder={allowReorder}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SortableContext>
    </DndContext>
  );
}
