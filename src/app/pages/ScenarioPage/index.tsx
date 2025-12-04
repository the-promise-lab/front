import { useAssetStore } from '@shared/preload-assets';
import { SideInventory, useGameFlowStore, Header } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { useSetBackground } from '@shared/background';
import PauseMenu from '@processes/game-flow/ui/menu/PauseMenu';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';
import {
  ScenarioController,
  SkipButton,
  useScenarioStore,
  selectCurrentEvent,
} from '@features/scenario-play';

export default function ScenarioPage() {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const backgroundImage = getObjectUrl('shelter-bg.png');

  useSetBackground({
    image: backgroundImage,
  });

  // 플레이 중인 캐릭터 정보 가져오기
  const playingCharacters =
    useGameFlowStore(
      state => state.gameSession?.playingCharacterSet?.playingCharacters
    ) || [];

  const currentEvent = useScenarioStore(selectCurrentEvent);
  const skipDialogueEvents = useScenarioStore(
    state => state.skipDialogueEvents
  );

  const isSimpleEvent = currentEvent?.type === 'Simple';

  const handleSkip = () => {
    skipDialogueEvents();
  };

  return (
    <div className='relative flex h-full w-full flex-col gap-4'>
      <EdgeGradient />
      <Header
        hasCharacterProfiles
        playingCharacters={playingCharacters}
        menuSlot={
          <>
            <SideInventory hasWeightBar weight={100} />
            <PauseMenu buttonClassName='static' />
          </>
        }
        skipSlot={isSimpleEvent ? <SkipButton onClick={handleSkip} /> : null}
      />
      <div className='flex-1'>
        <ScenarioController
          onGameEnd={() => useGameFlowStore.getState().goto('RESULT_REPORT')}
          onGameOver={() => useGameFlowStore.getState().goto('RESULT_REPORT')}
        />
      </div>
    </div>
  );
}
