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
      <SelectTrigger className={`flex p-4! gap-3 ${otherStyles}`} >
        <CreditCardIcon />
        <p className="line-clamp-1 w-full text-left">{selected.name}</p>
      </SelectTrigger>
      <SelectContent className={`${otherStyles}`} alignItemWithTrigger >
        <SelectGroup className="p-1!" >
          {accounts.map((account: Account) => (
            <SelectItem key={account.id} value={account.appwriteItemId} >
              <div className="flex items-center gap-1 whitespace-nowrap">
                <span>{account.name}:</span> <span className="text-amber-600">{formatAmount(account.currentBalance)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};