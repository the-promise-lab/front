import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import type { TypographyVariant } from './Typography';
import Typography from './Typography';

export interface TypingTextRef {
  skipToEnd: () => void;
  isTyping: boolean;
}

interface TypingTextProps {
  texts: string[];
  speed?: number;
  startDelay?: number;
  cursor?: boolean;
  playWhenVisible?: boolean;
  rootMargin?: string;
  className?: string;
  locale?: string;
  smooth?: boolean;
  variant?: TypographyVariant;
  onComplete?: () => void;
}

function splitGraphemes(text: string, locale = 'ko') {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const seg = new Intl.Segmenter(locale, { granularity: 'grapheme' });
    return Array.from(seg.segment(text), s => s.segment as string);
  }
  return Array.from(text);
}

const NEWLINE_CHAR = '\n' as const;

const TypingText = forwardRef<TypingTextRef, TypingTextProps>(
  (
    {
      texts,
      speed = 30,
      startDelay = 0,
      cursor = false,
      playWhenVisible = true,
      rootMargin = '0px',
      className,
      locale = 'ko',
      smooth = false,
      variant = 'dialogue-m',
      onComplete,
    },
    ref
  ) => {
    // 각 텍스트를 grapheme 단위로 분리하고, 각 텍스트 끝에 <br />을 위한 구분자 추가
    const units = useMemo(() => {
      const result: (string | typeof NEWLINE_CHAR)[] = [];
      texts.forEach((text, index) => {
        const graphemes = splitGraphemes(text, locale);
        result.push(...graphemes);
        // 마지막 텍스트가 아니면 구분자 추가
        if (index < texts.length - 1) {
          result.push(NEWLINE_CHAR);
        }
      });
      return result;
    }, [texts, locale]);
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState(!playWhenVisible);
    const containerRef = useRef<HTMLSpanElement | null>(null);
    const timer = useRef<number | null>(null);
    const started = useRef(false);
    const cursorControls = useAnimationControls();

    const isTyping = count < units.length;

    // 외부에서 ref를 통해 skipToEnd 및 isTyping 접근 가능
    useImperativeHandle(
      ref,
      () => ({
        skipToEnd: () => {
          if (timer.current) {
            window.clearTimeout(timer.current);
            timer.current = null;
          }
          setCount(units.length);
        },
        isTyping,
      }),
      [units.length, isTyping]
    );

    // 애니메이션 완료 시 onComplete 콜백 호출
    useEffect(() => {
      if (count >= units.length && units.length > 0 && onComplete) {
        onComplete();
      }
    }, [count, units.length, onComplete]);

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

    // 현재까지 타이핑된 units
    const visibleUnits = units.slice(0, Math.min(count, units.length));

    return (
      <Typography
        ref={containerRef}
        variant={variant}
        as='span'
        className={className}
      >
        {smooth ? (
          // smooth 모드: 모든 글자를 미리 렌더링하고 opacity 0, 제자리에서 fade-in 효과
          <span style={{ display: 'inline' }}>
            {units.map((unit, i) =>
              unit === NEWLINE_CHAR ? (
                <br key={i} />
              ) : (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i < count ? 1 : 0 }}
                  transition={{
                    duration: Math.min((speed / 500) * 2, 0.8),
                    ease: 'easeOut',
                  }}
                  style={{
                    display: unit === NEWLINE_CHAR ? 'block' : 'inline',
                  }}
                >
                  {unit}
                </motion.span>
              )
            )}
          </span>
        ) : (
          // 기본 모드: 문자 하나하나 추가하며 타이핑 효과 렌더링
          <span>
            {visibleUnits.map((unit, i) =>
              unit === NEWLINE_CHAR ? (
                <br key={i} />
              ) : (
                <span key={i}>{unit}</span>
              )
            )}
          </span>
        )}
        {cursor && (
          <motion.span
            aria-hidden
            animate={cursorControls}
            className='ml-[1px] h-[1em] w-[0.6ch] border-r-2 border-current motion-reduce:animate-none'
          />
        )}
      </Typography>
    );
  }
);

TypingText.displayName = 'TypingText';

export default TypingText;
