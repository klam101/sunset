"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator, } from "@/components/ui/field"
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { createTransaction } from "@/lib/actions/transactions.actions";
import { createTransfer } from "@/lib/actions/dwolla.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./BankDropdown";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import CustomInput from "./CustomInput";
import CustomTextarea from "./CustomTextArea";
import SelectBankInput from "./SelectBankInput";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  shareableId: z.string().min(8, "Please select a valid shareable ID"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      shareableId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.shareableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // Create transfer
      const transfer = await createTransfer(transferParams);

      // Create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Card className="!px-1 w-full ring-0 shadow-none color-[#F9FAFB]">
      <CardContent>
        <form id="payment-transfer-form" onSubmit={form.handleSubmit(onSubmit)} noValidate className="flex flex-col">
          
          <div className="payment-transfer_form-details">
            <h2 className="text-18 font-semibold text-gray-900">Transfer details</h2>
            <p className="text-16 font-normal text-gray-600">Enter the details of therecipient</p>
          </div>
          <FieldSeparator />
          <FieldGroup className="gap-4">
            <SelectBankInput control={form.control} accounts={accounts} label="Select Source Bank" description="Select the bank account you want to transfer funds from" layout="stacked" />
            <CustomTextarea control={form.control} name="name" label="Transfer Note (Optional)" description="Please provide any additional information or instructions related to the transfer" placeholder="Write a short note here" />
          </FieldGroup>

          <div className="payment-transfer_form-details">
            <h2 className="text-18 font-semibold text-gray-900">Bank account details</h2>
            <p className="text-16 font-normal text-gray-600">Enter the bank account details of the recipient</p>
          </div>
          <FieldSeparator />
          <FieldGroup className="gap-4">
            <CustomInput control={form.control} name="email" type="email" label="Recipient&apos;s Email Address" placeholder="ex: johndoe@gmail.com"  />
            <CustomInput control={form.control} name="shareableId" label="Receiver&apos;s Plaid Sharable Id" placeholder="Enter the public account number" />
            <CustomInput control={form.control} name="amount" type="number" label="Amount" placeholder="ex: 5.00" />
          </FieldGroup>

          <div className="payment-transfer_btn-box">
            <Button type="submit" className="payment-transfer_btn">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
                </>
              ) : (
                "Transfer Funds"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentTransferForm;