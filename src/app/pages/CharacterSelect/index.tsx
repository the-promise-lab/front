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
    <div className='relative h-full w-full'>
      <EdgeGradient />
      {/* 헤더 이미지 - 일시정지 버튼 위치에 배치 */}
      <div className='absolute top-11 right-11 z-10'>
        <img
          src='/image/charSelect/char_select_page_header.svg'
          alt='캐릭터 선택'
          className='h-[19px] w-[277px]'
        />
      </div>
      <CharacterSelect
        onNext={handleNext}
        onBack={() => goto('MAIN_MENU')}
        onSelectSuccess={handleSelectSuccess}
      />
    </div>
  );
}
