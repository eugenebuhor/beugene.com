import Link from 'next/link';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LayoutSection } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Footer.module.css';
import Typography from '@/ui/common/Typography';
import ThemeSwitch from '@/ui/common/ThemeSwitch';
import { Links } from '@/constants';

const Footer = () => {
  return (
    <Flex component="footer" justifyContent="center" className={styles.footer}>
      <LayoutSection component="div" gap={32} className={styles.layoutContent}>
        <Flex justifyContent="space-between" flexWrap="nowrap">
          <Flex component="nav" gap={15} alignItems="center">
            <Link href={Links.GITHUB} target="_blank" aria-label="GitHub">
              <Typography variant="subtitle1" color="text-primary" verticalAlign="middle">
                <FaGithub viewBox="0 0 496 496" />
              </Typography>
            </Link>
            <Link href={Links.LINKED_IN} target="_blank" aria-label="LinkedIn">
              <Typography variant="subtitle1" color="text-primary" verticalAlign="middle">
                <FaLinkedinIn viewBox="0 0 448 448" />
              </Typography>
            </Link>
          </Flex>
          <ThemeSwitch />
        </Flex>
        <Flex
          component="nav"
          justifyContent="space-between"
          alignItems="baseline"
          flexWrap="nowrap"
        >
          <Typography variant="caption" color="text-secondary" fontFamily="subtitle">
            Berlin, Germany
          </Typography>
          <Link href="/license">
            <Typography variant="caption" color="text-secondary" fontFamily="subtitle">
              Copyright © 2024
            </Typography>
          </Link>
        </Flex>
      </LayoutSection>
    </Flex>
  );
};

export default Footer;
