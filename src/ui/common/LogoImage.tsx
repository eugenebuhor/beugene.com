import styles from '@/ui/common/LogoImage.module.css';

const LogoImage = () => {
  return (
    <div
      title="Yevhenii Buhor"
      aria-label="Yevhenii Buhor"
      role="img"
      draggable="false"
      data-nimg="fill"
      className={styles.logoImage}
    />
  );
};

export default LogoImage;
