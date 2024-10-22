'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Flex from '@/ui/common/Flex';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
};

const PaginationControls = ({ currentPage, totalPages }: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Flex component="nav" flexDirection="row" gap={5} alignItems="center" justifyContent="center">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </Flex>
  );
};

export default PaginationControls;
