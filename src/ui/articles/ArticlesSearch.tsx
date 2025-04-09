'use client';

import { useState, useEffect, useCallback, useTransition, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce, isEqual } from 'lodash';
import clsx from 'clsx';
import type { Tag } from '@prisma/client';
import { IoClose as ClearIcon } from 'react-icons/io5';
import styles from './ArticlesSearch.module.css';
import { Button, Input, Tag as TagLink, SpinningLoader } from '@/ui/common';
import {
  parseArticlesSearchParams,
  stringifyArticlesSearchParams,
} from '@/ui/articles/utils/articlesSearch';

interface ArticlesSearchProps {
  tags: Tag[];
  className?: string;
  initialQuery?: string;
  initialInputTags?: string[];
}

const MAX_QUERY_LENGTH = 50;

const ArticlesSearch = ({
  tags,
  className,
  initialQuery = '',
  initialInputTags = [],
}: ArticlesSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [inputQuery, setInputQuery] = useState<string>(initialQuery);
  const [inputTags, setInputTags] = useState<string[]>(initialInputTags);

  const navigateRef = useRef<(query: string, tags: string[]) => void>(() => {});
  const inputTagsRef = useRef<string[]>(inputTags);

  useEffect(() => {
    navigateRef.current = (query: string, tags: string[]) => {
      const currentParams = parseArticlesSearchParams(Object.fromEntries(searchParams.entries()));

      const updatedParams: Record<string, string | string[]> = {
        ...currentParams,
        page: '1', // Reset to page 1 when search changes
      };

      if (query) {
        updatedParams.q = query;
      } else {
        delete updatedParams.q;
      }

      if (tags.length > 0) {
        updatedParams.tags = tags;
      } else {
        delete updatedParams.tags;
      }

      const updatedQueryString = stringifyArticlesSearchParams(updatedParams);
      const currentQueryString = stringifyArticlesSearchParams(currentParams);

      if (currentQueryString !== updatedQueryString) {
        startTransition(() => {
          router.push(`/articles?${updatedQueryString}`);
        });
      }
    };
  }, [searchParams, router, startTransition]);

  const debouncedNavigate = useCallback(
    debounce((query: string, tags: string[]) => {
      if (navigateRef.current) {
        navigateRef.current(query, tags);
      }
    }, 300),
    [],
  );

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newQuery = value.length > MAX_QUERY_LENGTH ? value.slice(0, MAX_QUERY_LENGTH) : value;
    setInputQuery(newQuery);
    debouncedNavigate(newQuery.trim(), inputTags);
  };

  const handleTagClick = (tagName: string) => {
    const newInputTags = inputTags.includes(tagName)
      ? inputTags.filter((tag) => tag !== tagName)
      : [...inputTags, tagName];

    setInputTags(newInputTags);
    inputTagsRef.current = newInputTags;
    debouncedNavigate(inputQuery, newInputTags);
  };

  const handleClearAllTags = () => {
    setInputTags([]);
    inputTagsRef.current = [];
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

  useEffect(() => {
    // Update input tags if they change externally
    if (!isEqual(inputTagsRef.current, initialInputTags)) {
      setInputTags(initialInputTags);
      inputTagsRef.current = initialInputTags;
    }
  }, [initialInputTags]);

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
          ) : inputQuery?.length ? (
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
};

export default ArticlesSearch;
