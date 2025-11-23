import { useState } from 'react';
import { GlassMenuLayout } from '@shared/ui/layout/GlassMenuLayout';
import { BackgroundPortal } from '@shared/background-portal';

type ResultMenuCategory = 'overview' | 'details';

const RESULT_MENU_CATEGORIES = [
  { id: 'overview', label: '개요' },
  { id: 'details', label: '상세 정보' },
] as const;

interface ResultReportScreenProps {
  onGoToMainMenu: () => void;
}

export function ResultReportScreen({
  onGoToMainMenu,
}: ResultReportScreenProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ResultMenuCategory>('overview');

  const renderContent = () => {
    switch (selectedCategory) {
      case 'overview':
        return (
          <div className='flex flex-col gap-8 text-white'>
            <h1 className='text-4xl font-bold'>결과 보고서</h1>
            <div className='text-xl'>게임 결과 개요가 여기에 표시됩니다.</div>
            <button
              onClick={onGoToMainMenu}
              className='w-fit rounded bg-white px-6 py-3 text-black transition-colors hover:bg-gray-200'
            >
              메인 메뉴로 돌아가기
            </button>
          </div>
        );
      case 'details':
        return (
          <div className='flex flex-col gap-8 text-white'>
            <h1 className='text-4xl font-bold'>상세 정보</h1>
            <div className='text-xl'>상세한 게임 결과가 여기에 표시됩니다.</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <BackgroundPortal>
      <GlassMenuLayout
        menuItems={RESULT_MENU_CATEGORIES}
        selectedId={selectedCategory}
        onSelect={id => setSelectedCategory(id as ResultMenuCategory)}
        onClose={onGoToMainMenu}
      >
        {renderContent()}
      </GlassMenuLayout>
    </BackgroundPortal>
  );
}
