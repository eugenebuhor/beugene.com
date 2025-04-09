'use client';

import { useState, useEffect, useCallback, useTransition, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import clsx from 'clsx';
import type { Tag } from '@prisma/client';
import { IoClose as ClearIcon } from 'react-icons/io5';
import styles from './ArticlesSearch.module.css';
import { Button, Input, Tag as TagLink } from '@/ui/common';
import { parseSearchParams, stringifyQueryString } from '@/utils/queryString';
import SpinningLoader from '@/ui/common/SpinningLoader';

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
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState<string>(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialSelectedTags);

  const queryRef = useRef(query);
  const selectedTagsRef = useRef(selectedTags);

  const debouncedNavigate = useCallback(
    debounce((newQuery: string, newTags: string[]) => {
      startTransition(() => {
        const currentParams = parseSearchParams(Object.fromEntries(searchParams.entries()));

        const updatedParams: Record<string, string | string[]> = {
          ...currentParams,
          page: '1', // Reset to page 1 when search changes
        };

        if (newQuery) {
          updatedParams.q = newQuery;
        } else {
          delete updatedParams.q;
        }

        if (newTags.length > 0) {
          updatedParams.tags = newTags;
        } else {
          delete updatedParams.tags;
        }

        const queryStr = stringifyQueryString(updatedParams);
        router.push(`/articles?${queryStr}`);
      });
    }, 300),
    [searchParams, router, startTransition],
  );

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value.slice(0, MAX_QUERY_LENGTH);

    queryRef.current = newQuery;
    setQuery(newQuery);
    debouncedNavigate(newQuery, selectedTags);
  };

  const handleTagClick = (tagName: string) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter((tag) => tag !== tagName)
      : [...selectedTags, tagName];

    selectedTagsRef.current = newSelectedTags;
    setSelectedTags(newSelectedTags);
    debouncedNavigate(query, newSelectedTags);
  };

  const handleClearAllTags = () => {
    setSelectedTags([]);
    selectedTagsRef.current = [];
    debouncedNavigate(query, []);
  };

  const handleClearQuery = () => {
    setQuery('');
    queryRef.current = '';
    debouncedNavigate('', selectedTags);
  };

  useEffect(() => {
    if (initialQuery !== queryRef.current) {
      setQuery(initialQuery);
    }

    if (initialSelectedTags !== selectedTagsRef.current) {
      setSelectedTags(initialSelectedTags);
    }
  }, [initialQuery, initialSelectedTags]);

  useEffect(() => {
    return () => {
      debouncedNavigate.cancel();
    };
  }, [debouncedNavigate]);

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
        endAdornment={
          isPending ? (
            <SpinningLoader />
          ) : query?.trim()?.length ? (
            <Button
              size="small"
              variant="icon"
              className={styles.inputClearButton}
              onClick={handleClearQuery}
            >
              <ClearIcon />
            </Button>
          ) : null
        }
      />

      {tags.length > 0 && (
        <div className={clsx(styles.tagsContainer, isPending && styles.searching)}>
          {tags.map((tag) => (
            <TagLink
              key={tag.id}
              onClick={() => handleTagClick(tag.name)}
              name={tag.name}
              selected={selectedTags.includes(tag.name)}
              disabled={isPending}
              aria-label={`Filter articles by tag: ${tag.name}`}
            />
          ))}
          {selectedTags.length > 0 && (
            <Button
              className={styles.clearAllButton}
              onClick={handleClearAllTags}
              disabled={isPending}
              variant="text"
              size="small"
              aria-label="Clear all selected tags"
            >
              <ClearIcon />
              &nbsp;<>Clear All</>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
