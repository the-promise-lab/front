import { Header, PauseMenu, useGameFlowStore } from '@processes/game-flow';
import { ShelfSelection } from '@features/shelf-selection';
import { useEffect } from 'react';
import type { InventoryDto } from '@api';

export default function PackingPhase() {
  const { back, gameSession, saveInventory, next } = useGameFlowStore();

  const bag = gameSession?.selectedBag;

  const onComplete = (result: InventoryDto) => {
    saveInventory(result);
    next();
  };

  useEffect(() => {
    if (!bag) {
      back();
    }
  }, [bag, back]);

  if (!bag) return null;
  return (
    <>
      <ShelfSelection
        onBack={back}
        bag={bag}
        onComplete={onComplete}
        renderHeader={() => (
          <Header
            className='z-[100]'
            hasCharacterProfiles
            playingCharacters={
              gameSession?.playingCharacterSet?.playingCharacters
            }
            menuSlot={<PauseMenu buttonClassName='pointer-events-auto' />}
          />
        )}
      />
    </>
  );
}
