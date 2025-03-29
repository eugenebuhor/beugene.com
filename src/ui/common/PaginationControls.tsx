'use client';

import type { MouseEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import styles from '@/ui/common/PaginationControls.module.css';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  className?: string;
};

const PaginationControls = ({ currentPage, totalPages, className }: PaginationControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (e: MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    navigateToPage(page);
  };

  const handleNextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) navigateToPage(currentPage + 1);
  };

  const handlePrevPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) navigateToPage(currentPage - 1);
  };

  const getPaginationItems = (currentPage: number, totalPages: number): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      if (startPage > 2) {
        pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <nav className={clsx(className, styles.container)} aria-label="Pagination">
      <ul className={styles.paginationList}>
        {/* Previous Button */}
        <li>
          <a
            href="#"
            onClick={handlePrevPage}
            className={clsx(styles.navButton, { [styles.disabled]: currentPage <= 1 })}
            aria-disabled={currentPage <= 1}
            aria-label="Previous Page"
            title="Previous Page"
          >
            &lt;
          </a>
        </li>

        {/* Page Items */}
        {paginationItems.map((item, index) => {
          if (item === '...') {
            return (
              <li key={`ellipsis-${index}`} className={styles.ellipsis}>
                &hellip;
              </li>
            );
          } else {
            const pageNumber = item as number;
            const isActive = pageNumber === currentPage;

            return (
              <li key={`page-${pageNumber}`}>
                <a
                  href={`?page=${pageNumber}`}
                  onClick={(e) => handlePageChange(e, pageNumber)}
                  className={clsx(styles.pageLink, { [styles.active]: isActive })}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`Page ${pageNumber}`}
                >
                  {pageNumber}
                </a>
              </li>
            );
          }
        })}

        {/* Next Button */}
        <li>
          <a
            href="#"
            onClick={handleNextPage}
            className={clsx(styles.navButton, { [styles.disabled]: currentPage >= totalPages })}
            aria-disabled={currentPage >= totalPages}
            aria-label="Next Page"
            title="Next Page"
          >
            &gt;
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationControls;
