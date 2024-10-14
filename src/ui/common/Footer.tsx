import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LayoutContent } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Footer.module.css';
import Typography from '@/ui/common/Typography';
import NavLink from '@/ui/common/NavLink';
import ThemeSwitch from '@/ui/common/ThemeSwitch';
import { LINKS } from '@/constants';

function Footer() {
  return (
    <Flex component="footer" justifyContent="center" className={styles.footer}>
      <LayoutContent flexDirection="column" gap={20} className={styles.layoutContent}>
        <Flex justifyContent="space-between" flexWrap="nowrap">
          <Flex component="nav" gap={15} alignItems="center">
            <NavLink href={LINKS.GITHUB} target="_blank">
              <Typography variant="subtitle1" color="text-primary" verticalAlign="middle">
                <FaGithub viewBox="0 0 496 496" />
              </Typography>
            </NavLink>
            <NavLink href={LINKS.LINKED_IN} target="_blank">
              <Typography variant="subtitle1" color="text-primary" verticalAlign="middle">
                <FaLinkedinIn viewBox="0 0 448 448" />
              </Typography>
            </NavLink>
          </Flex>
          <ThemeSwitch />
        </Flex>
        <Flex justifyContent="space-between" flexWrap="nowrap">
          <Typography variant="caption" color="text-secondary">
            Berlin, Germany
          </Typography>
          <NavLink href="/license">
            <Typography variant="caption" color="text-secondary">
              Copyright © 2024
            </Typography>
          </NavLink>
        </Flex>
      </LayoutContent>
    </Flex>
  );
}

export default Footer;
