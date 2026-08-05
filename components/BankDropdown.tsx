"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, } from "@/components/ui/select";
import { formUrlQuery, formatAmount } from "@/lib/utils";
import { CreditCardIcon } from "lucide-react";

export const BankDropdown = ({ accounts = [], value, onChange, otherStyles, }: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSelected] = useState(accounts[0]);

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id)!;

    setSelected(account);
    onChange(id);

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <Select defaultValue={selected.id} onValueChange={(value) => handleBankChange(value)} >
      <SelectTrigger className={`flex w-full p-4! gap-3 md:w-75 ${otherStyles}`} >
        <CreditCardIcon />
        <p className="line-clamp-1 w-full text-left">{selected.name}</p>
      </SelectTrigger>
      <SelectContent className={`w-full md:w-75 bg-white ${otherStyles}`} align="end" >
        <SelectGroup>
          <SelectLabel className="text-xs text-muted-foreground">Select a bank to display</SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem key={account.id} value={account.appwriteItemId} >
              <div className="flex flex-col ">
                <p className="text-16 font-medium">{account.name}</p>
                <p className="text-14 font-medium text-blue-600">{formatAmount(account.currentBalance)}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};