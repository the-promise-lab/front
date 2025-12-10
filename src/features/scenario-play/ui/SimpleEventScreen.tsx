import { useAssetStore } from '@shared/preload-assets';
import { useShallow } from 'zustand/react/shallow';
import { PortraitScreen, type PortraitCharacter } from '@entities/portrait';
import type { ScenarioEvent } from '../model/types';

// 시나리오 전용 이름 매핑(선택 화면에 노출되지 않는 등장인물용)
const SCENARIO_NAME_FALLBACKS: Record<string, string> = {
  char_sua: '수아',
};

interface SimpleEventScreenProps {
  event: ScenarioEvent;
  onComplete?: () => void;
}

export default function SimpleEventScreen({
  event,
  onComplete,
}: SimpleEventScreenProps) {
  const getObjectUrl = useAssetStore(useShallow(state => state.getObjectUrl));
  const getDisplayName = (code?: string | null, name?: string | null) =>
    name ?? (code ? (SCENARIO_NAME_FALLBACKS[code] ?? code) : null);

  const speaker = event.characters.find(c => c.isSpeaker);
  const portrait = {
    speaker:
      getDisplayName(speaker?.characterCode, speaker?.characterDetail?.name) ??
      '',
    text: event.script ?? '',
  };

  const portraitCharacters: PortraitCharacter[] = event.characters.map(c => ({
    id: c.characterCode,
    name: getDisplayName(c.characterCode, c.characterDetail?.name),
    profileImage:
      getObjectUrl(c.imageUrl || '') ??
      getObjectUrl(c.characterDetail?.image || '') ??
      c.imageUrl ??
      c.characterDetail?.image ??
      null,
    position: (c.position as PortraitCharacter['position']) ?? null,
  }));

  if (portraitCharacters.length === 1) {
    portraitCharacters[0] = {
      ...portraitCharacters[0],
      position: 'center',
    };
  }

  return (
    <PortraitScreen
      portrait={portrait}
      portraitCharacters={portraitCharacters}
      onComplete={onComplete}
    />
  );
}
