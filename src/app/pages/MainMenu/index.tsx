import {
  useStartNewGame,
  useContinueGame,
  useGameFlowStore,
} from '@processes/game-flow';
import TmpDesignSystemPreview from './TmpDesignSystemPreview';
import TmpSoundPreview from './TmpSoundPreview';
import { useSetBackground } from '@shared/background';
import { useShallow } from 'zustand/react/shallow';

export default function MainMenu() {
  useSetBackground({
    color: '#fff',
    className: 'bg-gradient-to-br from-blue-50 to-indigo-100',
  });
  // 새 게임 시작
  const {
    createNewGameSession,
    isCreating,
    isError: isCreateError,
  } = useStartNewGame();
  // 게임 이어하기
  const {
    continueGameSession,
    hasSession,
    isLoading: isLoadingSession,
    isError: isSessionError,
  } = useContinueGame();
  const { openPauseMenu } = useGameFlowStore(
    useShallow(state => ({
      openPauseMenu: state.openPauseMenu,
    }))
  );

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      {/* 중앙 메인 컨텐츠 */}
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center'>
          <img
            src='/image/mainPage/game_logo.svg'
            alt='back to the future'
            className='mx-auto h-[185px] w-[380px]'
          />
        </div>

        {/* 게임 시작 버튼들 */}
        <div className='flex flex-col items-center justify-center gap-[2px]'>
          {/* 새 게임 버튼 */}
          <button
            onClick={createNewGameSession}
            disabled={isCreating}
            className='block h-[60px] w-[230px] leading-none transition-all disabled:cursor-not-allowed disabled:opacity-50'
          >
            <img
              src='/image/mainPage/main_new_game_btn.svg'
              alt='새 게임 시작'
              className='block leading-none'
            />
          </button>

          {isCreateError && (
            <div className='text-center text-sm text-red-500'>
              게임 생성 실패. 다시 시도해주세요.
            </div>
          )}

          {isLoadingSession && (
            <div className='text-center text-sm text-gray-500'>
              세션 확인 중...
            </div>
          )}
          {isSessionError && (
            <div className='text-center text-sm text-red-500'>
              세션 확인 실패. 새 게임을 시작해주세요.
            </div>
          )}

          {/* 이어하기 버튼 or 세션 없음 표시 */}
          {!isLoadingSession &&
            !isSessionError &&
            (hasSession ? (
              <button
                onClick={continueGameSession}
                className='block h-[60px] w-[230px] leading-none transition-all'
              >
                <img
                  src='/image/mainPage/main_continue_game_btn .svg'
                  alt='이어하기'
                  className='block leading-none'
                />
              </button>
            ) : (
              <button
                disabled
                className='block h-[60px] w-[230px] leading-none disabled:cursor-not-allowed disabled:opacity-50'
              >
                <img
                  src='/image/mainPage/main_continue_game_btn .svg'
                  alt='이어할 세션이 없습니다'
                  className='block leading-none'
                />
              </button>
            ))}

          {/* 설정 버튼 */}
          <button
            onClick={openPauseMenu}
            className='block h-[60px] w-[230px] leading-none transition-all'
          >
            <img
              src='/image/mainPage/main_setting_btn.svg'
              alt='설정'
              className='block leading-none'
            />
          </button>
        </div>
      </div>

      <TmpDesignSystemPreview />
      <TmpSoundPreview />
    </div>
  );
}
