import { useEffect } from 'react';
import ShelfSelectionCanvas from './ShelfSelectionCanvas';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { useShelfData } from '../../model/useShelfData';
import { adaptShelfItemsToInventoryPayload } from '../../model/adapters';
import { useSubmitInventory } from '@entities/game-session/model/useSubmitInventory';
import type { SubmitInventoryResultDto } from '@api';
import GlassButton from '@shared/ui/GlassButton';
import Typography from '@shared/ui/Typography';
import { toast } from 'sonner';
import Minimap from './Minimap';

interface ShelfSelectionProps {
  onBack: () => void;
  bagId: number;
  onComplete: (result: SubmitInventoryResultDto) => void;
}

export default function ShelfSelection({
  onBack,
  bagId,
  onComplete,
}: ShelfSelectionProps) {
  const {
    getCurrentShelf,
    getNextShelf,
    getPreviousShelf,
    selectedShelfItems,
    initShelves,
    moveToNextShelf,
    moveToPreviousShelf,
  } = useShelfSelectionStore();

  const { shelves, isLoading, error } = useShelfData();
  const { mutate: submitInventory, isPending } = useSubmitInventory({
    onSuccess: result => {
      onComplete(result);
    },
    onError: err => {
      toast.error('인벤토리 제출에 실패했습니다', {
        description: err.message,
      });

      onComplete({
        inventories: [],
      }); // FIXME: 임시로 넘어가기
    },
  });

  const handleComplete = () => {
    const payload = adaptShelfItemsToInventoryPayload(
      selectedShelfItems,
      bagId
    );

    submitInventory(payload);
  };

  useEffect(() => {
    if (shelves.length > 0) {
      initShelves(shelves);
    }
  }, [shelves, initShelves]);

  const currentShelf = getCurrentShelf();
  const nextShelf = getNextShelf();
  const previousShelf = getPreviousShelf();

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

      <ShelfSelectionCanvas
        backgroundImage={currentShelf.backgroundImage}
        items={currentShelf.shelfItems}
        previousShelfName={previousShelf?.name || ''}
        nextShelfName={nextShelf?.name || ''}
        onPreviousShelfClick={moveToPreviousShelf}
        onNextShelfClick={moveToNextShelf}
      />

      <GlassButton
        className='absolute bottom-12 left-1/2 -translate-x-1/2'
        onClick={handleComplete}
        disabled={isPending}
      >
        <Typography variant='h4-b'>
          {isPending ? '제출 중...' : '담기 완료'}
        </Typography>
      </GlassButton>

      <Minimap />
    </div>
  );
}
