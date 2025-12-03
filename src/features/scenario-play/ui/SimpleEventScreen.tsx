import PortraitScreen from '@entities/portrait-screen';
import type { ScenarioEvent } from '../model/types';
import type { PlayingCharacter } from '@entities/game-session';

interface SimpleEventScreenProps {
  event: ScenarioEvent;
  playingCharacters: PlayingCharacter[];
  onComplete?: () => void;
}

/**
 * 시나리오 SIMPLE 이벤트 화면
 * - ScenarioEvent를 받아서 PortraitScreen으로 렌더링
 */
export default function SimpleEventScreen({
  event,
  playingCharacters,
  onComplete,
}: SimpleEventScreenProps) {
  // ScenarioEvent에서 portrait 데이터 추출
  const speaker = event.characters.find(c => c.isSpeaker);
  const portrait = {
    speaker: speaker?.characterCode ?? '',
    text: event.script ?? '',
  };

  return (
    <PortraitScreen
      portrait={portrait}
      playingCharacters={playingCharacters}
      onComplete={onComplete}
    />
  );
}
