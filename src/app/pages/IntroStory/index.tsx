import { useState } from 'react';
import { useAssetStore } from '@shared/model/assetStore';
import { PlaceScreen, SinglePortraitScreen } from '@features/event-phase/index';
import { useShallow } from 'zustand/react/shallow';
import { CutSceneScreen } from '@features/event-phase/ui/CutSceneScreen';

// FIXME: 하드코딩된 화면 순서
type ScreenType = 'SINGLE_PORTRAIT_SCREEN' | 'CUT_SCENE_SCREEN';

const SCREEN_ORDER: ScreenType[] = [
  'SINGLE_PORTRAIT_SCREEN',
  'CUT_SCENE_SCREEN',
];

interface IntroStoryProps {
  onNext?: () => void;
}

export default function IntroStory({ onNext }: IntroStoryProps) {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const [screenIndex, setScreenIndex] = useState(0);
  const currentScreen = SCREEN_ORDER[screenIndex];

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
      case 'SINGLE_PORTRAIT_SCREEN':
        return <SinglePortraitScreen portraits={portraitData.portraits} />;
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

  const backgroundImage = getObjectUrl('shelter-bg.png');

  const handleNext = () => {
    if (screenIndex < SCREEN_ORDER.length - 1) {
      setScreenIndex(screenIndex + 1);
    } else {
      // 마지막 화면이 끝났을 때 onNext 호출
      if (onNext) {
        onNext();
      }
    }
  };
  return (
    <div
      className='relative flex h-screen w-screen flex-col gap-4 bg-cover bg-center'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#1e293b',
      }}
      onClick={handleNext}
    >
      <div className='flex-1'>{renderScreen()}</div>
    </div>
  );
}
