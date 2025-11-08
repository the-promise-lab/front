import { useGameFlowStore } from '@processes/game-flow/model/useGameFlowStore';
import { CharacterSelect } from '@features/character-selection';
import { useShallow } from 'zustand/react/shallow';
import { getCharacterMetadata } from '@features/character-selection/model/characterMappings';
import type { SelectCharacterSetResponseDto } from '@api/models/SelectCharacterSetResponseDto';

export default function CharacterSelectPage() {
  const { goto, savePlayingCharacters } = useGameFlowStore(
    useShallow(state => ({
      goto: state.goto,
      savePlayingCharacters: state.savePlayingCharacters,
    }))
  );

  const handleSelectSuccess = (response: SelectCharacterSetResponseDto) => {
    // gameSession에 선택된 캐릭터 정보 + 메타데이터 저장
    const playingCharacters = response.playingCharacter
      .map(pc => {
        const metadata = getCharacterMetadata(pc.characterId);
        if (!metadata) {
          console.error(
            `[CharacterSelectPage] characterId ${pc.characterId}에 대한 메타데이터가 없습니다.`
          );
          return null;
        }
        return {
          id: pc.id,
          characterId: pc.characterId,
          currentHp: pc.currentHp,
          currentSp: pc.currentSp,
          name: metadata.name,
          fullImage: metadata.fullImage,
          thumbnailImage: metadata.thumbnailImage,
          colors: metadata.colors,
        };
      })
      .filter((pc): pc is NonNullable<typeof pc> => pc !== null);

    savePlayingCharacters({
      characterSetId: response.id,
      characterGroupId: response.characterGroupId,
      playingCharacters,
    });
  };

  return (
    <CharacterSelect
      onNext={() => {
        console.log('Calling next() from CHARACTER_SELECT');
        goto('INTRO_STORY');
      }}
      onBack={() => goto('MAIN_MENU')}
      onSelectSuccess={handleSelectSuccess}
    />
  );
}
