import React from 'react'
import { Field, FieldError, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Control, Controller, FieldPath, Form } from 'react-hook-form'
import * as z from "zod"
import { authFormSchema } from '@/lib/utils'

interface CustomInput {
  control: Control<z.infer<typeof authFormSchema>>
  name: FieldPath<z.infer<typeof authFormSchema>>
  label: string
  placeholder: string
}

const CustomInput = ({ control, name, label, placeholder } : CustomInput) => {
  return (
    <Controller name={name} control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={name} className="form-label">
            {label}
          </FieldLabel>
          <Input
            id={name}
            type={name === "password" ? "password" : "text"}
            placeholder={placeholder}
            className="input-class"
            aria-invalid={fieldState.invalid}
            {...field}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} className="form-message" />}
        </Field>
      )}
    />
  )
}

export default CustomInput