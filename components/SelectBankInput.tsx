import { Controller } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { BankDropdown } from "./BankDropdown";
import { cn } from "@/lib/utils";

const SelectBankInput = ({ control, accounts, label = "Missing Label", description, layout = "stacked", }: SelectBankInputProps) => {
  const isSplit = layout === "split";
  return (
    <Controller name="senderBank" control={control} render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid} className={cn( "flex w-full", isSplit ? "flex-row md:flex-row md:items-start md:justify-between" : "flex-col" )}>
        <FieldLabel className="form-label">{label}</FieldLabel>
        <FieldDescription className="form-description">{description}</FieldDescription>
        <BankDropdown accounts={accounts} value={field.value} onChange={field.onChange} otherStyles="!w-full" />
        {fieldState.error && ( <FieldError errors={[fieldState.error]} className="text-12 text-red-500" /> )}
      </Field>
    )}/>
  );
};

export default SelectBankInput;