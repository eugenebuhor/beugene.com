'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import clsx from 'clsx';
import type { Tag } from '@prisma/client';
import styles from './ArticlesSearch.module.css';
import { Input, Tag as TagLink } from '@/ui/common';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';

interface ArticlesSearchProps {
  tags: Tag[];
  className?: string;
  initialQuery?: string;
  initialSelectedTags?: string[];
}

const MAX_QUERY_LENGTH = 50;

export default function ArticlesSearch({
  tags,
  className,
  initialQuery = '',
  initialSelectedTags = [],
}: ArticlesSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags);

  const debouncedUpdateQuery = useCallback(
    debounce((newQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newQuery) {
        params.set('q', newQuery);
      } else {
        params.delete('q');
      }

      // Reset to page 1 when search changes
      params.set('page', '1');

      router.push(`/articles?${params.toString()}`);
    }, 300),
    [searchParams, router],
  );

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.slice(0, MAX_QUERY_LENGTH);
    setQuery(newQuery);
    debouncedUpdateQuery(newQuery);
  };

  const debouncedHandleTagClick = useCallback(
    debounce((tagName: string) => {
      const newSelectedTags = selectedTags.includes(tagName)
        ? selectedTags.filter((tag) => tag !== tagName)
        : [...selectedTags, tagName];

      setSelectedTags(newSelectedTags);

      const currentParams = parseSearchParams(Object.fromEntries(searchParams.entries()));

      const updatedParams: Record<string, string | string[]> = {
        ...currentParams,
        page: '1', // Reset to page 1 when tags change
      };

      // Only add tags if we have any
      if (newSelectedTags.length > 0) {
        updatedParams.tags = newSelectedTags;
      } else {
        delete updatedParams.tags;
      }

      const queryStr = stringifyQueryString(updatedParams);

      router.push(`/articles?${queryStr}`);
    }, 300),
    [searchParams, router, selectedTags],
  );

  useEffect(() => {
    return () => {
      debouncedUpdateQuery.cancel();
      debouncedHandleTagClick.cancel();
    };
  }, [debouncedUpdateQuery, debouncedHandleTagClick]);

  return (
    <div className={clsx(styles.searchBox, className)}>
      <Input
        type="text"
        placeholder="Search articles..."
        value={query}
        onChange={handleQueryChange}
        className={styles.searchInput}
        fullWidth
        aria-label="Search articles"
      />

      {tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <TagLink
              key={tag.id}
              onClick={() => debouncedHandleTagClick(tag.name)}
              name={tag.name}
              selected={selectedTags.includes(tag.name)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
