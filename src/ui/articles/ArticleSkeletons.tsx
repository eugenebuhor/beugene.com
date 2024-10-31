import Skeleton from '@/ui/common/Skeleton';
import styles from './ArticleSkeleton.module.css';

const ArticleMetaSkeleton = () => {
  return (
    <>
      {/* Title */}
      <Skeleton width="100%" height="3rem" className={styles.articleMetaTitle} />

      {/* Publishing date and time to read */}
      <Skeleton width="30%" height="1.5rem" className={styles.articleMetaInfo} />
    </>
  );
};

const ArticleBackLinkSkeleton = () => {
  return <Skeleton width="20%" height="1.5rem" className={styles.articleBackLinkSkeleton} />;
};

const ArticleTagsSkeleton = () => {
  return (
    <div className={styles.articleTagsSkeleton}>
      <Skeleton width="10%" height="1.5rem" />
      <Skeleton width="10%" height="1.5rem" />
      <Skeleton width="10%" height="1.5rem" />
      <Skeleton width="10%" height="1.5rem" />
    </div>
  );
};

const ArticleCardSkeleton = () => {
  return (
    <div className={styles.articleCardSkeleton}>
      <ArticleMetaSkeleton />

      {/* Summary text */}
      <Skeleton width="100%" height="1.25rem" />
      <Skeleton width="100%" height="1.25rem" />
      <Skeleton width="80%" height="1.25rem" />

      {/* Tags */}
      <ArticleTagsSkeleton />
    </div>
  );
};

const ArticlesPreviewSkeleton = () => {
  return (
    <div className={styles.articlesPreviewSkeleton}>
      {/* Title */}
      <Skeleton width="40%" height="2.5rem" className={styles.centeredTitle} />

      {/* Preview Articles */}
      <div className={styles.previewArticlesContainer}>
        <Skeleton width="100%" height="7rem" className={styles.previewArticleTitle} />
        <Skeleton width="100%" height="7rem" className={styles.previewArticleTitle} />
        <Skeleton width="100%" height="7rem" className={styles.previewArticleTitle} />
      </div>
    </div>
  );
};

const ArticlePageSkeleton = () => {
  return (
    <div>
      <ArticleBackLinkSkeleton />
      <ArticleMetaSkeleton />

      {/* Article Content */}
      <div className={styles.articlePageContentContainer}>
        {/* Simulating paragraphs */}
        <Skeleton width="100%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="90%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="85%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="100%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="95%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="70%" height="1.5rem" className={styles.articleContentSkeleton} />

        {/* Simulating a list */}
        <ul className={styles.articleContentListSkeleton}>
          <Skeleton width="40%" height="1.5rem" className={styles.articleContentListItemSkeleton} />
          <Skeleton width="50%" height="1.5rem" className={styles.articleContentListItemSkeleton} />
          <Skeleton width="30%" height="1.5rem" className={styles.articleContentListItemSkeleton} />
        </ul>

        {/* Additional paragraph content */}
        <Skeleton width="100%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="85%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="90%" height="1.5rem" className={styles.articleContentSkeleton} />
        <Skeleton width="75%" height="1.5rem" className={styles.articleContentSkeleton} />
      </div>

      <ArticleTagsSkeleton />

      <ArticlesPreviewSkeleton />
    </div>
  );
};

export {
  ArticlePageSkeleton,
  ArticlesPreviewSkeleton,
  ArticleCardSkeleton,
  ArticleBackLinkSkeleton,
  ArticleMetaSkeleton,
  ArticleTagsSkeleton,
};
