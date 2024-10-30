'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollHandler() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      const isReload =
        navigationEntry && (navigationEntry as PerformanceNavigationTiming).type === 'reload';

      if (isReload) {
        const hash = window.location.hash;

        if (hash) {
          window.history.scrollRestoration = 'manual';
        } else {
          window.history.scrollRestoration = 'manual';
          window.scrollTo(0, 0);
        }
      } else {
        window.history.scrollRestoration = 'auto';
      }
    }
  }, [pathname]);

  return null;
}
