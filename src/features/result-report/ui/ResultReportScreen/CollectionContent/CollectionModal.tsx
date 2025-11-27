import { useCallback, useMemo, useState } from 'react';
import type { CollectionCharacterSet } from '../../../model/types';
import Typography from '@shared/ui/Typography';
import ImageButton from '../kit/ImageButton';
import { ReportModal } from '../kit/ReportModal';
import { IconChevronLeftWhite, IconChevronRightWhite } from '@shared/ui/icons';
import { cn } from '@shared/lib/utils';

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

      <ReportModal
        isOpen={isOpen}
        onClose={close}
        title={collectionCharacterSet.name}
        showTitleBar
      >
        {/* 컨텐츠 영역: Chevron + 2x2 그리드 */}
        <div className='flex h-full items-center gap-4'>
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
      </ReportModal>
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
