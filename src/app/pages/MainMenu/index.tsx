import { useGameFlowStore } from '../../../processes/game-flow';
import TmpDesignSystemPreview from './TmpDesignSystemPreview';
import TmpSoundPreview from './TmpSoundPreview';
import { PauseMenu } from '@widgets/menu';

export default function MainMenu() {
  const handleInventory = () => {
    // TODO: 가방/인벤토리 화면으로 이동
    console.log('가방 버튼 클릭');
  };
  return (
    <div className='relative h-dvh w-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100'>
      {/* 상단 우측 일시정지 버튼 */}
      <div className='absolute top-4 right-4 z-10'>
        <PauseMenu />
      </div>

      {/* 좌측 하단 가방 버튼 */}
      <div className='absolute bottom-4 left-4 z-10'>
        <button
          onClick={handleInventory}
          className='bg-opacity-80 hover:bg-opacity-100 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-105 active:scale-95'
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            className='text-gray-700'
          >
            <path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z' />
            <path d='M3 6h18' />
            <path d='M16 10a4 4 0 0 1-8 0' />
          </svg>
        </button>
      </div>

      {/* 상단 사용자 정보 */}
      <div className='absolute top-4 left-4 z-10'>
        <div className='bg-opacity-80 flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-lg'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-purple-500'>
            <span className='text-sm font-bold text-white'>U</span>
          </div>
          <span className='font-medium text-gray-700'>사용자님</span>
        </div>
      </div>

      {/* 중앙 메인 컨텐츠 */}
      <div className='flex h-full flex-col items-center justify-center p-8'>
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-800'>The Promise</h1>
          <p className='text-lg text-gray-600'>재난 대비 훈련 게임</p>
        </div>

        {/* 게임 시작 버튼 */}
        <button
          onClick={() => {
            // 게임 시작 시 상태 초기화
            useGameFlowStore.getState().reset();
            useGameFlowStore.getState().goto('PROGRESS');
          }}
          className='transform rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-12 py-4 text-xl font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-indigo-700 hover:shadow-2xl active:scale-95 active:from-blue-700 active:to-indigo-800'
        >
          🎮 게임 시작하기
        </button>

        {/* 부가 정보 */}
        <div className='mt-12 text-center'>
          <p className='mb-2 text-sm text-gray-500'>
            재난 상황에서 필요한 물품을 선택하고 준비하세요
          </p>
          <div className='flex items-center justify-center gap-4 text-xs text-gray-400'>
            <span>🏠 가정용품</span>
            <span>🍞 식료품</span>
            <span>👕 의류</span>
          </div>
        </div>
      </div>

      {/* 배경 장식 요소들 */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='bg-opacity-30 absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-blue-200 blur-xl'></div>
        <div className='bg-opacity-30 absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full bg-indigo-200 blur-xl'></div>
        <div className='bg-opacity-30 absolute top-3/4 left-1/3 h-24 w-24 rounded-full bg-purple-200 blur-xl'></div>
      </div>

      <TmpDesignSystemPreview />
      <TmpSoundPreview />
    </div>
  );
}
