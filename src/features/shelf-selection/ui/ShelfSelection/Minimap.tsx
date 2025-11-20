import { IconCloseButton } from '@features/event-phase/ui/kit/icon-button';
import { BackgroundPortal } from '@shared/background-portal';
import { cn } from '@shared/lib/utils';
import { useCallback, useState } from 'react';

const minimapThumbnail = '/images/minimap/minimap_thumbnail.png';
const minimap1024 = '/images/minimap/minimap@1024.png';
const minimap1920 = '/images/minimap/minimap@1920.png';
const minimapSrcSet = `${minimap1024} 1024w, ${minimap1920} 1920w`;

export default function Minimap() {
  const [opened, setOpened] = useState(false);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  return (
    <>
      <button
        type='button'
        className={cn(
          'absolute top-11 right-43',
          'aspect-square h-65 w-65 rounded-full',
          'border-yellow-1 border-[0.8px]'
        )}
        style={{
          backgroundImage: `url(${minimapThumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onClick={open}
      ></button>
      {opened ? (
        <BackgroundPortal>
          <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/30'>
            <div className='relative h-[100dvh] w-[100dvw]'>
              <img
                src={minimap1920}
                srcSet={minimapSrcSet}
                sizes='(max-width: 1024px) 90vw, 90vw'
                alt='전체 매장 미니맵'
                className='block h-full w-full rounded-4xl object-cover'
              />
              <IconCloseButton
                onClick={close}
                className='absolute top-11 right-11 z-[101]'
              />
            </div>
          </div>
        </BackgroundPortal>
      ) : null}
    </>
  );
}
