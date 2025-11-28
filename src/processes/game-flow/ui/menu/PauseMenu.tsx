import { useCallback, useState, type ReactNode } from 'react';
import { useGameFlowStore } from '../..';
import { IconPauseButton } from '@shared/ui/icon-button';
import { cn } from '@shared/lib/utils';
import LogoutConfirmModal from '@shared/ui/LogoutConfirmModal';
import { AnimatePresence } from 'framer-motion';
import { CharacterInfoView } from './CharacterInfoView';
import { SettingsView } from './SettingsView';
import { ResultReportView } from './ResultReportView';
import { TeamIntroView } from './TeamIntroView';
import { GlassMenuLayout } from '@shared/ui/layout/GlassMenuLayout';
import { BackgroundPortal } from '@shared/background-portal';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';

type MenuCategory =
  | 'character-info'
  | 'settings'
  | 'result-report'
  | 'team-intro';

const MENU_CATEGORIES = [
  {
    id: 'character-info' as MenuCategory,
    label: { kor: '캐릭터 정보', eng: 'Character Info' },
  },
  { id: 'settings' as MenuCategory, label: { kor: '설정', eng: 'Settings' } },
  {
    id: 'result-report' as MenuCategory,
    label: { kor: '결과리포트', eng: 'Result Report' },
  },
  {
    id: 'team-intro' as MenuCategory,
    label: { kor: '프로젝트 팀 소개', eng: 'Project Team Introduction' },
  },
] as const;

interface PauseMenuProps {
  hidden?: boolean;
  renderButton?: (onClick: () => void) => ReactNode;
  buttonClassName?: string;
}

export default function PauseMenu({
  hidden = false,
  renderButton,
  buttonClassName,
}: PauseMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const [selectedCategory, setSelectedCategory] =
    useState<MenuCategory>('character-info');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutConfirm = async () => {
    const { useAuthStore } = await import('@shared/auth/model/useAuthStore');
    await useAuthStore.getState().logout();
    useGameFlowStore.getState().goto('LOGIN');
    setIsLogoutModalOpen(false);
    close();
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
      {renderButton ? (
        renderButton(open)
      ) : (
        <div
          className={cn(
            'absolute top-11 right-11 z-10',
            buttonClassName,
            hidden ? 'hidden' : ''
          )}
        >
          <IconPauseButton onClick={open} />
        </div>
      )}
      <BackgroundPortal>
        <EdgeGradient hidden={!isOpen} />
        <AnimatePresence>
          {isOpen ? (
            <GlassMenuLayout
              menuItems={MENU_CATEGORIES}
              selectedId={selectedCategory}
              onSelect={setSelectedCategory}
              onClose={close}
              className='mx-auto aspect-video h-dvh'
            >
              <div className='relative mt-45 h-full'>
                <div className='absolute top-0 left-0 h-[90%] w-0.25 bg-white' />
                {renderContent()}
              </div>
            </GlassMenuLayout>
          ) : null}
        </AnimatePresence>
      </BackgroundPortal>

      {/* 로그아웃 확인 모달 */}
      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </>
  );
}
