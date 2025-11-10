import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './kit/PortraitBanner';
import { useAssetStore } from '@shared/model/assetStore';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './kit/PortraitCharacterImage';
import type { PlayingCharacter } from '@entities/game-session';

const PORTRAIT_START_DELAY = 1000;

interface SinglePortraitScreenProps {
  portraits?: Array<{
    speaker: string;
    text: string;
  }>;
  playingCharacters: PlayingCharacter[];
}

export default function SinglePortraitScreen({
  portraits = [],
  playingCharacters,
}: SinglePortraitScreenProps) {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [portraitStarted, setPortraitStarted] = useState(false);
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const firstCharacterUrl = getObjectUrl(
    playingCharacters[0].profileImage || 'byungcheol.png'
  );
  const secondCharacterUrl = getObjectUrl(
    playingCharacters[1].profileImage || 'ham.png'
  );

  // 디버깅: 이미지 URL 확인
  console.log('First Character URL:', firstCharacterUrl);
  console.log('Second Character URL:', secondCharacterUrl);
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
        src={secondCharacterUrl || '/ham.png'}
        alt='person1'
        dimmed={portraitStarted && currentPortrait.speaker !== '병철'}
        position='right'
      />
      <PortraitCharacterImage
        src={firstCharacterUrl || '/byungcheol.png'}
        alt='person2'
        dimmed={portraitStarted && currentPortrait.speaker !== '헴'}
        position='left'
      />
      {portraitStarted && (
        <PortraitBanner
          onClick={handleNextPortrait}
          key={`${portraitIndex}-${currentPortrait.speaker}-${currentPortrait.text}`}
          portrait={currentPortrait.text}
          characterName={currentPortrait.speaker}
        />
      )}
    </div>
  );
}
