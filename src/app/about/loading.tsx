import Skeleton from '@/ui/common/Skeleton';

const Loading = () => {
  return (
    <>
      <Skeleton width="40%" height="2rem" style={{ marginBottom: '3rem' }} />

      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="50%" height="1rem" style={{ marginBottom: '1.5rem' }} />

      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="80%" height="1rem" style={{ marginBottom: '1.5rem' }} />

      <Skeleton width="100%" height="1rem" style={{ marginBottom: '0.5rem' }} />
      <Skeleton width="75%" height="1rem" style={{ marginBottom: '2.5rem' }} />

      <Skeleton width="25%" height="1.5rem" />
    </>
  );
};

export default Loading;
