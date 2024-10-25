'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { type SyntaxHighlighterProps as PrismProps, Prism } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SyntaxHighlighterProps extends PrismProps {}

const SyntaxHighlighter = ({ className, children, language, ...rest }: SyntaxHighlighterProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Prism
      style={resolvedTheme === 'light' ? oneLight : oneDark}
      language={language}
      PreTag="div"
      className={className}
      showLineNumbers
      {...rest}
    >
      {children}
    </Prism>
  );
};

export default SyntaxHighlighter;
