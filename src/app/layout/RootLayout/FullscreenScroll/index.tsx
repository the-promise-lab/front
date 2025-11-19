import { useCallback, useEffect, type ReactNode } from 'react';

const SCROLL_RESET_RATIO = 0.75;
export default function FullscreenScroll({
  children,
}: {
  children: ReactNode;
}) {
  const handleScrollReset = useCallback(() => {
    const doc = document.documentElement;
    const scrollTop =
      window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
    const maxScrollable =
      (doc.scrollHeight || document.body.scrollHeight) -
      (doc.clientHeight || window.innerHeight);
    if (maxScrollable <= 0) return;
    const progress = scrollTop / maxScrollable;
    if (progress >= SCROLL_RESET_RATIO) {
      window.scrollTo({ top: 0 });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => handleScrollReset();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScrollReset]);

  return (
    <div
      aria-hidden
      className='relative h-[1000vh] select-none'
      onScroll={handleScrollReset}
    >
      {children}
    </div>
  );
}
