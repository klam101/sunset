"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Control, Controller, FieldPath, FieldValues, } from "react-hook-form"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface DateInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label: string
  placeholder?: string
}

export default function DateInput<TFieldValues extends FieldValues>({ control, name, label, placeholder = "MM/DD/YYYY" }: DateInputProps<TFieldValues>) {
  return (
    <Controller name={name} control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={String(name)} className="form-label">
            {label}
          </FieldLabel>
          <Popover>
            <div className="relative">
              <Input
                id={String(name)}
                value={field.value ?? ""}
                onChange={(event) => field.onChange(event.target.value)}
                placeholder={placeholder}
                className="input-class pr-10"
                aria-invalid={fieldState.invalid}
              />
              <PopoverTrigger asChild>
                <Button type="button" variant="ghost" className="absolute right-2 top-1/2 size-8 -translate-y-1/2">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </div>
            <PopoverContent className="w-auto font-mc" align="end">
              <Calendar
                mode="single"
                selected = { field.value ? parse(field.value, "mm/dd/yyyy", new Date()) : undefined }
                onSelect = {(date) => field.onChange(date ? format(date, "MM/dd/yyyy") : "") }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="form-message" />
          )}
        </Field>
      )}
    />
  )
}