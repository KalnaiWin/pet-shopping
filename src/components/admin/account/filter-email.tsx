"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

interface EmailFilterFormProps {
  initialValue?: string;
}

export default function EmailFilterForm({ initialValue = "" }: EmailFilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // giá trị hiện tại của query string
  // (searchParams là một ReadonlyURLSearchParams phản ánh window.location.search hiện tại)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const params = new URLSearchParams(searchParams.toString());
    
    if (e.target.value) {
      params.set('email', e.target.value);
    } else {
      params.delete('email');
    }
    
    router.replace(`?${params.toString()}`); // không tải lại toàn trang.
  };

  return (
    <Input
      placeholder="Filter Email . . ."
      className="w-1/4 bg-white shadow-md outline-none no-hover no-focus"
      defaultValue={initialValue}
      onChange={handleChange}
    />
  );
}