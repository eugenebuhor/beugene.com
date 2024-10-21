import type { Article, Tag } from '@prisma/client';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/articles/ArticleActions.module.css';
import Button from '@/ui/common/Button';
import Typography from '@/ui/common/Typography';
import Link from 'next/link';
import { stringifyQueryString } from '@/utils/query-string';

type ArticleDetailsProps = {
  slug: Article['slug'];
  tags: Tag[];
  likes: Article['likes'];
  views: Article['views'];
};

const ArticleActions = ({ tags }: ArticleDetailsProps) => {
  const getTagLink = (tagName: string) => {
    const queryStringWithParams = stringifyQueryString({ tags: [tagName] });
    return `/articles/?${queryStringWithParams}`;
  };

  return (
    <Flex flexDirection="column" component="article" gap={16}>
      <Flex gap={8}>
        {tags.map((tag) => (
          <Link key={tag.id} className={styles.link} href={getTagLink(tag.name)}>
            <Button size="small">
              <Typography variant="body2" color="text-secondary" fontFamily="subtitle">
                {tag.name}
              </Typography>
            </Button>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default ArticleActions;
