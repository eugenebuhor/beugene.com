'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { type SyntaxHighlighterProps as PrismProps, Prism } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Skeleton from '@/ui/common/Skeleton';

export type SyntaxHighlighterProps = PrismProps;

const SyntaxHighlighter = ({ className, children, language, ...rest }: SyntaxHighlighterProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const getNumberOfLines = (code: string | string[]) => {
    if (Array.isArray(code)) {
      return code.reduce((acc, line) => acc + line.split('\n').length, 0);
    }

    return code.split('\n').length;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Skeleton animation="pulse" width="100%" height={`${getNumberOfLines(children) * 1.5}rem`} />
    );
  }

  return (
    <Prism
      tabIndex={-1}
      style={resolvedTheme === 'light' ? oneLight : oneDark}
      language={language}
      PreTag="div"
      className={className}
      {...rest}
    >
      {children}
    </Prism>
  );
};

export default SyntaxHighlighter;
