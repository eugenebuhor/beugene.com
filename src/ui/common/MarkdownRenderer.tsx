import type { ReactNode } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import Image from 'next/image';
import Link from 'next/link';
import { LuLink } from 'react-icons/lu';
import { slugify } from '@/utils/parseString';
import Typography from '@/ui/common/Typography';
import SyntaxHighlighter from '@/ui/common/SyntaxHighlighter';
import styles from './MarkdownRenderer.module.css';

type MarkdownRendererProps = {
  markdown: string;
  className?: string;
};

type HeadingProps = {
  content: ReactNode;
  children: ReactNode | ReactNode[];
  underline?: boolean;
};

const Heading = ({ content, children, underline }: HeadingProps) => {
  const slug = typeof content !== 'string' ? '' : slugify(content);

  const containerClassName = clsx(styles.heading, {
    [styles.underline]: underline,
  });

  return (
    <div className={containerClassName} id={slug}>
      {children}
      &nbsp;
      <Link href={'#' + slug} aria-label={`Permalink: ${content}`} className={styles.headingAnchor}>
        <Typography variant="body2" color="text-primary" component="span" lineHeight={0}>
          <LuLink />
        </Typography>
      </Link>
    </div>
  );
};

const MarkdownRenderer = ({ markdown, className }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      className={clsx(styles.markdown, className)}
      remarkPlugins={[remarkGfm, remarkGemoji]}
      components={{
        h1: (props) => {
          const { color, node, ...rest } = props;
          return (
            <Heading content={rest.children} underline>
              <Typography {...rest} variant="h1" component="h1" fontFamily="subtitle" />
            </Heading>
          );
        },
        h2: (props) => {
          const { color, node, ...rest } = props;

          return (
            <Heading content={rest.children} underline>
              <Typography {...rest} variant="h2" component="h2" fontFamily="subtitle" />
            </Heading>
          );
        },
        h3: (props) => {
          const { color, node, ...rest } = props;
          return (
            <Heading content={rest.children}>
              <Typography {...rest} variant="h3" component="h3" fontFamily="subtitle" />
            </Heading>
          );
        },
        h4: (props) => {
          const { color, node, ...rest } = props;
          return (
            <Heading content={rest.children}>
              <Typography {...rest} variant="h4" component="h4" fontFamily="subtitle" />
            </Heading>
          );
        },
        h5: (props) => {
          const { color, node, ...rest } = props;
          return (
            <Heading content={rest.children}>
              <Typography {...rest} variant="h5" component="h5" fontFamily="subtitle" />
            </Heading>
          );
        },
        h6: (props) => {
          const { color, node, ...rest } = props;
          return (
            <Heading content={rest.children}>
              <Typography {...rest} variant="h6" component="h6" fontFamily="subtitle" />
            </Heading>
          );
        },
        p: (props) => {
          const { color, node, ...rest } = props;
          return <Typography {...rest} variant="subtitle" component="p" />;
        },
        strong: (props) => {
          const { color, node, ...rest } = props;
          return <Typography {...rest} variant="subtitle" component="strong" weight="bold" />;
        },
        em: (props) => {
          const { color, node, ...rest } = props;
          return <Typography {...rest} variant="subtitle" component="em" />;
        },
        blockquote: (props) => {
          const { node, ...rest } = props;
          return <blockquote className={styles.blockquote} {...rest} />;
        },
        ul: (props) => {
          const { /* ordered, depth, */ node, ...rest } = props;
          return <ul className={styles.list} {...rest} />;
        },
        ol: (props) => {
          const { /* ordered, depth, */ node, ...rest } = props;
          return <ol className={styles.list} {...rest} />;
        },
        li: (props) => {
          const { /* checked, index, ordered, */ node, ...rest } = props;
          return <li className={styles.listItem} {...rest} />;
        },
        code: (props) => {
          const { node, className, children, ...rest } = props;
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : '';
          return language ? (
            <SyntaxHighlighter language={language} className={styles.codeBlock}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={styles.inlineCode} {...rest}>
              {children}
            </code>
          );
        },
        pre: (props) => {
          const { node, ...rest } = props;
          return <pre className={styles.pre} {...rest} />;
        },
        a: (props) => {
          const { node, href, title, ...rest } = props;
          const isExternal = href && !href.startsWith('/') && !href.startsWith('#');
          return (
            <Link
              href={href || ''}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={styles.link}
              {...rest}
            />
          );
        },
        img: (props) => {
          const { width, height, node, src, alt, title, ...rest } = props;
          return (
            <Image
              src={src || ''}
              alt={alt || ''}
              width={800}
              height={600}
              className={styles.image}
              {...rest}
            />
          );
        },
        hr: (props) => {
          const { node, ...rest } = props;
          return <hr className={styles.hr} {...rest} />;
        },
        table: (props) => {
          const { node, ...rest } = props;
          return <table className={styles.table} {...rest} />;
        },
        th: (props) => {
          const { align, node, ...rest } = props;
          return <th className={styles.tableHeader} {...rest} />;
        },
        td: (props) => {
          const { align, node, ...rest } = props;
          return <td className={styles.tableCell} {...rest} />;
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
