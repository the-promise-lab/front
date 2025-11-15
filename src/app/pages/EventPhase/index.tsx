import { useState } from 'react';
import { useAssetStore } from '@shared/preload-assets';
import {
  DayScreen,
  Header,
  PlaceScreen,
  RandomEventScreen,
  WarningBeforeStartScreen,
  ChangeStatsScreen,
  SinglePortraitScreen,
} from '@features/event-phase/index';
import {
  PauseMenu,
  SideInventory,
  useGameFlowStore,
} from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';
import { CutSceneScreen } from '@features/event-phase/ui/CutSceneScreen';
import BeforeResultScreen from '@features/event-phase/ui/BeforeResultScreen';
import { useSetBackground } from '@shared/background';

// FIXME: 하드코딩된 화면 순서
type ScreenType =
  | 'PLACE_SCREEN'
  | 'WARNING_BEFORE_START'
  | 'DAY_SCREEN'
  | 'RANDOM_EVENT_STORY'
  | 'CHANGE_STATS_SCREEN'
  | 'SINGLE_PORTRAIT_SCREEN'
  | 'CUT_SCENE_SCREEN'
  | 'RANDOM_EVENT_ITEM'
  | 'BEFORE_RESULT_SCREEN';

const SCREEN_ORDER: ScreenType[] = [
  'PLACE_SCREEN',
  'WARNING_BEFORE_START',
  'DAY_SCREEN',
  'RANDOM_EVENT_STORY',
  'CHANGE_STATS_SCREEN',
  'SINGLE_PORTRAIT_SCREEN',
  'CUT_SCENE_SCREEN',
  'RANDOM_EVENT_ITEM',
  'BEFORE_RESULT_SCREEN',
];

const hasCharacterProfileScreens: ScreenType[] = [
  'RANDOM_EVENT_STORY',
  'CHANGE_STATS_SCREEN',
  'SINGLE_PORTRAIT_SCREEN',
  'CUT_SCENE_SCREEN',
  'BEFORE_RESULT_SCREEN',
];

const hasCharacterProfile = (currentScreen: ScreenType) =>
  hasCharacterProfileScreens.includes(currentScreen);

export default function EventPhase() {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const [screenIndex, setScreenIndex] = useState(0);
  const currentScreen = SCREEN_ORDER[screenIndex];
  const backgroundImage = getObjectUrl('shelter-bg.png');
  useSetBackground({
    image: backgroundImage,
  });
  // 플레이 중인 캐릭터 정보 가져오기
  const playingCharacters =
    useGameFlowStore(
      state => state.gameSession?.playingCharacterSet?.playingCharacters
    ) || [];

  // FIXME: 하드코딩된 데이터
  const storyEventData = {
    id: 1,
    title: '의문의 소리',
    descriptions: [
      '대피소 근처에서 이상한 소리가 들려옵니다.',
      '누군가 도움을 요청하는 것 같은데, 정확히 들리지 않습니다.',
      '소리가 나는 방향으로 가볼까요, 아니면 안전을 위해 피할까요?',
    ],
    image: '/story-event-bg.png',
    options: [
      {
        text: '소리나는 곳으로 가본다',
        value: 'investigate',
        statChanges: {
          mentality: 2,
          hp: -3,
        },
      },
      {
        text: '안전을 위해 피한다',
        value: 'avoid',
        statChanges: {
          mentality: -1,
          hp: 2,
        },
      },
    ],
  };

  const itemEventData = {
    id: 2,
    title: '아이템 선택',
    descriptions: [
      '대피소에서 필요한 물건을 선택하세요.',
      '각 아이템은 다른 효과를 가집니다.',
      '신중하게 선택하세요.',
    ],
    image: '/item-event-bg.png',
    candidateItems: ['닭가슴살', '담요', '생수'],
    changeStatsValue: {
      success: {
        mentality: -3,
        hp: 10,
      },
      fail: {
        mentality: -9,
        hp: -10,
      },
    },
  };

  const portraitData = {
    portraits: [
      {
        speaker: '헴',
        text: '우리는 통장에 돈이 빠지는게 더 낫지. 근손실보다는..',
      },
      {
        speaker: '병철',
        text: '맞습니다 헴!!',
      },
      {
        speaker: '헴',
        text: '그런데 이 상황이 얼마나 지속될지 모르겠어. 언제까지 이렇게 버텨야 할까?',
      },
      {
        speaker: '병철',
        text: '걱정하지 마세요. 우리가 함께 있잖아요. 힘들 때는 서로 의지하면 돼요.',
      },
    ],
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'PLACE_SCREEN':
        return <PlaceScreen />;
      case 'WARNING_BEFORE_START':
        return <WarningBeforeStartScreen />;
      case 'DAY_SCREEN':
        return <DayScreen />;
      case 'RANDOM_EVENT_STORY':
        return (
          <RandomEventScreen eventData={{ storyEventData, itemEventData }} />
        );
      case 'RANDOM_EVENT_ITEM':
        return (
          <RandomEventScreen
            type='ITEM'
            eventData={{ storyEventData, itemEventData }}
          />
        );
      case 'CHANGE_STATS_SCREEN':
        return <ChangeStatsScreen playingCharacters={playingCharacters} />;
      case 'BEFORE_RESULT_SCREEN':
        return (
          <BeforeResultScreen
            backgroundImage={getObjectUrl('bg-2.png')}
            onGoToMainMenu={() => useGameFlowStore.getState().goto('MAIN_MENU')}
          />
        );
      case 'SINGLE_PORTRAIT_SCREEN':
        return (
          <SinglePortraitScreen
            portraits={portraitData.portraits}
            playingCharacters={playingCharacters}
          />
        );
      case 'CUT_SCENE_SCREEN':
        return (
          <CutSceneScreen
            imageUrl={getObjectUrl('cut-scene-bg.png') || ''}
            text='이것은 컷씬 화면입니다.\n여러 줄로 텍스트를 표시할 수 있습니다.'
          />
        );
      default:
        return <PlaceScreen />;
    }
  };

  const handleNext = () => {
    // BEFORE_RESULT_SCREEN에서는 클릭 이벤트 비활성화 (버튼 클릭만 허용)
    if (currentScreen !== 'BEFORE_RESULT_SCREEN') {
      if (screenIndex < SCREEN_ORDER.length - 1) {
        setScreenIndex(screenIndex + 1);
      }
    }
  };
  return (
    <div
      className='relative flex h-full w-full flex-col gap-4'
      onClick={handleNext}
    >
      <Header
        hasCharacterProfiles={hasCharacterProfile(currentScreen)}
        playingCharacters={playingCharacters}
        menuSlot={
          <>
            <SideInventory hasWeightBar weight={100} />
            <PauseMenu />
          </>
        }
      />
      <div className='flex-1'>{renderScreen()}</div>
    </div>
  );
}
