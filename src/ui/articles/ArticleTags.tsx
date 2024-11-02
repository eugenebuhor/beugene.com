import Link from 'next/link';
import type { Tag } from '@prisma/client';
import Button from '@/ui/common/Button';
import Typography from '@/ui/common/Typography';
import { stringifyQueryString } from '@/utils/queryString';
import styles from '@/ui/articles/ArticleTags.module.css';
import Skeleton from '@/ui/common/Skeleton';

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
        <Link key={tag.id} className={styles.link} href={getRedirectLink(tag.name)}>
          <Button size="small" tabIndex={-1}>
            <Typography variant="body2" color="text-secondary" fontFamily="subtitle">
              {tag.name}
            </Typography>
          </Button>
        </Link>
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
