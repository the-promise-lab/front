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

  const handleSkipToInventory = () => {
    // 인트로 이벤트를 건너뛰고 바로 가방 선택으로 이동
    goto('BAG_SELECT');
  };

  return (
    <div className='relative h-full w-full'>
      <CharacterSelect
        onNext={() => {
          console.log('Calling next() from CHARACTER_SELECT');
          goto('INTRO_STORY');
        }}
        onBack={() => goto('MAIN_MENU')}
        onSelectSuccess={handleSelectSuccess}
      />

      {/* 테스트용 스킵 버튼 - 우측 상단에 작게 배치 */}
      <button
        onClick={handleSkipToInventory}
        className='absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/80 text-xs font-bold text-white shadow-lg transition-colors hover:bg-yellow-400'
        title='가방 선택으로 스킵 (테스트용)'
      >
        ⏭
      </button>
    </div>
  );
}
