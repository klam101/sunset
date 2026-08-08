"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const handleNavigation = (type: "prev" | "next") => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-between gap-3">
      <Button size="lg" variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleNavigation("prev")} disabled={Number(page) <= 1} >
        <ArrowLeftIcon className="mr-2" />
        Prev
      </Button>
      <p className="text-14 flex items-center px-2">
        Page {page} of {totalPages}
      </p>
      <Button size="lg" variant="ghost" className="p-0 hover:bg-transparent" onClick={() => handleNavigation("next")} disabled={Number(page) >= totalPages} >
        Next
        <ArrowRightIcon className="ml-2" />
      </Button>
    </div>
  );
};