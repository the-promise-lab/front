import {
  useStartNewGame,
  useContinueGame,
  PauseMenu,
  useGameFlowStore,
} from '@processes/game-flow';
import { BackgroundPortal } from '@shared/background-portal';
import { useButtonClickSfx } from '@shared/audio';
import { isDevEnv } from '@shared/lib/utils';

export default function MainMenu() {
  const playButtonClick = useButtonClickSfx({ variant: 'default' });
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

  const handleCreateNewGameSession = () => {
    playButtonClick();
    createNewGameSession();
  };

  const handleContinueGameSession = () => {
    playButtonClick();
    continueGameSession();
  };

  return (
    <div className='relative h-full w-full overflow-hidden'>
      <BackgroundPortal>
        <video
          src='/video/splash_main.mp4'
          autoPlay
          loop
          muted
          playsInline
          className='fixed inset-0 -z-10 h-full w-full object-cover'
        />
        <div className='fixed inset-0 -z-9 bg-black/40' />
      </BackgroundPortal>
      {/* 중앙 메인 컨텐츠 */}
      <div className='flex h-full flex-col items-center justify-end pb-30'>
        {/* <div className='py-30 text-center'>
          <img
            src='/image/mainPage/game_logo.svg'
            alt='back to the future'
            className='mx-auto h-62 w-400'
          />
        </div> */}

        {/* 게임 시작 버튼들 */}
        <div className='flex flex-col items-center justify-center gap-2'>
          {/* 새 게임 버튼 */}
          <button
            onClick={handleCreateNewGameSession}
            disabled={isCreating}
            className='block h-30 w-134 leading-none transition-all disabled:cursor-not-allowed disabled:opacity-50'
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
                onClick={handleContinueGameSession}
                className='block h-30 w-134 leading-none transition-all'
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
                className='block h-30 w-134 leading-none disabled:cursor-not-allowed disabled:opacity-50'
              >
                <img
                  src='/image/mainPage/main_continue_game_btn .svg'
                  alt='이어할 세션이 없습니다'
                  className='block leading-none'
                />
              </button>
            ))}

          <PauseMenu
            renderButton={openPauseMenu => (
              <button
                onClick={openPauseMenu}
                className='block h-30 w-134 leading-none transition-all'
              >
                <img
                  src='/image/mainPage/main_setting_btn.svg'
                  alt='설정'
                  className='block leading-none'
                />
              </button>
            )}
          />
        </div>
      </div>

      {/* Debug Button */}
      {isDevEnv() && (
        <button
          onClick={() => useGameFlowStore.getState().goto('RESULT_REPORT')}
          className='absolute right-4 bottom-4 z-50 rounded bg-red-500 px-2 py-1 text-xs text-white opacity-50 hover:opacity-100'
        >
          Debug: Result Report
        </button>
      )}
    </div>
  );
}
