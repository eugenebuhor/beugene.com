import type { Tag } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/articles/ArticleTags.module.css';
import Button from '@/ui/common/Button';
import Typography from '@/ui/common/Typography';
import Link from 'next/link';
import { stringifyQueryString } from '@/utils/queryString';

type ArticleTagsProps = {
  tags: Tag[];
};

const ArticleTags = ({ tags }: ArticleTagsProps) => {
  const getRedirectLink = (tagName: string) => {
    const queryStringWithParams = stringifyQueryString({ tags: [tagName] });
    return `/articles/?${queryStringWithParams}`;
  };

  return (
    <Flex gap={8} component="nav" flexWrap="wrap">
      {tags.map((tag) => (
        <Link key={tag.id} className={styles.link} href={getRedirectLink(tag.name)}>
          <Button size="small" tabIndex={-1}>
            <Typography variant="subtitle2" color="text-secondary" fontFamily="subtitle">
              {tag.name}
            </Typography>
          </Button>
        </Link>
      ))}
    </Flex>
  );
};

export default ArticleTags;
