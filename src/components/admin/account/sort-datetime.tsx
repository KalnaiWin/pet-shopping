'use client';

import { TableHead } from "@/components/ui/table";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface SortableHeaderProps {
  column: string;
  currentSort: string;
  currentOrder: 'asc' | 'desc';
  children: React.ReactNode;
}

export function SortDatetime({ column, currentSort, currentOrder, children }: SortableHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSort = () => {
    const params = new URLSearchParams(searchParams);
    
    if (currentSort === column) {
      params.set('sortOrder', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortBy', column);
      params.set('sortOrder', 'desc');
    }
    
    router.push(`?${params.toString()}`);
  };

  const isActive = currentSort === column;
  const iconClass = isActive && currentOrder === 'asc' ? 'rotate-180' : '';

  return (
    <TableHead 
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50" 
      onClick={handleSort}
    >
      <p>{children}</p>
      <Image
        src="/assets/up-down.png"
        alt="Sort Arrow"
        width={15}
        height={15}
        className={iconClass}
      />
    </TableHead>
  );
}