import { IconCloseButton } from '@shared/ui/icon-button';
import { BackgroundPortal } from '@shared/background-portal';
import { cn } from '@shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement, useCallback, useMemo, useState } from 'react';
import type { MinimapSection } from '../../model/types';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { useShallow } from 'zustand/react/shallow';
import { useButtonClickSfx } from '@shared/audio';
import { getObjectUrlSelector, useAssetStore } from '@shared/preload-assets';

const minimapThumbnail = '/image/minimap/minimap_thumbnail.png';
const minimap1024 = '/image/minimap/minimap@1024.png';
const minimap1920 = '/image/minimap/minimap@1920.png';
const minimapSrcSet = `${minimap1024} 1024w, ${minimap1920} 1920w`;

interface MinimapProps {
  sections: MinimapSection[];
  onSectionClick: (sectionCode: string) => void;
  currentShelfCode: string | null;
}

export default function Minimap({
  sections,
  onSectionClick,
  currentShelfCode,
}: MinimapProps) {
  const [opened, setOpened] = useState(false);
  const playPopupClick = useButtonClickSfx({ variant: 'popup' });
  const getObjectUrl = useAssetStore(getObjectUrlSelector);
  const { isShelfVisited } = useShelfSelectionStore(
    useShallow(state => ({
      isShelfVisited: state.isShelfVisited,
    }))
  );

  const close = useCallback(() => {
    playPopupClick();
    setOpened(false);
  }, [playPopupClick]);

  const open = useCallback(() => {
    playPopupClick();
    setOpened(true);
  }, [playPopupClick]);

  const handleSectionClick = useCallback(
    (sectionCode: string) => {
      onSectionClick(sectionCode);
      close();
    },
    [onSectionClick, close]
  );

  const currentSection = useMemo(
    () => sections.find(s => s.code === currentShelfCode),
    [sections, currentShelfCode]
  );

  const currentStoreSectionIcon = useMemo(() => {
    if (!currentSection) return null;

    return cloneElement(currentSection.icons.focus, {
      className: cn(
        'h-45 w-auto absolute bottom-[48%] left-1/2 -translate-x-1/2 translate-y-1/2',
        currentSection.icons.focus.props.className
      ),
    });
  }, [currentSection]);

  return (
    <>
      <button
        type='button'
        className={cn(
          'absolute top-11 right-43',
          'aspect-square h-65 w-65 rounded-full',
          'border-yellow-1 border-[0.8px]',
          'pointer-events-auto'
        )}
        style={{
          backgroundImage: `url(${minimapThumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        onClick={open}
      >
        {currentStoreSectionIcon}
      </button>
      <BackgroundPortal>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className='fixed inset-0 z-200 flex items-center justify-center bg-black/30'
            >
              <div className='relative z-201 h-dvh w-dvw'>
                <img
                  src={getObjectUrl(minimap1920)}
                  srcSet={minimapSrcSet}
                  sizes='(max-width: 1024px) 100vw, 100vw'
                  alt='전체 매장 미니맵'
                  className='absolute inset-0 h-full w-full object-cover'
                />
                <IconCloseButton
                  onClick={close}
                  className='absolute top-11 right-11'
                />
                {sections.map(section => {
                  const isCurrentShelf = section.code === currentShelfCode;

                  const isVisited = isShelfVisited(section.shelfId);
                  let Icon = section.icons.default;
                  if (isVisited) {
                    Icon = section.icons.inactive;
                  }
                  if (isCurrentShelf) {
                    Icon = section.icons.focus;
                  }
                  const IconWithClass = cloneElement(Icon, {
                    className: cn('h-full w-full', Icon.props.className),
                  });

                  return (
                    <button
                      key={section.code}
                      className={cn(
                        'absolute h-35 w-auto -translate-x-1/2 -translate-y-1/2',
                        section.positionClassName
                      )}
                      title={section.displayName}
                      aria-label={section.displayName}
                      onClick={() => handleSectionClick(section.code)}
                    >
                      {IconWithClass}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </BackgroundPortal>
    </>
  );
}
