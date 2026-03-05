"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"

interface DatePickerProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
    const [open, setOpen] = React.useState(false)

    function handleDateSelect(newDate: Date | undefined) {
        if (!newDate) {
            setDate(undefined)
            return
        }
        const updated = new Date(newDate)
        if (date) {
            updated.setHours(date.getHours())
            updated.setMinutes(date.getMinutes())
            updated.setSeconds(date.getSeconds())
        } else {
            updated.setHours(0)
            updated.setMinutes(0)
            updated.setSeconds(0)
        }
        setDate(updated)
        setOpen(false)
    }

    function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!date) return
        const value = e.target.value
        if (!value) return
        const [hours, minutes, seconds] = value.split(":").map(Number)
        const updated = new Date(date)
        updated.setHours(hours)
        updated.setMinutes(minutes)
        updated.setSeconds(seconds || 0)
        setDate(updated)
    }

    return (
        <FieldGroup className="w-full sm:max-w-xs flex-row mr-auto">
            <Field className="flex-1">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between font-normal">
                            {date ? format(date, "PPP") : "Оберіть дату"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            defaultMonth={date}
                            onSelect={handleDateSelect}
                        />
                    </PopoverContent>
                </Popover>
            </Field>
            <Field className="w-full sm:w-40">
                <Input
                    type="time"
                    step="1"
                    value={date ? format(date, "HH:mm:ss") : ""}
                    onChange={handleTimeChange}
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden"
                />
            </Field>
        </FieldGroup>
    )
}
