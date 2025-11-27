import { useCallback, useMemo, useState } from 'react';
import type { CollectionCharacterSet } from '../../../model/types';
import Typography from '@shared/ui/Typography';
import ImageButton from '../kit/ImageButton';
import {
  IconXWhite,
  IconChevronLeftWhite,
  IconChevronRightWhite,
} from '@shared/ui/icons';
import { cn } from '@shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const CARDS_PER_PAGE = 4;

interface CollectionModalProps {
  collectionCharacterSet: CollectionCharacterSet;
  isActive: boolean;
}
export default function CollectionModal({
  collectionCharacterSet,
  isActive,
}: CollectionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const cards = collectionCharacterSet.collectionCards;
  const totalPages = Math.ceil(cards.length / CARDS_PER_PAGE);
  const currentCards = cards.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goToPrevPage = useCallback(() => {
    if (canGoPrev) setCurrentPage(prev => prev - 1);
  }, [canGoPrev]);

  const goToNextPage = useCallback(() => {
    if (canGoNext) setCurrentPage(prev => prev + 1);
  }, [canGoNext]);

  const isDisabled = useMemo(() => {
    return collectionCharacterSet.collectionCards.length === 0;
  }, [collectionCharacterSet.collectionCards.length]);
  const imageUrl = useMemo(() => {
    if (isActive) return collectionCharacterSet.images.active;
    if (isDisabled) return collectionCharacterSet.images.disabled;
    return collectionCharacterSet.images.default;
  }, [
    isActive,
    isDisabled,
    collectionCharacterSet.images.active,
    collectionCharacterSet.images.disabled,
    collectionCharacterSet.images.default,
  ]);

  return (
    <>
      <ImageButton
        key={collectionCharacterSet.id}
        className='relative h-80 w-140'
        imageUrl={imageUrl}
        onClick={open}
        disabled={isDisabled}
      >
        <Typography variant='dialogue-m' className='absolute top-3 left-0'>
          {collectionCharacterSet.name}
        </Typography>
      </ImageButton>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className='fixed inset-0 z-105 bg-black/40 backdrop-blur-2xl'
              onClick={close}
            >
              <div className='absolute top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2'>
                <CollectionModalPanel className='h-[90dvh] w-auto' />
                <div
                  className='absolute inset-0 flex flex-col gap-5 p-8 px-11'
                  onClick={e => e.stopPropagation()}
                >
                  {/* 헤더: 타이틀 + 닫기 버튼 */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='h-9 w-1.5 bg-white' />
                      <Typography variant='dialogue-m'>
                        {collectionCharacterSet.name}
                      </Typography>
                    </div>
                    <button onClick={close} className='size-18'>
                      <IconXWhite className='size-full' />
                    </button>
                  </div>

                  {/* 컨텐츠 영역: Chevron + 2x2 그리드 */}
                  <div className='flex flex-1 items-center gap-4'>
                    {/* 왼쪽 Chevron */}
                    <button
                      onClick={goToPrevPage}
                      disabled={!canGoPrev}
                      className={cn('shrink-0 transition-opacity', {
                        'pointer-events-none opacity-0': !canGoPrev,
                      })}
                    >
                      <IconChevronLeftWhite className='size-10.5' />
                    </button>

                    {/* 2x2 그리드 카드 영역 */}
                    <div className='grid size-full flex-1 grid-cols-2 grid-rows-2 gap-x-14 gap-y-10'>
                      {currentCards.map((card, index) => (
                        <CollectionCardItem
                          key={`${currentPage}-${index}`}
                          endingTitle={card.endingTitle}
                          thumbnailUrl={card.endingThumbnailUrl}
                        />
                      ))}
                    </div>

                    {/* 오른쪽 Chevron */}
                    <button
                      onClick={goToNextPage}
                      disabled={!canGoNext}
                      className={cn('shrink-0 transition-opacity', {
                        'pointer-events-none opacity-0': !canGoNext,
                      })}
                    >
                      <IconChevronRightWhite className='size-10.5' />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface CollectionCardItemProps {
  endingTitle: string;
  thumbnailUrl: string | null;
}

function CollectionCardItem({
  endingTitle,
  thumbnailUrl,
}: CollectionCardItemProps) {
  return (
    <div className='flex flex-col gap-4'>
      {/* 엔딩 타이틀 */}
      <Typography variant='body-2-b' className='text-white'>
        {endingTitle}
      </Typography>

      {/* 카드 이미지 영역 */}
      <div className='flex-1 rounded border-[0.8px] border-white/35 p-2.5 lg:border-2'>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={endingTitle}
            className='size-full rounded border-[0.8px] border-white object-cover lg:border-2'
          />
        ) : (
          <div className='size-full rounded border-[0.8px] border-white bg-white/30 lg:border-2' />
        )}
      </div>
    </div>
  );
}

function CollectionModalPanel({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 1315 888'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M24 1H1291C1303.7 1 1314 11.2975 1314 24V864C1314 876.703 1303.7 887 1291 887H24C11.2975 887 1 876.703 1 864V24C1 11.2975 11.2975 1 24 1Z'
        fill='url(#paint0_linear_2493_3594)'
        fillOpacity='0.8'
        stroke='url(#paint1_radial_2493_3594)'
        strokeWidth='2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2493_3594'
          x1='-5.79665e-05'
          y1='961.26'
          x2='1346.43'
          y2='545.875'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0.3' />
          <stop offset='1' stopColor='white' stopOpacity='0.15' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_2493_3594'
          cx='0'
          cy='0'
          r='1'
          gradientTransform='matrix(1222.95 -506.16 278.75 307.121 710.1 444)'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0.4' />
        </radialGradient>
      </defs>
    </svg>
  );
}
