import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

type TypingTextProps = {
  texts: string[];
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  playWhenVisible?: boolean;
  rootMargin?: string;
  className?: string;
  locale?: string;
};

function splitGraphemes(text: string, locale = 'ko') {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter(locale, { granularity: 'grapheme' });
    return Array.from(seg.segment(text), s => s.segment as string);
  }
  return Array.from(text);
}

export default function TypingText({
  texts,
  speed = 70,
  startDelay = 0,
  cursor = false,
  playWhenVisible = true,
  rootMargin = '0px',
  className,
  locale = 'ko',
}: TypingTextProps) {
  // 모든 텍스트를 개행으로 연결하여 하나의 문자열로 만들기
  const fullText = useMemo(() => texts.join('\n'), [texts]);
  const units = useMemo(
    () => splitGraphemes(fullText, locale),
    [fullText, locale]
  );
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(!playWhenVisible);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const timer = useRef<number | null>(null);
  const started = useRef(false);
  const cursorControls = useAnimationControls();

  // 보일 때만 재생
  useEffect(() => {
    if (!playWhenVisible) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.some(e => e.isIntersecting);
        setIsPlaying(visible);
      },
      { root: null, rootMargin, threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [playWhenVisible, rootMargin]);

  // 타이핑 진행
  useEffect(() => {
    if (!isPlaying || units.length === 0) {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
      return;
    }

    const tick = () => {
      setCount(c => Math.min(c + 1, units.length));
      timer.current = window.setTimeout(() => {
        setCount(c => {
          // 전부 타이핑 완료 시 멈춤
          if (c >= units.length) {
            if (timer.current) window.clearTimeout(timer.current);
            timer.current = null;
            return c;
          }
          return c;
        });
        if (count < units.length) tick();
      }, speed);
    };

    const delayId = window.setTimeout(
      () => {
        // 이미 끝나있으면 재시작 안 함
        if (count < units.length) tick();
      },
      started.current ? 0 : startDelay
    );

    started.current = true;

    return () => {
      window.clearTimeout(delayId);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, units, speed, startDelay]);

  // 커서 깜빡임
  useEffect(() => {
    if (!cursor) return;
    let mounted = true;
    (async () => {
      while (mounted) {
        await cursorControls.start(
          { opacity: 0 },
          { duration: 0.5, ease: 'linear' }
        );
        await cursorControls.start(
          { opacity: 1 },
          { duration: 0.5, ease: 'linear' }
        );
      }
    })();
    return () => {
      mounted = false;
    };
  }, [cursor, cursorControls]);

  const out = units.slice(0, Math.min(count, units.length)).join('');

  return (
    <span
      ref={containerRef}
      className={['inline-flex items-end', className].filter(Boolean).join(' ')}
      aria-live='polite'
      role='status'
    >
      <span style={{ whiteSpace: 'pre-line' }}>{out}</span>
      {cursor && (
        <motion.span
          aria-hidden
          animate={cursorControls}
          className='ml-[1px] h-[1em] w-[0.6ch] border-r-2 border-current motion-reduce:animate-none'
        />
      )}
    </span>
  );
}
