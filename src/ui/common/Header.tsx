import { LayoutContent } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Header.module.css';

const Header = () => {
  return (
    <Flex component="header" justifyContent="center" className={styles.header}>
      <LayoutContent className={styles.layoutContent}>Header</LayoutContent>
    </Flex>
  );
};

export default Header;
