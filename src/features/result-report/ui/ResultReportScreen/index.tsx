import { useState } from 'react';
import { GlassMenuLayout } from '@shared/ui/layout/GlassMenuLayout';
import { BackgroundPortal } from '@shared/background-portal';
import Typography from '@shared/ui/Typography';
import type { User } from '@shared/auth/model/useAuthStore';

type ResultMenuCategory = 'play-report' | 'ranking';

const RESULT_MENU_CATEGORIES = [
  { id: 'play-report', label: { kor: '최종결과', eng: 'Play Report' } },
  { id: 'ranking', label: { kor: '랭킹', eng: 'Ranking' } },
] as const;

interface ResultReportScreenProps {
  onGoToMainMenu: () => void;
  user: User | null;
}

export function ResultReportScreen({
  onGoToMainMenu,
  user,
}: ResultReportScreenProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<ResultMenuCategory>('play-report');

  const renderContent = () => {
    switch (selectedCategory) {
      case 'play-report':
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
      case 'ranking':
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
        headerContent={
          <div className='flex items-center gap-16'>
            {/* 임시 유저 정보 (나중에 실제 데이터로 교체) */}
            <div className='flex w-110 items-center gap-4.5 px-10'>
              <div className='h-12 w-12 rounded-full bg-white' />
              <Typography variant='button-b' className='text-white'>
                {user?.name}
              </Typography>
            </div>
            <div className='inline-flex h-13.25 items-center gap-3'>
              <div className='h-11.75 w-2 bg-white' />
              <Typography variant='title' className='leading-normal text-white'>
                {
                  RESULT_MENU_CATEGORIES.find(c => c.id === selectedCategory)
                    ?.label.eng
                }
              </Typography>
            </div>
          </div>
        }
      >
        {renderContent()}
      </GlassMenuLayout>
    </BackgroundPortal>
  );
}
