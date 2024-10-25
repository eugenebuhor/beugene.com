import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import Typography from '@/ui/common/Typography';
import SyntaxHighlighter from '@/ui/common/SyntaxHighlighter';
import styles from './MarkdownRenderer.module.css';

type MarkdownRendererProps = {
  content: string;
};

const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <div className={styles.markdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="h1" component="h1" {...rest} />;
          },
          h2: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="h2" component="h2" {...rest} />;
          },
          h3: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="h3" component="h3" {...rest} />;
          },
          h4: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="h4" component="h4" {...rest} />;
          },
          h5: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="h5" component="h5" {...rest} />;
          },
          h6: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="h6" component="h6" {...rest} />;
          },
          p: (props) => {
            const { color, node, ...rest } = props;
            return <Typography variant="body1" component="p" {...rest} />;
          },
          strong: (props) => {
            const { color, node, ...rest } = props;
            return <Typography weight="bold" component="strong" {...rest} />;
          },
          em: (props) => {
            const { color, node, ...rest } = props;
            return <Typography style={{ fontStyle: 'italic' }} component="em" {...rest} />;
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
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
