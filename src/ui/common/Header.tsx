import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LayoutContent } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Header.module.css';
import Typography from '@/ui/common/Typography';
import NavLink from '@/ui/common/NavLink';
import { LINKS } from '@/constants';

function Header() {
  return (
    <Flex component="header" justifyContent="center" className={styles.header}>
      <LayoutContent
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="nowrap"
        className={styles.layoutContent}
      >
        <NavLink href="/">
          <Typography variant="h5" color="text-primary" weight="medium">
            Yevhenii Buhor
          </Typography>
        </NavLink>
        <Flex component="nav" gap={10} alignItems="baseline">
          <NavLink href="/about">
            <Typography variant="subtitle1" color="text-primary">
              About Me
            </Typography>
          </NavLink>
          <NavLink href={LINKS.LINKED_IN} target="_blank">
            <Typography variant="subtitle1" color="text-primary" verticalAlign="middle">
              <FaGithub viewBox="0 0 496 496" />
            </Typography>
          </NavLink>
          <NavLink href={LINKS.GITHUB} target="_blank">
            <Typography variant="subtitle1" color="text-primary" verticalAlign="middle">
              <FaLinkedinIn viewBox="0 0 448 448" />
            </Typography>
          </NavLink>
        </Flex>
      </LayoutContent>
    </Flex>
  );
}

export default Header;
