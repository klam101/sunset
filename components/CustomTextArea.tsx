import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { Textarea } from "./ui/textarea";

const CustomTextarea = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
}: CustomTextareaProps<TFieldValues>) => {
  return (
    <Controller name={name} control={control} render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <FieldLabel htmlFor={name} className="form-label">{label}</FieldLabel>
        {description && ( <FieldDescription className="form-description">{description}</FieldDescription> )}
        <Textarea
          id={name}
          placeholder={placeholder}
          className="input-class min-h-[120px]"
          aria-invalid={fieldState.invalid}
          {...field}
        />
        {fieldState.invalid && ( <FieldError errors={[fieldState.error]} className="form-message" /> )}
      </Field>
    )}/>
  );
};

export default CustomTextarea;