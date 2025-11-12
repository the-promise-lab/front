import { useGameFlowStore } from '@processes/game-flow/model/useGameFlowStore';
import { CharacterSelect } from '@features/character-selection';
import { useShallow } from 'zustand/react/shallow';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import { adaptPlayingCharacterFromApi } from '@entities/game-session';

export default function CharacterSelectPage() {
  const { goto, savePlayingCharacters } = useGameFlowStore(
    useShallow(state => ({
      goto: state.goto,
      savePlayingCharacters: state.savePlayingCharacters,
    }))
  );

  const handleSelectSuccess = (response: SelectCharacterSetResultDto) => {
    const playingCharacters = response.playingCharacter
      .map(adaptPlayingCharacterFromApi)
      .filter((char): char is NonNullable<typeof char> => char !== null);

    savePlayingCharacters({
      id: response.id,
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
