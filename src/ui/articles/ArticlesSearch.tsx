'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce } from 'lodash';
import clsx from 'clsx';
import type { Tag } from '@prisma/client';
import { IoClose as ClearIcon } from 'react-icons/io5';
import styles from './ArticlesSearch.module.css';
import { Button, Input, Tag as TagLink, SpinningLoader } from '@/ui/common';
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
  const [isPending, startTransition] = useTransition();

  const [inputQuery, setInputQuery] = useState<string>(initialQuery);
  const [inputTags, setInputTags] = useState<string[]>(initialSelectedTags);

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
    setInputQuery(newQuery);

    const newQueryTrimmed = newQuery.trim();
    const inputQueryTrimmed = inputQuery.trim();

    if (newQueryTrimmed !== inputQueryTrimmed) {
      debouncedNavigate(newQueryTrimmed, inputTags);
    }
  };

  const handleTagClick = (tagName: string) => {
    const newSelectedTags = inputTags.includes(tagName)
      ? inputTags.filter((tag) => tag !== tagName)
      : [...inputTags, tagName];

    setInputTags(newSelectedTags);
    debouncedNavigate(inputQuery, newSelectedTags);
  };

  const handleClearAllTags = () => {
    setInputTags([]);
    debouncedNavigate(inputQuery, []);
  };

  const handleClearQuery = () => {
    setInputQuery('');
    debouncedNavigate('', inputTags);
  };

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
        value={inputQuery}
        onChange={handleQueryChange}
        className={styles.searchInput}
        fullWidth
        aria-label="Search articles"
        endAdornment={
          isPending ? (
            <SpinningLoader />
          ) : inputQuery?.trim()?.length ? (
            <Button
              size="small"
              variant="icon"
              className={styles.inputClearButton}
              onClick={handleClearQuery}
              aria-label="Clear input query"
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
              selected={inputTags.includes(tag.name)}
              disabled={isPending}
              aria-label={`Filter articles by tag: ${tag.name}`}
            />
          ))}
          {inputTags.length > 0 && (
            <Button
              className={styles.clearAllButton}
              onClick={handleClearAllTags}
              disabled={isPending}
              variant="text"
              size="small"
              aria-label="Clear input tags"
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
