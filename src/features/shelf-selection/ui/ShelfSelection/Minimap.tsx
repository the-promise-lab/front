import { IconCloseButton } from '@features/event-phase/ui/kit/icon-button';
import { BackgroundPortal } from '@shared/background-portal';
import { cn } from '@shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement, useCallback, useState, type ReactElement } from 'react';
import type { StoreSectionDto } from '@api';
import {
  IconMinimapClothesActive,
  IconMinimapClothesDefault,
  IconMinimapClothesFocus,
  IconMinimapClothesInactive,
  IconMinimapDailyActive,
  IconMinimapDailyDefault,
  IconMinimapDailyFocus,
  IconMinimapDailyInactive,
  IconMinimapDigitalActive,
  IconMinimapDigitalDefault,
  IconMinimapDigitalFocus,
  IconMinimapDigitalInactive,
  IconMinimapFoodActive,
  IconMinimapFoodDefault,
  IconMinimapFoodFocus,
  IconMinimapFoodInactive,
  IconMinimapNoteActive,
  IconMinimapNoteDefault,
  IconMinimapNoteFocus,
  IconMinimapNoteInactive,
  IconMinimapPharmacyActive,
  IconMinimapPharmacyDefault,
  IconMinimapPharmacyFocus,
  IconMinimapPharmacyInactive,
  IconMinimapSaleActive,
  IconMinimapSaleDefault,
  IconMinimapSaleFocus,
  IconMinimapSaleInactive,
} from './kit/icons';

const minimapThumbnail = '/image/minimap/minimap_thumbnail.png';
const minimap1024 = '/image/minimap/minimap@1024.png';
const minimap1920 = '/image/minimap/minimap@1920.png';
const minimapSrcSet = `${minimap1024} 1024w, ${minimap1920} 1920w`;

type MinimapIconButtonStatus = 'default' | 'active' | 'focus' | 'inactive';

type MinimapIconElement = ReactElement<{ className?: string }>;

interface MinimapIconButtonConfig {
  icons: Record<MinimapIconButtonStatus, MinimapIconElement>;
  positionClassName: string;
  status: MinimapIconButtonStatus;
}

const minimapIconButtonsById: Record<number, MinimapIconButtonConfig> = {
  1: {
    icons: {
      default: <IconMinimapFoodDefault />,
      active: <IconMinimapFoodActive />,
      focus: <IconMinimapFoodFocus />,
      inactive: <IconMinimapFoodInactive />,
    },
    positionClassName: 'top-[40%] left-[43%]',
    status: 'default',
  },
  2: {
    icons: {
      default: <IconMinimapDigitalDefault />,
      active: <IconMinimapDigitalActive />,
      focus: <IconMinimapDigitalFocus />,
      inactive: <IconMinimapDigitalInactive />,
    },
    positionClassName: 'top-[60%] left-[56%]',
    status: 'default',
  },
  3: {
    icons: {
      default: <IconMinimapPharmacyDefault />,
      active: <IconMinimapPharmacyActive />,
      focus: <IconMinimapPharmacyFocus />,
      inactive: <IconMinimapPharmacyInactive />,
    },
    positionClassName: 'top-[38%] left-[29%]',
    status: 'default',
  },
  4: {
    icons: {
      default: <IconMinimapSaleDefault />,
      active: <IconMinimapSaleActive />,
      focus: <IconMinimapSaleFocus />,
      inactive: <IconMinimapSaleInactive />,
    },
    positionClassName: 'top-[38%] left-[73%]',
    status: 'default',
  },
  5: {
    icons: {
      default: <IconMinimapDailyDefault />,
      active: <IconMinimapDailyActive />,
      focus: <IconMinimapDailyFocus />,
      inactive: <IconMinimapDailyInactive />,
    },
    positionClassName: 'top-[40%] left-[57%]',
    status: 'default',
  },
  6: {
    icons: {
      default: <IconMinimapNoteDefault />,
      active: <IconMinimapNoteActive />,
      focus: <IconMinimapNoteFocus />,
      inactive: <IconMinimapNoteInactive />,
    },
    positionClassName: 'top-[60%] left-[45%]',
    status: 'default',
  },
  7: {
    icons: {
      default: <IconMinimapClothesDefault />,
      active: <IconMinimapClothesActive />,
      focus: <IconMinimapClothesFocus />,
      inactive: <IconMinimapClothesInactive />,
    },
    positionClassName: 'top-[74%] left-[54%]',
    status: 'default',
  },
};

interface MinimapProps {
  storeSections: StoreSectionDto[];
}

export default function Minimap({ storeSections }: MinimapProps) {
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
      ></button>
      <BackgroundPortal>
        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className='fixed inset-0 z-100 flex items-center justify-center bg-black/30'
            >
              <div
                className='relative z-[101] h-[100dvh] w-[100dvw]'
                style={{}}
              >
                <img
                  src={minimap1920}
                  srcSet={minimapSrcSet}
                  sizes='(max-width: 1024px) 100vw, 100vw'
                  alt='전체 매장 미니맵'
                  className='absolute inset-0 h-full w-full object-cover'
                />
                <IconCloseButton
                  onClick={close}
                  className='absolute top-11 right-11'
                />
                {storeSections.map(section => {
                  const config = minimapIconButtonsById[section.id];
                  if (!config) return null;

                  const activeIcon = config.icons[config.status];
                  const iconWithClass = cloneElement(activeIcon, {
                    className: cn('h-full w-full', activeIcon.props.className),
                  });

                  return (
                    <div
                      key={section.id}
                      className={cn(
                        'absolute h-30 w-auto -translate-x-1/2 -translate-y-1/2',
                        config.positionClassName
                      )}
                      title={section.name}
                      aria-label={section.name}
                    >
                      {iconWithClass}
                    </div>
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
