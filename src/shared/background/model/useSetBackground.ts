import { useEffect } from 'react';
import { useBackgroundStore } from './useBackgroundStore';

interface BackgroundConfig {
  color?: string;
  image?: string;
  gradient?: string;
  className?: string;
}

interface UseSetBackgroundOptions {
  cleanup?: boolean; // 기본값 true - 언마운트 시 배경 리셋
}

/**
 * 페이지/컴포넌트의 배경을 설정하는 훅
 *
 * @example
 * // 선언형: 마운트 시 배경 설정
 * useSetBackground({ color: '#1e293b' });
 *
 * @example
 * // Tailwind 클래스네임 사용
 * useSetBackground({ className: 'bg-black bg-gradient-to-b from-slate-900 to-slate-950' });
 *
 * @example
 * // 명령형: 이벤트 핸들러에서 배경 변경
 * const { setBackgroundImage } = useSetBackground();
 * const handleClick = () => setBackgroundImage('/new-bg.png');
 *
 * @example
 * // cleanup 없이 배경 유지
 * useSetBackground({ image: '/bg.png' }, { cleanup: false });
 */
export function useSetBackground(
  initialBackground?: BackgroundConfig,
  options: UseSetBackgroundOptions = {}
) {
  const { cleanup = true } = options;

  const store = useBackgroundStore();

  useEffect(() => {
    if (!initialBackground) return;

    // 우선순위: image > gradient > color
    if (initialBackground.image) {
      store.setBackgroundImage(initialBackground.image);
    } else if (initialBackground.gradient) {
      store.setBackgroundGradient(initialBackground.gradient);
    } else if (initialBackground.color) {
      store.setBackgroundColor(initialBackground.color);
    }

    // className은 독립적으로 적용
    if (initialBackground.className !== undefined) {
      store.setBackgroundClassName(initialBackground.className);
    }

    if (cleanup) {
      return () => {
        store.resetBackground();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialBackground?.color,
    initialBackground?.image,
    initialBackground?.gradient,
    initialBackground?.className,
    cleanup,
  ]);

  // 명령형 API 반환
  return {
    setBackgroundColor: store.setBackgroundColor,
    setBackgroundImage: store.setBackgroundImage,
    setBackgroundGradient: store.setBackgroundGradient,
    setBackgroundClassName: store.setBackgroundClassName,
    resetBackground: store.resetBackground,
  };
}
