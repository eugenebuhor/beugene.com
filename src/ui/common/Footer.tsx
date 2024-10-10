import { LayoutContent } from '@/ui/common/Layouts';
import Typography from '@/ui/common/Typography';
import Flex from '@/ui/common/Flex';
import styles from '@/ui/common/Footer.module.css';

const Footer = () => {
  return (
    <Flex component="footer" justifyContent="center" className={styles.footer}>
      <LayoutContent>
        <Typography variant="caption">Footer</Typography>
      </LayoutContent>
    </Flex>
  );
};

export default Footer;
