import Link from 'next/link';
import { LayoutSection } from '@/ui/common/Layouts';
import styles from '@/ui/common/Header.module.css';
import Typography from '@/ui/common/Typography';
import LogoImage from '@/ui/common/LogoImage';

const Header = () => {
  return (
    <header className={styles.header}>
      <LayoutSection className={styles.layoutSection} component="nav">
        <Link href="/" className={styles.nameLogoWrapper} rel="index" aria-label="homepage">
          <LogoImage />
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
