"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {SectionDTO} from "@/entities/section";
import {SectionTableRow} from "@/features/section/section-list/section-table";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import toast from "react-hot-toast";
import {useUpdateSectionsOrderMutation} from "@/entities/section/api/section-admin-api";
import {useEffect, useState} from "react";

interface SectionTableProps {
  sections: SectionDTO[]
  allowReorder: boolean
}

export default function SectionTable({sections, allowReorder}: SectionTableProps) {
  const [updateSectionsOrder] = useUpdateSectionsOrderMutation();
  const [items, setItems] = useState(sections);

  useEffect(() => {
    setItems(sections);
  }, [sections]);

  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {distance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {delay: 150, tolerance: 5}})
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!allowReorder) return;
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(s => s.id === active.id);
    const newIndex = items.findIndex(s => s.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);

    setItems(newItems);
    const orderArray = newItems.map((s, index) => ({id: s.id, orderNo: index + 1}));

    try {
      await updateSectionsOrder(orderArray).unwrap();
      toast.success("Порядок оновлено");
    } catch {
      setItems(sections);
      toast.error("Помилка при збереженні");
    }
  };

  

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map(s => s.id)} strategy={verticalListSortingStrategy}>
        <div className={"border rounded-lg overflow-hidden"}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead>Назва розділу</TableHead>
                <TableHead>Записів</TableHead>
                <TableHead className="text-center w-28">Статус</TableHead>
                <TableHead className="text-center w-36">Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground h-24">
                    Нічого не знайдено
                  </TableCell>
                </TableRow>
              ) : (
                items.map((sectionItem) => (
                  <SectionTableRow section={sectionItem} key={sectionItem.id} allowReorder={allowReorder}/>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </SortableContext>
    </DndContext>
  )
}