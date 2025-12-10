import { ResultReportScreen } from '@features/result-report';
import { useAuthStore } from '@shared/auth/model/useAuthStore';

interface Props {
  onClose: () => void;
  onBackButtonClick: () => void;
}

export function ResultReportView({ onClose, onBackButtonClick }: Props) {
  const user = useAuthStore.getState().user;
  return (
    <ResultReportScreen
      sessionId={null}
      user={user}
      isEndingScreen
      onClose={onClose}
      onBackButtonClick={onBackButtonClick}
    />
  );
}
