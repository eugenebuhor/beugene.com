import Link from 'next/link';
import Typography from '@/ui/common/Typography';
import { Links } from '@/constants';

export const revalidate = 86400; // 24 hours

export const metadata = {
  title: 'About | Yevhenii Buhor | Web Development Insights',
  description:
    'Learn about Yevhenii Buhor’s journey in tech, his approach to web development, and the values that drive his work in creating impactful digital experiences.',
  keywords: [
    'beugene',
    'Yevhenii Buhor',
    'Eugene Buhor',
    'Eugene Bugor',
    'Buhor',
    'Bugor',
    'Бугор',
    'Fullstack',
    'Fullstack Developer',
    'Senior Fullstack Developer',
    'Frontend',
    'Frontend Developer',
    'Senior Frontend Developer',
    'Software Engineer',
    'Senior Software Engineer',
    'Berlin',
    'Germany',
    'blog',
  ],
  openGraph: {
    title: 'About | Yevhenii Buhor | Web Development Insights',
    description:
      'Learn about Yevhenii Buhor’s journey in tech, his approach to web development, and the values that drive his work in creating impactful digital experiences.',
    url: `https://${process.env.VERCEL_URL}/about`,
    type: 'website',
    images: [
      {
        url: `https://${process.env.VERCEL_URL}/default-og-image.png`,
        width: 1200,
        height: 630,
        alt: 'About Yevhenii Buhor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Yevhenii Buhor | Web Development Insights',
    description:
      'Learn about Yevhenii Buhor’s journey in tech, his approach to web development, and the values that drive his work in creating impactful digital experiences.',
    images: `https://${process.env.VERCEL_URL}/default-og-image.png`,
  },
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
        various industries, including fintech, e-commerce, martech, and blockchain – I bring a
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
        <Link href={Links.LINKED_IN} target="_blank" rel="noopener noreferrer">
          <b>LinkedIn</b>
        </Link>{' '}
        or reach out at{' '}
        <Link href={`mailto:${Links.EMAIL} `} rel="noopener noreferrer">
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
