import { useGameFlowStore } from '@processes/game-flow';
import { useSetBackground } from '@shared/background';

export default function ResultReportPage() {
  useSetBackground({
    color: '#000',
    className: 'bg-black',
  });

  const handleGoToMainMenu = () => {
    useGameFlowStore.getState().goto('MAIN_MENU');
  };

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-8 text-white'>
      <h1 className='text-4xl font-bold'>결과 보고서</h1>
      <div className='text-xl'>게임 결과가 여기에 표시됩니다.</div>

      <button
        onClick={handleGoToMainMenu}
        className='rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-200'
      >
        메인 메뉴로 돌아가기
      </button>
    </div>
  );
}
