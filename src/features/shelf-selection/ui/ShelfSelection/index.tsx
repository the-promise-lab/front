import { useEffect, useMemo, type ReactNode } from 'react';
import ShelfSelectionCanvas from './ShelfSelectionCanvas';
import { useShelfSelectionStore } from '../../model/useShelfSelectionStore';
import { useShelfData } from '../../model/useShelfData';
import {
  adaptShelfItemsToInventoryPayload,
  adaptStoreSectionsToMinimapSections,
} from '../../model/adapters';
import { useSubmitInventory } from '@entities/game-session/model/useSubmitInventory';
import Typography from '@shared/ui/Typography';
import { toast } from 'sonner';
import Minimap from './Minimap';
import Inventory from './Inventory';
import type { Bag } from '@entities/game-session';
import Timer from './Timer';
import { BackgroundPortal } from '@shared/background-portal';
import type { GameSessionDto } from '@api';
import { useCapacityWarning } from '../../model/useCapacityWarning';
import type { ShelfItem } from '../../model/types';
import { toastItemAdded } from '@shared/ui/toast-variants';

interface ShelfSelectionProps {
  onBack: () => void;
  bag: Bag;
  onComplete: (result: GameSessionDto) => void;
  onCompleteLegacy?: (result: GameSessionDto) => void;
  renderHeader: () => ReactNode;
  secondsLeft: number;
  showTimeoutModal: boolean;
}

export default function ShelfSelection({
  onBack,
  bag,
  onComplete,
  onCompleteLegacy,
  renderHeader,
  secondsLeft,
  showTimeoutModal,
}: ShelfSelectionProps) {
  const { showWarning, CapacityWarningBanner } = useCapacityWarning();

  const {
    getCurrentShelf,
    getCurrentShelfCode,
    getNextShelf,
    getPreviousShelf,
    selectedShelfItems,
    initShelves,
    moveToNextShelf,
    moveToPreviousShelf,
    moveToShelfByCode,
    selectNewShelfItem,
  } = useShelfSelectionStore();
  const currentWeight = selectedShelfItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const canPutInMoreItems = currentWeight < bag.capacity;

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

  const handleCompleteLegacy = () => {
    if (!onCompleteLegacy) return;
    const payload = adaptShelfItemsToInventoryPayload(
      selectedShelfItems,
      bag.id
    );

    submitInventory(payload, {
      onSuccess: result => {
        onCompleteLegacy(result);
      },
    });
  };

  useEffect(() => {
    if (shelves.length > 0) {
      initShelves(shelves);
    }
  }, [shelves, initShelves]);

  const onClickItem = (item: ShelfItem) => {
    if (canPutInMoreItems) {
      selectNewShelfItem(item);
      toastItemAdded(item.name);
    } else {
      showWarning();
    }
  };

  const currentShelf = getCurrentShelf();
  const currentShelfCode = getCurrentShelfCode();
  const nextShelf = getNextShelf();
  const previousShelf = getPreviousShelf();

  // storeSections를 MinimapSection[]으로 변환
  const minimapSections = useMemo(
    () => adaptStoreSectionsToMinimapSections(storeSections),
    [storeSections]
  );

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
          onClickItem={onClickItem}
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

          <div className='pointer-events-auto absolute bottom-0 left-0 flex gap-2'>
            <button
              className='h-20 w-40 bg-emerald-600/80 hover:bg-emerald-500'
              onClick={handleComplete}
              disabled={isPending}
            >
              <Typography variant='mini-dialogue'>OK(신규)</Typography>
            </button>
            {onCompleteLegacy && (
              <button
                className='h-20 w-40 bg-gray-600/80 hover:bg-gray-500'
                onClick={handleCompleteLegacy}
                disabled={isPending}
              >
                <Typography variant='mini-dialogue'>OK(레거시)</Typography>
              </button>
            )}
          </div>

          <Minimap
            sections={minimapSections}
            onSectionClick={moveToShelfByCode}
            currentShelfCode={currentShelfCode}
          />
          <Inventory bag={bag} />
          <Timer
            secondsLeft={secondsLeft}
            showModal={showTimeoutModal}
            onTimeout={handleComplete}
          />

          {renderHeader()}
          {CapacityWarningBanner}
        </div>
      </div>
    </BackgroundPortal>
  );
}
