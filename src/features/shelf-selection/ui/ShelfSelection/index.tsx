import { useEffect } from 'react';
import ShelfSelectionCanvas from './ShelfSelectionCanvas';
import SelectedItemsPanel from './SelectedItemsPanel';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { useShelfData } from '../../model/useShelfData';
import GlassButton from '@shared/ui/GlassButton';
import Typography from '@shared/ui/Typography';

interface ShelfSelectionProps {
  onBack: () => void;
}

export default function ShelfSelection({ onBack }: ShelfSelectionProps) {
  const {
    getCurrentShelf,
    selectedShelfItems,
    initShelves,
    moveToNextShelf,
    moveToPreviousShelf,
  } = useShelfSelectionStore();

  const { shelves, isLoading, error } = useShelfData();

  useEffect(() => {
    if (shelves.length > 0) {
      initShelves(shelves);
    }
  }, [shelves, initShelves]);

  const currentShelf = getCurrentShelf();

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-red-500'>
          데이터를 불러오는데 실패했습니다: {error.message}
        </div>
      </div>
    );
  }

  if (isLoading || !currentShelf) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div>데이터를 로딩 중...</div>
      </div>
    );
  }
  return (
    <div className='relative h-full w-full'>
      {/* 뒤로가기 버튼 */}
      <div className='absolute top-4 left-4 z-10'>
        <button
          className='bg-opacity-80 hover:bg-opacity-100 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-105 active:scale-95'
          onClick={onBack}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-gray-700'
          >
            <polyline points='15 18 9 12 15 6' />
          </svg>
        </button>
      </div>

      <div className='absolute top-1/2 left-2 z-10 -translate-y-1/2'>
        <button
          className='flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-transparent text-sm'
          onClick={() => moveToPreviousShelf()}
        >
          <PreviousIcon />
        </button>
      </div>

      <div className='absolute top-1/2 right-2 z-10 -translate-y-1/2'>
        <button
          className='flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-transparent text-sm'
          onClick={() => moveToNextShelf()}
        >
          <NextIcon />
        </button>
      </div>

      <SelectedItemsPanel selectedItems={selectedShelfItems} />

      <ShelfSelectionCanvas
        backgroundImage={currentShelf.backgroundImage}
        items={currentShelf.shelfItems}
      />

      <GlassButton className='absolute bottom-12 left-1/2 -translate-x-1/2'>
        {/* FIXME: h4-b임  */}
        <Typography variant='h3-b'>담기 완료</Typography>
      </GlassButton>
    </div>
  );
}

const PreviousIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='15 18 9 12 15 6' />
  </svg>
);

const NextIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <polyline points='9 6 15 12 9 18' />
  </svg>
);
