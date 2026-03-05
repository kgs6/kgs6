"use client"

import { Button } from "@/components/ui/button";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCrateSectionMutation } from "@/entities/section/api/section-admin-api";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Plus, Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";


export default function CreateSection() {
  const params = useParams();
  const year = params.year as string;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [createSection, { isLoading }] = useCrateSectionMutation();


  async function handleAddSection() {
    if (!title.trim()) {
      toast.error("Введіть назву розділу")
      return
    }

    try {
      await createSection({ year, title: title.trim() }).unwrap()

      setOpen(false)
      setTitle("")
      toast.success("Розділ створено успішно")
    } catch (e: unknown) {
      const msg = getErrorMessage(e) || "Помилка створення розділу"
      toast.error(msg)
    }
  }

  const handelOnSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleAddSection();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Додати розділ
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Додати розділ
          </DialogTitle>
          <DialogDescription>
            Додати розділ до записів інформації для акціонерів та стейкхолдерів.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handelOnSubmit}>
          <Input
            placeholder="Назва розділу"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
            >
              Скасувати
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleAddSection}
          >
            {isLoading
              ? <Loader className="animate-spin" />
              : <Plus />
            }
            Додати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}