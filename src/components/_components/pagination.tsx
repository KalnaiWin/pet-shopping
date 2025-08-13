'use client';

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);// Copy the current query parameters from the URL
    params.set("page", page.toString()); // Update or add page to the query string
    router.push(`?${params.toString()}`); // Push the new URL using router.push()
  };

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-1 border rounded disabled:opacity-50 bg-blue-500 text-white ${currentPage <= 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        Prev
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-1 border rounded disabled:opacity-50 bg-blue-500 text-white ${currentPage >= totalPages ? "cursor-not-allowed" : "cursor-pointer"} `}
      >
        Next
      </button>
    </div>
  );
}
