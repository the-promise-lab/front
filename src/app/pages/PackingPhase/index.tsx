import { ShelfSelection } from '@features/shelf-selection';
import { useGameFlowStore } from '@processes/game-flow';

export default function PackingPhase() {
  const { back, next } = useGameFlowStore();

  return (
    <>
      <ShelfSelection onBack={back} />
      <button
        className='fixed right-0 bottom-0 z-50 h-10 w-10 rounded-full bg-gray-900 text-xs text-gray-50'
        onClick={next}
      >
        다음
      </button>
    </>
  );
}
