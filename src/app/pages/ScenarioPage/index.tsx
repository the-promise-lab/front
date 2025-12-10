import { useState } from 'react';
import { BackgroundPortal } from '@shared/background-portal';
import {
  SideInventory,
  useGameFlowStore,
  Header,
  playingCharacterSetSelector,
  inventorySelector,
  selectedBagSelector,
} from '@processes/game-flow';
import { useSetBackground } from '@shared/background';
import PauseMenu from '@processes/game-flow/ui/menu/PauseMenu';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';
import NoticeBanner from '@shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';
import TypingText from '@shared/ui/TypingText';
import {
  ScenarioController,
  SkipButton,
  PlaceScreen,
  useScenarioStore,
  selectCurrentEvent,
} from '@features/scenario-play';
import IntroStory from '../IntroStory';
import BeforeResultScreen from '@features/scenario-play/ui/BeforeResultScreen';
import type { SlotItem } from '@entities/inventory';

type IntroPhase = 'place' | 'caution' | 'intro3' | 'scenario' | 'ending';

const CAUTION_TEXTS = [
  '상황마다 주어지는 기회는 단 한 번뿐입니다. 이제 모든 것은 당신의 선택에 달려 있습니다.',
  '결과는 되돌릴 수 없으니, 신중히 결정하세요.',
];

export default function ScenarioPage({ isNewGame }: { isNewGame: boolean }) {
  const [introPhase, setIntroPhase] = useState<IntroPhase>(
    isNewGame ? 'place' : 'scenario'
  );

  const backgroundImage = '/image/backGround/bg_shelter.png';

  // 플레이 중인 캐릭터 정보 가져오기
  const playingCharacters =
    useGameFlowStore(playingCharacterSetSelector)?.playingCharacters || [];
  const inventory = useGameFlowStore(inventorySelector);
  const selectedBag = useGameFlowStore(selectedBagSelector);

  const currentEvent = useScenarioStore(selectCurrentEvent);
  const skipDialogueEvents = useScenarioStore(
    state => state.skipDialogueEvents
  );
  useSetBackground({
    image: currentEvent?.bgImage ?? backgroundImage,
  });

  const isSimpleEvent = currentEvent?.type === 'Simple';

  const handleSkip = () => {
    skipDialogueEvents();
  };

  // PlaceScreen 완료 시 Caution 단계로 이동
  const handlePlaceComplete = () => {
    setIntroPhase('caution');
  };

  // Caution 클릭 시 intro3 단계로 이동
  const handleCautionClick = () => {
    setIntroPhase('intro3');
  };

  // IntroStory3 완료 시 시나리오 시작
  const handleIntro3Complete = () => {
    setIntroPhase('scenario');
  };

  const items: SlotItem[] | undefined =
    inventory?.items.map(item => ({
      id: item.item.id.toString(),
      name: item.item.name ?? '',
      image: item.item.image ?? '',
      state: 'default' as const,
    })) ?? undefined;

  console.log(inventory);

  // PlaceScreen 단계
  if (introPhase === 'place') {
    return (
      <div className='relative h-full w-full'>
        <EdgeGradient />
        <PlaceScreen onComplete={handlePlaceComplete} />
      </div>
    );
  }

  // Caution 단계
  if (introPhase === 'caution') {
    return (
      <>
        <BackgroundPortal>
          <div
            className='absolute inset-0 cursor-pointer bg-black/40'
            onClick={handleCautionClick}
          />
        </BackgroundPortal>
        <div
          className='relative h-full w-full cursor-pointer'
          onClick={handleCautionClick}
        >
          <EdgeGradient />
          <NoticeBanner withCaution>
            <Typography variant='dialogue-2'>
              <TypingText texts={CAUTION_TEXTS} smooth />
            </Typography>
          </NoticeBanner>
        </div>
      </>
    );
  }

  // IntroStory3 단계
  if (introPhase === 'intro3') {
    return (
      <div className='relative h-full w-full'>
        <EdgeGradient />
        <IntroStory introMode={3} onNext={handleIntro3Complete} />
      </div>
    );
  }

  if (introPhase === 'ending') {
    return (
      <BeforeResultScreen
        onGoToResultReport={() =>
          useGameFlowStore.getState().goto('RESULT_REPORT')
        }
        backgroundImage={currentEvent?.bgImage ?? backgroundImage}
      />
    );
  }

  // 시나리오 진행 단계
  return (
    <div className='relative flex h-full w-full flex-col gap-4'>
      <EdgeGradient />
      <Header
        hasCharacterProfiles
        playingCharacters={playingCharacters}
        menuSlot={
          <>
            <SideInventory
              hasWeightBar={false}
              items={items}
              bagImage={selectedBag?.image ?? ''}
              bagTitle={selectedBag?.name ?? ''}
              bagDescription={selectedBag?.description ?? ''}
            />
            <PauseMenu buttonClassName='static' />
          </>
        }
        skipSlot={isSimpleEvent ? <SkipButton onClick={handleSkip} /> : null}
      />
      <div className='flex-1'>
        <ScenarioController
          onGameEnd={() => setIntroPhase('ending')}
          onGameOver={() => useGameFlowStore.getState().goto('MAIN_MENU')}
          onSuddenDeath={() => setIntroPhase('ending')}
          onStatChange={effects =>
            useGameFlowStore.getState().updateCharacterStats(effects)
          }
        />
      </div>
    </div>
  );
}
