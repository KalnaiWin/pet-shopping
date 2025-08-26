"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

interface NamelFilterFormProps {
  nameId: string;
  title: string;
  initialValue?: string;
}

export default function FilterForm({
  initialValue = "",
  title,
  nameId,
}: NamelFilterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // giá trị hiện tại của query string
  // (searchParams là một ReadonlyURLSearchParams phản ánh window.location.search hiện tại)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams.toString());

    if (e.target.value) {
      params.set(`${nameId}`, e.target.value);
    } else {
      params.delete(`${nameId}`);
    }

    router.replace(`?${params.toString()}`); // không tải lại toàn trang.
  };

  return (
    <Input
      placeholder={`Filter Name ${title}  . . .`}
      className="w-full bg-white shadow-md outline-none no-hover no-focus"
      defaultValue={initialValue}
      onChange={handleChange}
    />
  );
}
