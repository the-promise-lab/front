import { useState } from 'react';
import { useGameFlowStore } from '../..';
import { IconCloseButton } from '@features/event-phase/ui/kit/icon-button';
import { cn } from '@shared/lib/utils';
import LogoutConfirmModal from '@shared/ui/LogoutConfirmModal';
import { AnimatePresence, motion } from 'framer-motion';
import { CharacterInfoView } from './CharacterInfoView';
import { SettingsView } from './SettingsView';
import { ResultReportView } from './ResultReportView';
import { TeamIntroView } from './TeamIntroView';
import { useShallow } from 'zustand/react/shallow';

type MenuCategory =
  | 'character-info'
  | 'settings'
  | 'result-report'
  | 'team-intro';

const MENU_CATEGORIES = [
  { id: 'character-info' as MenuCategory, label: '캐릭터 정보' },
  { id: 'settings' as MenuCategory, label: '설정' },
  { id: 'result-report' as MenuCategory, label: '결과리포트' },
  { id: 'team-intro' as MenuCategory, label: '프로젝트 팀 소개' },
] as const;

export default function PauseMenu() {
  const { isPauseMenuOpen, closePauseMenu } = useGameFlowStore(
    useShallow(state => ({
      isPauseMenuOpen: state.isPauseMenuOpen,
      closePauseMenu: state.closePauseMenu,
    }))
  );
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>('character-info');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    const { useAuthStore } = await import('@shared/auth/model/useAuthStore');
    await useAuthStore.getState().logout();
    useGameFlowStore.getState().goto('LOGIN');
    setIsLogoutModalOpen(false);
    closePauseMenu();
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const renderContent = () => {
    switch (selectedCategory) {
      case 'character-info':
        return <CharacterInfoView />;
      case 'settings':
        return (
          <SettingsView onLogoutClick={() => setIsLogoutModalOpen(true)} />
        );
      case 'result-report':
        return <ResultReportView />;
      case 'team-intro':
        return <TeamIntroView />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isPauseMenuOpen ? (
          <>
            {/* 블러 배경 오버레이 - 뒷배경이 보이도록 투명하게 */}
            <motion.div
              className='fixed inset-0 z-[100] bg-black/30 backdrop-blur-lg'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePauseMenu}
            />

            {/* 팝업 메뉴 - 전체 화면 덮기 */}
            <motion.div
              className='fixed inset-0 z-[101] flex flex-col'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              {/* 닫기 버튼 - 화면 우측 상단 */}
              <motion.div
                className='absolute top-10 right-10 z-[102]'
                initial={{ opacity: 0, scale: 0.8, y: -12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <IconCloseButton onClick={closePauseMenu} />
              </motion.div>

              {/* 팝업 메뉴 컨텐츠 - 전체 화면, 뒷배경이 보이도록 투명하게 */}
              <motion.div
                className={cn(
                  'relative flex h-full w-full',
                  'bg-black/40 backdrop-blur-xl',
                  'overflow-hidden'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* 좌측 카테고리 목록 */}
                <aside className='w-[260px] border-r border-white/10 bg-black/40 px-10 py-16'>
                  <div className='flex flex-col gap-4'>
                    {MENU_CATEGORIES.map(category => {
                      const isActive = category.id === selectedCategory;
                      return (
                        <motion.button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={cn(
                            'rounded-full px-6 py-3 text-left text-base font-semibold transition-all',
                            isActive
                              ? 'border border-white/40 bg-white/10 text-white shadow-[0_0_24px_rgba(255,255,255,0.15)]'
                              : 'border border-transparent text-white/55 hover:border-white/20 hover:text-white'
                          )}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {category.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </aside>

                {/* 우측 내용 영역 */}
                <main className='flex flex-1 flex-col overflow-y-auto'>
                  <div className='flex-1 p-16'>{renderContent()}</div>
                </main>
              </motion.div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* 로그아웃 확인 모달 */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
}
