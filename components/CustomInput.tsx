import { Controller, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const CustomInput = <TFieldValues extends FieldValues>({ control, type = "text", name, label, description, placeholder, layout = "stacked", }: CustomInputProps<TFieldValues>) => {
  const isSplit = layout === "split";
  return (
    <div className={cn( "flex w-full gap-2", isSplit ? "!flex-row md:flex-row md:items-start md:justify-between" : "flex-col" )}>
      <Controller name={name} control={control} render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={cn( "flex w-full", isSplit ? "flex-row md:flex-row md:items-start md:justify-between" : "flex-col" )}>
          <FieldLabel htmlFor={name} className="form-label">{label}</FieldLabel>
          {description && ( <FieldDescription className="form-description">{description}</FieldDescription> )}
          <Input id={name} type={type} placeholder={placeholder} className="input-class" aria-invalid={fieldState.invalid} {...field} />
          {fieldState.invalid && ( <FieldError errors={[fieldState.error]} className="form-message" /> )}
        </Field>
      )}/>
    </div>
  );
};

export default CustomInput;