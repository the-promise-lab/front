import { BACKGROUND_PORTAL_ID } from '@shared/background-portal';
import { useBackgroundStore } from '@shared/background';
import { cn } from '@shared/lib/utils';
import { useEffect, useState, type ReactNode } from 'react';

const DEFAULT_BACKGROUND =
  'linear-gradient(180deg, rgba(2,6,23,1) 0%, rgba(15,23,42,1) 50%, rgba(2,6,23,1) 100%)';

/**
 * 전역 배경 레이어
 * - useSetBackground 훅으로 설정된 배경을 렌더링
 * - z-0으로 고정되어 16:9 UI 레이어(z-10) 뒤에 위치
 * - fixed inset-0으로 화면 전체를 덮음
 */
export default function GlobalBackground({
  children,
}: {
  children: ReactNode;
}) {
  const {
    backgroundColor,
    backgroundImage,
    backgroundGradient,
    backgroundClassName,
  } = useBackgroundStore();
  const [readyToChangeBackground, setReadyToChangeBackground] = useState(false);
  const [prevBackgroundImage, setPrevBackgroundImage] = useState<string | null>(
    null
  );
  const [newBackgroundImage, setNewBackgroundImage] = useState<string | null>(
    null
  );
  useEffect(() => {
    if (backgroundImage) {
      setReadyToChangeBackground(true);
      setNewBackgroundImage(backgroundImage);
    }
  }, [backgroundImage]);

  const backgroundStyle = (() => {
    if (backgroundGradient) return { background: backgroundGradient };
    if (backgroundColor) return { backgroundColor };
    return { background: DEFAULT_BACKGROUND };
  })();

  return (
    <div
      className={cn('fixed inset-0 z-0', backgroundClassName)}
      style={backgroundStyle}
    >
      {newBackgroundImage && (
        <img
          src={newBackgroundImage}
          alt='background'
          className='absolute inset-0 object-cover object-center transition-opacity duration-200'
          style={{ opacity: readyToChangeBackground ? 1 : 0 }}
          onLoad={() => {
            setReadyToChangeBackground(true);
            setPrevBackgroundImage(newBackgroundImage);
          }}
        />
      )}
      {prevBackgroundImage && !readyToChangeBackground && (
        <img
          src={prevBackgroundImage}
          alt='background'
          className='absolute inset-0 object-cover object-center'
        />
      )}
      {children}
      <div id={BACKGROUND_PORTAL_ID} className='h-0 w-0' aria-hidden />
    </div>
  );
}
