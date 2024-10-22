import Link from 'next/link';
import Image from 'next/image';
import { LayoutSectionContent } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Header.module.css';
import Typography from '@/ui/common/Typography';

const Header = () => {
  return (
    <Flex component="header" justifyContent="center" className={styles.header}>
      <LayoutSectionContent
        justifyContent="space-between"
        flexDirection="row"
        alignItems="flex-end"
        flexWrap="nowrap"
        className={styles.layoutContent}
        component="nav"
      >
        <Link
          href="/"
          className={styles.nameLogoWrapper}
          rel="index"
          aria-label="homepage"
          title="Yevhenii Buhor"
        >
          <Image src="/name-logo-24.svg" alt="Yevhenii Buhor" fill priority />
        </Link>
        <Link href="/about" aria-label="about">
          <Typography variant="subtitle2" color="text-primary" fontFamily="subtitle">
            About Me
          </Typography>
        </Link>
      </LayoutSectionContent>
    </Flex>
  );
};

export default Header;
