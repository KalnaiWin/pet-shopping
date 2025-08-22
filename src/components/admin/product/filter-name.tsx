"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

interface ProductNamelFilterFormProps {
  initialValue?: string;
}

export default function ProductNamelFilterForm({ initialValue = "" }: ProductNamelFilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // giá trị hiện tại của query string
  // (searchParams là một ReadonlyURLSearchParams phản ánh window.location.search hiện tại)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const params = new URLSearchParams(searchParams.toString());
    
    if (e.target.value) {
      params.set('productName', e.target.value);
    } else {
      params.delete('productName');
    }
    
    router.replace(`?${params.toString()}`); // không tải lại toàn trang.
  };

  return (
    <Input
      placeholder="Filter Name Product . . ."
      className="w-full bg-white shadow-md outline-none no-hover no-focus"
      defaultValue={initialValue}
      onChange={handleChange}
    />
  );
}