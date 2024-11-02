import Link from 'next/link';
import Typography from '@/ui/common/Typography';
import { Links } from '@/constants';

export const revalidate = 86400; // 24 hours

export const metadata = {
  title: 'About | Yevhenii Buhor',
  description: 'Learn more about Yevhenii Buhor, a software engineer based in Berlin, Germany.',
};

const AboutPage = () => {
  return (
    <article>
      <Typography variant="h2" component="h2" fontStyle="italic">
        Hey, I&apos;m Yevhenii 👋
      </Typography>

      <br />

      <Typography variant="subtitle" component="p">
        I build web applications that work harder for your business. With a background across
        various of industries, including fintech, e-commerce, martech, and blockchain – I bring a
        fresh, strategic approach to every project, focusing on solutions that not only meet
        today&apos;s needs but also drive sustainable growth.
      </Typography>

      <Typography variant="subtitle" component="p">
        Whether it&apos;s creating a dynamic user experience, architecting resilient backend
        systems, or integrating the latest tech trends, I&apos;m always exploring what&apos;s next,
        incorporating emerging technologies to keep your product one step ahead.
      </Typography>

      <Typography variant="subtitle" component="p">
        Let&apos;s connect and make something exceptional. Feel free to connect with me on{' '}
        <Link href={Links.LINKED_IN} target="_blank">
          <b>LinkedIn</b>
        </Link>{' '}
        or reach out at{' '}
        <Link href={`mailto:${Links.EMAIL} `}>
          <b>{Links.EMAIL}</b>
        </Link>
        .
      </Typography>

      <br />

      <Link href="/articles">
        <Typography color="text-secondary">←&nbsp;&nbsp;&nbsp;Back to Articles</Typography>
      </Link>
    </article>
  );
};

export default AboutPage;
