import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './kit/PortraitBanner';
import { useAssetStore } from '@shared/model/assetStore';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './kit/PortraitCharacterImage';

const portraits = [
  {
    speaker: '헴',
    text: '우리는 통장에 돈이 빠지는게 더 낫지. 근손실보다는..',
  },
  { speaker: '병철', text: '맞습니다 헴!!' },
];

const PORTRAIT_START_DELAY = 1000;

export default function SinglePortraitScreen() {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitStarted, setPortraitStarted] = useState(false);
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const byungcheolUrl = getObjectUrl('byungcheol.png');
  const hamUrl = getObjectUrl('ham.png');
  const handleNextPortrait = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPortraitIndex(prev => (prev + 1) % portraits.length);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPortraitStarted(true);
    }, PORTRAIT_START_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const currentPortrait = portraits[portraitIndex];
  return (
    <div className='relative h-full w-full'>
      <PortraitCharacterImage
        src={hamUrl}
        alt='person1'
        dimmed={portraitStarted && currentPortrait.speaker !== '병철'}
        position='right'
      />
      <PortraitCharacterImage
        src={byungcheolUrl}
        alt='person2'
        dimmed={portraitStarted && currentPortrait.speaker !== '헴'}
        position='left'
      />
      {portraitStarted && (
        <PortraitBanner
          onClick={handleNextPortrait}
          key={`currentPortrait-${portraitIndex}`}
          portrait={currentPortrait.text}
          characterName={currentPortrait.speaker}
        />
      )}
    </div>
  );
}
