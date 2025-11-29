import { IconCloseButton } from '@shared/ui/icon-button';
import { BackgroundPortal } from '@shared/background-portal';
import { cn } from '@shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  cloneElement,
  useCallback,
  useMemo,
  useState,
  type ReactElement,
} from 'react';
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
  IconMinimapDrinkDefault,
  IconMinimapDrinkActive,
  IconMinimapDrinkFocus,
  IconMinimapDrinkInactive,
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
    positionClassName: 'top-[38%] left-[34%]',
    status: 'default',
  },
  2: {
    icons: {
      default: <IconMinimapDigitalDefault />,
      active: <IconMinimapDigitalActive />,
      focus: <IconMinimapDigitalFocus />,
      inactive: <IconMinimapDigitalInactive />,
    },
    positionClassName: 'top-[67%] left-[48%]',
    status: 'default',
  },
  3: {
    icons: {
      default: <IconMinimapPharmacyDefault />,
      active: <IconMinimapPharmacyActive />,
      focus: <IconMinimapPharmacyFocus />,
      inactive: <IconMinimapPharmacyInactive />,
    },
    positionClassName: 'top-[38%] left-[21%]',
    status: 'default',
  },
  4: {
    icons: {
      default: <IconMinimapDailyDefault />,
      active: <IconMinimapDailyActive />,
      focus: <IconMinimapDailyFocus />,
      inactive: <IconMinimapDailyInactive />,
    },
    positionClassName: 'top-[38%] left-[49%]',
    status: 'default',
  },
  5: {
    icons: {
      default: <IconMinimapClothesDefault />,
      active: <IconMinimapClothesActive />,
      focus: <IconMinimapClothesFocus />,
      inactive: <IconMinimapClothesInactive />,
    },
    positionClassName: 'top-[90%] left-[45%]',
    status: 'default',
  },
  6: {
    icons: {
      default: <IconMinimapNoteDefault />,
      active: <IconMinimapNoteActive />,
      focus: <IconMinimapNoteFocus />,
      inactive: <IconMinimapNoteInactive />,
    },
    positionClassName: 'top-[67%] left-[38%]',
    status: 'default',
  },
  7: {
    icons: {
      default: <IconMinimapSaleDefault />,
      active: <IconMinimapSaleActive />,
      focus: <IconMinimapSaleFocus />,
      inactive: <IconMinimapSaleInactive />,
    },
    positionClassName: 'top-[38%] left-[64%]',
    status: 'default',
  },
  9: {
    icons: {
      default: <IconMinimapDrinkDefault />,
      active: <IconMinimapDrinkActive />,
      focus: <IconMinimapDrinkFocus />,
      inactive: <IconMinimapDrinkInactive />,
    },
    positionClassName: 'top-[38%] left-[42%]',
    status: 'default',
  },
};

interface MinimapProps {
  storeSections: StoreSectionDto[];
  onSectionClick: (storeSectionId: number) => void;
  currentShelfId: number | null;
}

export default function Minimap({
  storeSections,
  onSectionClick,
  currentShelfId,
}: MinimapProps) {
  const [opened, setOpened] = useState(false);

  const close = useCallback(() => {
    setOpened(false);
  }, []);

  const open = useCallback(() => {
    setOpened(true);
  }, []);

  const handleSectionClick = useCallback(
    (storeSectionId: number) => {
      onSectionClick(storeSectionId);
      close();
    },
    [onSectionClick, close]
  );

  const currentStoreSectionIcon = useMemo(() => {
    const icon = cloneElement(
      minimapIconButtonsById[currentShelfId || 0].icons['focus'],
      {
        className: cn(
          'h-45 w-auto absolute bottom-[48%] left-1/2 -translate-x-1/2 translate-y-1/2',
          minimapIconButtonsById[currentShelfId || 0].icons['focus'].props
            .className
        ),
      }
    );

    return icon;
  }, [currentShelfId]);

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

                  const isCurrentShelf = section.id === currentShelfId;
                  const status = isCurrentShelf ? 'focus' : config.status;
                  const activeIcon = config.icons[status];
                  const iconWithClass = cloneElement(activeIcon, {
                    className: cn('h-full w-full', activeIcon.props.className),
                  });

                  return (
                    <button
                      key={section.id}
                      className={cn(
                        'absolute h-35 w-auto -translate-x-1/2 -translate-y-1/2',
                        config.positionClassName
                      )}
                      title={section.displayName}
                      aria-label={section.displayName}
                      onClick={() => handleSectionClick(section.id)}
                    >
                      {iconWithClass}
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
