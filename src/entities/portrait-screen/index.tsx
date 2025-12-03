import { useEffect, useState, type MouseEvent } from 'react';
import PortraitBanner from './PortraitBanner';
import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import PortraitCharacterImage from './PortraitCharacterImage';
import type { PlayingCharacter } from '@entities/game-session';

const PORTRAIT_START_DELAY = 1000;

export interface PortraitData {
  speaker: string;
  text: string;
}

interface PortraitScreenProps {
  /** 현재 표시할 대사 */
  portrait: PortraitData;
  /** 표시할 캐릭터 목록 (최대 2명) */
  playingCharacters: PlayingCharacter[];
  /** 대사 클릭 시 호출되는 콜백 */
  onComplete?: () => void;
}

/**
 * 범용 초상화 화면 컴포넌트
 * - 캐릭터 이미지와 대사 배너를 표시
 * - 발화자에 따라 캐릭터 하이라이트
 */
export default function PortraitScreen({
  portrait,
  playingCharacters,
  onComplete,
}: PortraitScreenProps) {
  const [portraitStarted, setPortraitStarted] = useState(false);
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));

  const renderCharacters = playingCharacters.slice(0, 2);
  const positions =
    renderCharacters.length === 1
      ? (['center'] as const)
      : (['left', 'right'] as const);
  const characterImages = renderCharacters.map(character =>
    getObjectUrl(character?.profileImage || '')
  );

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onComplete?.();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setPortraitStarted(true);
    }, PORTRAIT_START_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const currentSpeaker = portrait.speaker?.trim();
  const isSpeaker = (characterName?: string | null) =>
    !!currentSpeaker && !!characterName && currentSpeaker === characterName;

  return (
    <div className='relative h-full w-full'>
      {renderCharacters.map((character, index) => (
        <PortraitCharacterImage
          key={character?.id ?? index}
          src={
            characterImages[index] ||
            (positions[index] === 'right' ? '/ham.png' : '/byungcheol.png')
          }
          alt={character?.name || `character-${index}`}
          dimmed={!isSpeaker(character?.name)}
          position={positions[index]}
        />
      ))}
      {portraitStarted && portrait.text && (
        <PortraitBanner
          onClick={handleClick}
          key={`${portrait.speaker}-${portrait.text}`}
          portrait={portrait.text}
          characterName={portrait.speaker}
        />
      )}
    </div>
  );
}

// Re-export sub-components for advanced usage
export { PortraitBanner, PortraitCharacterImage };
export type { PortraitData as Portrait };
