import { LayoutContent } from '@/ui/common/Layouts';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Footer.module.css';
import Typography from '@/ui/common/Typography';
import NavLink from '@/ui/common/NavLink';

function Footer() {
  return (
    <Flex component="footer" justifyContent="center" className={styles.footer}>
      <LayoutContent
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="nowrap"
        className={styles.layoutContent}
      >
        <Typography variant="subtitle2">Berlin, Germany</Typography>
        <NavLink href="/license">
          <Typography variant="subtitle2" color="text-primary">
            Copyright © 2024
          </Typography>
        </NavLink>
      </LayoutContent>
    </Flex>
  );
}

export default Footer;
