import { useSetBackground } from '@shared/background';
import { ResultReportScreen } from '@features/result-report';
import { useGameFlowStore } from '@processes/game-flow';
import { useShallow } from 'zustand/react/shallow';

export default function ResultReportPage() {
  useSetBackground({
    image: 'bg-2.png',
  });
  const { goto } = useGameFlowStore(
    useShallow(state => ({
      goto: state.goto,
    }))
  );

  const handleGoToMainMenu = () => {
    goto('MAIN_MENU');
  };

  return <ResultReportScreen onGoToMainMenu={handleGoToMainMenu} />;
}
