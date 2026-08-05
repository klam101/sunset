"use client";

import { Controller, type Control } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "./ui/field";
import { BankDropdown } from "./BankDropdown";

const SelectBankInput = ({
  control,
  accounts,
  label = "Select Source Bank",
  description = "Select the bank account you want to transfer funds from",
}: SelectBankInputProps) => {
  return (
    <Controller name="senderBank" control={control} render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
        <div className="payment-transfer_form-item pb-6 pt-5">
          <div className="payment-transfer_form-content">
            <FieldLabel className="text-14 font-medium text-gray-700">{label}</FieldLabel>
            <FieldDescription className="text-12 font-normal text-gray-600">{description}</FieldDescription>
          </div>
          <div className="flex w-full flex-col">
            <BankDropdown accounts={accounts} value={field.value} onChange={field.onChange} otherStyles="!w-full" />
            {fieldState.error && ( <FieldError errors={[fieldState.error]} className="text-12 text-red-500" /> )}
          </div>
        </div>
      </Field>
    )}/>
  );
};

export default SelectBankInput;