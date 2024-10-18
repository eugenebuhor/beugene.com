import { LayoutSectionContent } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Header.module.css';
import Typography from '@/ui/common/Typography';
import NavLink from '@/ui/common/NavLink';

const Header = () => {
  return (
    <Flex component="header" justifyContent="center" className={styles.header}>
      <LayoutSectionContent
        justifyContent="space-between"
        flexDirection="row"
        alignItems="flex-end"
        flexWrap="nowrap"
        className={styles.layoutContent}
      >
        <NavLink href="/">
          <Typography variant="h5" color="text-primary" weight="medium">
            Yevhenii Buhor
          </Typography>
        </NavLink>
        <Flex component="nav">
          <NavLink href="/about">
            <Typography variant="subtitle2" color="text-primary">
              About Me
            </Typography>
          </NavLink>
        </Flex>
      </LayoutSectionContent>
    </Flex>
  );
};

export default Header;
