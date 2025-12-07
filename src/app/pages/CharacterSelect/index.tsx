import { useGameFlowStore } from '@processes/game-flow/model/useGameFlowStore';
import { CharacterSelect } from '@features/character-selection';
import { useShallow } from 'zustand/react/shallow';
import type { PlayingCharacter } from '@entities/game-session';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';

export default function CharacterSelectPage() {
  const { goto, savePlayingCharacters } = useGameFlowStore(
    useShallow(state => ({
      goto: state.goto,
      savePlayingCharacters: state.savePlayingCharacters,
    }))
  );

  const handleSelectSuccess = (result: {
    response: SelectCharacterSetResultDto;
    playingCharacters: PlayingCharacter[];
    groupName: string;
  }) => {
    savePlayingCharacters(
      {
        id: result.response.id,
        characterGroupId: result.response.characterGroupId,
        playingCharacters: result.playingCharacters,
      },
      result.groupName
    );
  };

  const handleNext = () => {
    goto('INTRO_STORY');
  };

  return (
    <>
      <EdgeGradient />
      <CharacterSelect
        onNext={handleNext}
        onBack={() => goto('MAIN_MENU')}
        onSelectSuccess={handleSelectSuccess}
      />
    </>
  );
}
