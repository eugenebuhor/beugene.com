import Link from 'next/link';
import Image from 'next/image';
import { LayoutSection } from '@/ui/common/Layouts';
import styles from '@/ui/common/Header.module.css';
import Typography from '@/ui/common/Typography';

const Header = () => {
  return (
    <header className={styles.header}>
      <LayoutSection className={styles.layoutSection} component="nav">
        <Link
          href="/"
          className={styles.nameLogoWrapper}
          rel="index"
          aria-label="homepage"
          title="Yevhenii Buhor"
        >
          <Image draggable={false} src="/name-logo-24.svg" alt="Yevhenii Buhor" fill priority />
        </Link>
        <Link href="/about" prefetch>
          <Typography variant="body2" color="text-primary" fontFamily="subtitle">
            About Me
          </Typography>
        </Link>
      </LayoutSection>
    </header>
  );
};

export default Header;
