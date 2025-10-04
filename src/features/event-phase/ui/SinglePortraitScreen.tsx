import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './kit/PortraitBanner';
import { useAssetStore } from '@shared/model/assetStore';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './kit/PortraitCharacterImage';

const PORTRAIT_START_DELAY = 1000;

interface SinglePortraitScreenProps {
  portraits?: Array<{
    speaker: string;
    text: string;
  }>;
}

export default function SinglePortraitScreen({
  portraits = [],
}: SinglePortraitScreenProps) {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitStarted, setPortraitStarted] = useState(false);
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const byungcheolUrl = getObjectUrl('byungcheol.png');
  const hamUrl = getObjectUrl('ham.png');

  // 디버깅: 이미지 URL 확인
  console.log('Byungcheol URL:', byungcheolUrl);
  console.log('Ham URL:', hamUrl);
  console.log('Portraits from JSON:', portraits);

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
        src={hamUrl || '/ham.png'}
        alt='person1'
        dimmed={portraitStarted && currentPortrait.speaker !== '병철'}
        position='right'
      />
      <PortraitCharacterImage
        src={byungcheolUrl || '/byungcheol.png'}
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
