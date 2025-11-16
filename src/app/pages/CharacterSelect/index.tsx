import { useGameFlowStore } from '@processes/game-flow/model/useGameFlowStore';
import { CharacterSelect } from '@features/character-selection';
import { useShallow } from 'zustand/react/shallow';
import type { SelectCharacterSetResultDto } from '@api/models/SelectCharacterSetResultDto';
import { adaptPlayingCharacterFromApi } from '@entities/game-session';
import { useState } from 'react';
import { cn } from '@shared/lib/utils';

export default function CharacterSelectPage() {
  const { goto, savePlayingCharacters } = useGameFlowStore(
    useShallow(state => ({
      goto: state.goto,
      savePlayingCharacters: state.savePlayingCharacters,
    }))
  );
  const [skip, setSkip] = useState(false);

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

  const handleNext = () => {
    console.log(
      `Goto ${skip ? 'BAG_SELECT' : 'INTRO_STORY'} from CHARACTER_SELECT`
    );
    if (skip) {
      goto('BAG_SELECT');
    } else {
      goto('INTRO_STORY');
    }
  };

  return (
    <div className='relative h-full w-full'>
      <CharacterSelect
        onNext={handleNext}
        onBack={() => goto('MAIN_MENU')}
        onSelectSuccess={handleSelectSuccess}
      />

      {/* 테스트용 스킵 버튼 - 우측 상단에 작게 배치 */}
      <button
        onClick={() => setSkip(true)}
        className={cn(
          'absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-xs font-bold text-white shadow-lg transition-colors hover:bg-yellow-400',
          { 'bg-yellow-500/80': skip }
        )}
        title='가방 선택으로 스킵 (테스트용)'
      >
        ⏭
      </button>
    </div>
  );
}
