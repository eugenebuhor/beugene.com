import type { Tag } from '@prisma/client';
import { stringifyQueryString } from '@/utils/queryString';
import styles from '@/ui/articles/ArticleTags.module.css';
import { Skeleton, Tag as TagLink } from '@/ui/common';

type ArticleTagsProps = {
  tags: Tag[];
};

const ArticleTags = ({ tags }: ArticleTagsProps) => {
  const getRedirectLink = (tagName: string) => {
    const queryStringWithParams = stringifyQueryString({ tags: [tagName] });
    return `/articles/?${queryStringWithParams}`;
  };

  return (
    <nav className={styles.container}>
      {tags.map((tag) => (
        <TagLink key={tag.id} link={getRedirectLink(tag.name)} name={tag.name} />
      ))}
    </nav>
  );
};

export const ArticleTagsSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton width="6rem" height="1.5rem" />
      <Skeleton width="4rem" height="1.5rem" />
      <Skeleton width="4rem" height="1.5rem" />
      <Skeleton width="6rem" height="1.5rem" />
      <Skeleton width="4rem" height="1.5rem" />
    </div>
  );
};

export default ArticleTags;
