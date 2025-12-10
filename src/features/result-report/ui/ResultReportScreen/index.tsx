import { useState } from 'react';
import { GlassMenuLayout } from '@shared/ui/layout/GlassMenuLayout';
import { BackgroundPortal } from '@shared/background-portal';
import Typography from '@shared/ui/Typography';
import type { User } from '@shared/auth/model/useAuthStore';
import { PlayReportContent } from './PlayReportContent';
import RankingContent from './RankingContent';
import CollectionContent from './CollectionContent';
import HistoryContent from './HistoryContent';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';

const RESULT_MENU_CATEGORIES = [
  { id: 'play-report', label: { kor: '최종결과', eng: 'Play Report' } },
  { id: 'ranking', label: { kor: '랭킹', eng: 'Ranking' } },
  { id: 'collection', label: { kor: '컬렉션', eng: 'Collection' } },
  { id: 'history', label: { kor: '히스토리', eng: 'History' } },
] as const;

type ResultMenuCategory = (typeof RESULT_MENU_CATEGORIES)[number]['id'];

interface ResultReportScreenProps {
  onClose: () => void;
  user: User | null;
  sessionId: string | null;
  isEndingScreen?: boolean;
  onBackButtonClick?: () => void;
}

export function ResultReportScreen({
  onClose,
  user,
  sessionId,
  isEndingScreen = false,
  onBackButtonClick,
}: ResultReportScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<ResultMenuCategory>(
    isEndingScreen ? 'ranking' : 'play-report'
  );

  const renderContent = () => {
    switch (selectedCategory) {
      case 'play-report':
        return <PlayReportContent sessionId={sessionId} />;
      case 'ranking':
        return <RankingContent />;
      case 'collection':
        return <CollectionContent activeCharacterSetId={1} />;
      case 'history':
        return <HistoryContent />;
      default:
        return null;
    }
  };

  const menuItems = isEndingScreen
    ? RESULT_MENU_CATEGORIES.filter(item => item.id !== 'play-report')
    : RESULT_MENU_CATEGORIES;

  return (
    <BackgroundPortal>
      <EdgeGradient />
      <GlassMenuLayout
        onBackButtonClick={onBackButtonClick}
        menuItems={menuItems}
        selectedId={selectedCategory}
        onSelect={id => setSelectedCategory(id as ResultMenuCategory)}
        onClose={onClose}
        menuHeader={
          /* 임시 유저 정보 (나중에 실제 데이터로 교체) */
          <div className='flex items-center gap-4.5 px-5'>
            <div className='h-12 w-12 rounded-full bg-white' />
            <Typography variant='button-b' className='text-white'>
              {user?.name}
            </Typography>
          </div>
        }
        className='mx-auto aspect-video h-dvh'
      >
        {renderContent()}
      </GlassMenuLayout>
    </BackgroundPortal>
  );
}
