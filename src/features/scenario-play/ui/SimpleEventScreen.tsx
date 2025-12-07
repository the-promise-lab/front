import { PortraitScreen, type PortraitCharacter } from '@entities/portrait';
import type { ScenarioEvent } from '../model/types';

interface SimpleEventScreenProps {
  event: ScenarioEvent;
  onComplete?: () => void;
}

export default function SimpleEventScreen({
  event,
  onComplete,
}: SimpleEventScreenProps) {
  const speaker = event.characters.find(c => c.isSpeaker);
  const portrait = {
    speaker: speaker?.characterDetail?.name ?? '',
    text: event.script ?? '',
  };

  const portraitCharacters: PortraitCharacter[] = event.characters.map(c => ({
    id: c.characterCode,
    name: c.characterDetail?.name ?? null,
    profileImage: c.imageUrl ?? c.characterDetail?.image ?? null,
    position: (c.position as PortraitCharacter['position']) ?? null,
  }));

  return (
    <PortraitScreen
      portrait={portrait}
      portraitCharacters={portraitCharacters}
      onComplete={onComplete}
    />
  );
}
