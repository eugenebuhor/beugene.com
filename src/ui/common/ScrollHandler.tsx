'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollHandler() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const isPopState = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;

      if (isFirstLoad.current) {
        isFirstLoad.current = false;

        if (hash) {
          window.history.scrollRestoration = 'manual';
        } else {
          window.history.scrollRestoration = 'manual';
          window.scrollTo(0, 0);
        }
      } else if (isPopState.current) {
        isPopState.current = false;
        window.history.scrollRestoration = 'auto';
      } else {
        if (hash) {
          try {
            const element = document.querySelector(hash);
            if (element) {
              element.scrollIntoView();
            }
          } catch (e) {}
        } else {
          window.scrollTo(0, 0);
        }
        window.history.scrollRestoration = 'manual';
      }
    }
  }, [pathname]);

  return null;
}
