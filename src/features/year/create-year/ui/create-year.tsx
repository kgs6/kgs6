"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Loader, Plus} from "lucide-react";
import YearSelect from "@/components/shared/select-year";
import {SyntheticEvent, useState} from "react";
import toast from "react-hot-toast";
import {getErrorMessage} from "@/shared/lib/get-error-message";
import {useCreateYearMutation} from "@/entities/year/api/year-admin-api";


export default function CreateYear() {
  const [createYear, {isLoading}] = useCreateYearMutation();

  const [year, setYear] = useState<string>(String(new Date().getFullYear()));
  const [open, setOpen] = useState(false);

  async function handleAddYear() {
    if (!year || year.length !== 4) return;

    try {
      await createYear(Number(year)).unwrap();

      setYear(String(new Date().getFullYear()));
      setOpen(false);
      toast.success("Рік створено успішно");
    } catch (e: unknown) {
      const msg = getErrorMessage(e);
      toast.error(msg);
    }
  }

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddYear();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus/>
          Додати рік
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати рік</DialogTitle>
          <DialogDescription>
            Додати рік до записів інформації для акціонерів та стейкхолдерів.
          </DialogDescription>
          <div className="my-2">
            <YearSelect year={year} onYearChange={setYear}/>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">Скасувати</Button>
            </DialogClose>
            <Button type="button" onClick={handleAddYear}>
              {isLoading ? <Loader className="h-4 w-4 animate-spin"/> : <Plus className="h-4 w-4"/>}
              Додати
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}