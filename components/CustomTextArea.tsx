import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";

const CustomTextarea = <TFieldValues extends FieldValues>({ control, name, label = "Missing Label", placeholder, description, layout = "stacked", }: CustomTextareaProps<TFieldValues>) => {
  const isSplit = layout === "split";
  return (
    <Controller name={name} control={control} render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid} className={cn( "flex w-full", isSplit ? "flex-row md:flex-row md:items-start md:justify-between" : "flex-col" )}>
        <FieldLabel htmlFor={name} className="form-label">{label}</FieldLabel>
        {description && ( <FieldDescription className="form-description">{description}</FieldDescription> )}
        <Textarea id={name} placeholder={placeholder} className="input-class min-h-[120px]" aria-invalid={fieldState.invalid} {...field} />
        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} className="form-message" /> )}
      </Field>
    )}/>
  );
};

export default CustomTextarea;