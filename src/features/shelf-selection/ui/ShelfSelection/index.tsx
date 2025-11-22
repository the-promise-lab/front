import { useEffect, type ReactNode } from 'react';
import ShelfSelectionCanvas from './ShelfSelectionCanvas';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { useShelfData } from '../../model/useShelfData';
import { adaptShelfItemsToInventoryPayload } from '../../model/adapters';
import { useSubmitInventory } from '@entities/game-session/model/useSubmitInventory';
import Typography from '@shared/ui/Typography';
import { toast } from 'sonner';
import Minimap from './Minimap';
import Inventory from './Inventory';
import type { Bag } from '@entities/game-session';
import Timer from './Timer';
import { BackgroundPortal } from '@shared/background-portal';
import type { GameSessionDto } from '@api';

interface ShelfSelectionProps {
  onBack: () => void;
  bag: Bag;
  onComplete: (result: GameSessionDto) => void;
  renderHeader: () => ReactNode;
  secondsLeft: number;
  showTimeoutModal: boolean;
}

export default function ShelfSelection({
  onBack,
  bag,
  onComplete,
  renderHeader,
  secondsLeft,
  showTimeoutModal,
}: ShelfSelectionProps) {
  const {
    getCurrentShelf,
    getNextShelf,
    getPreviousShelf,
    selectedShelfItems,
    initShelves,
    moveToNextShelf,
    moveToPreviousShelf,
    moveToShelf,
  } = useShelfSelectionStore();

  const { shelves, storeSections, isLoading, error } = useShelfData();
  const { mutate: submitInventory, isPending } = useSubmitInventory({
    onSuccess: result => {
      onComplete(result);
    },
    onError: err => {
      toast.error('인벤토리 제출에 실패했습니다', {
        description: err.message,
      });
    },
  });

  const handleComplete = () => {
    const payload = adaptShelfItemsToInventoryPayload(
      selectedShelfItems,
      bag.id
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
    <BackgroundPortal>
      <div className='fixed inset-0 z-10 h-full w-full'>
        <ShelfSelectionCanvas
          backgroundImage={currentShelf.backgroundImage}
          items={currentShelf.shelfItems}
          previousShelfName={previousShelf?.name || ''}
          nextShelfName={nextShelf?.name || ''}
          onPreviousShelfClick={moveToPreviousShelf}
          onNextShelfClick={moveToNextShelf}
        />

        <div className='pointer-events-none fixed left-1/2 z-10 aspect-[16/9] h-[100dvh] w-auto -translate-x-1/2 touch-pan-y overflow-x-visible'>
          {/* 뒤로가기 버튼 */}
          <div className='pointer-events-auto absolute top-4 left-4 z-10'>
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

          <button
            className='pointer-events-auto absolute bottom-0 left-0 h-20 w-40 bg-black/50'
            onClick={handleComplete}
            disabled={isPending}
          >
            <Typography variant='mini-dialogue'>OK(임시)</Typography>
          </button>

          <Minimap
            storeSections={storeSections}
            onSectionClick={moveToShelf}
            currentShelfId={currentShelf?.id}
          />
          <Inventory bag={bag} />
          <Timer
            secondsLeft={secondsLeft}
            showModal={showTimeoutModal}
            onTimeout={handleComplete}
          />

          {renderHeader()}
        </div>
      </div>
    </BackgroundPortal>
  );
}
