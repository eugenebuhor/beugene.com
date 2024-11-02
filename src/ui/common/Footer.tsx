import Link from 'next/link';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { LayoutSection } from '@/ui/common/Layouts';
import styles from '@/ui/common/Footer.module.css';
import Typography from '@/ui/common/Typography';
import ThemeSwitch from '@/ui/common/ThemeSwitch';
import { Links } from '@/constants';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <LayoutSection component="div" className={styles.layout}>
        <div className={styles.row}>
          <nav className={styles.socialLinks}>
            <Link href={Links.GITHUB} target="_blank" aria-label="GitHub" rel="noopener noreferrer">
              <Typography variant="h6" component="h6" color="text-primary" verticalAlign="middle">
                <FaGithub viewBox="0 0 496 496" />
              </Typography>
            </Link>
            <Link
              href={Links.LINKED_IN}
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
            >
              <Typography variant="h6" component="h6" color="text-primary" verticalAlign="middle">
                <FaLinkedinIn viewBox="0 0 448 448" />
              </Typography>
            </Link>
          </nav>
          <ThemeSwitch />
        </div>
        <div className={styles.row}>
          <Typography variant="caption" color="text-secondary" fontFamily="subtitle">
            Berlin, Germany
          </Typography>

          <Typography variant="caption" color="text-secondary" fontFamily="subtitle">
            © 2024 Yevhenii Buhor. All rights reserved.
          </Typography>
        </div>
      </LayoutSection>
    </footer>
  );
};

export default Footer;
