import { useState } from 'react';
import { useGameFlowStore } from '../..';
import { useAuthStore } from '@shared/auth/model/useAuthStore';
import {
  IconCloseButton,
  IconPauseButton,
} from '@features/event-phase/ui/kit/icon-button';
import Typography from '@shared/ui/Typography';
import { cn } from '@shared/lib/utils';
import LogoutConfirmModal from '@shared/ui/LogoutConfirmModal';

const MENU_ITEMS = [
  { id: 'character-info', label: '캐릭터 정보' },
  { id: 'progress', label: '진행도' },
  { id: 'sound', label: '사운드' },
  { id: 'result-report', label: '결과리포트' },
  { id: 'logout', label: '로그아웃' },
] as const;

export default function PauseMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const { logout } = useAuthStore();

  const handleMenuItemClick = (itemId: string) => {
    console.log('Menu item clicked:', itemId);
    // TODO: 각 메뉴 항목별 처리 로직 추가
    switch (itemId) {
      case 'logout':
        // 로그아웃 확인 모달 열기
        setIsLogoutModalOpen(true);
        break;
      default:
        // 다른 메뉴 항목들은 추후 구현
        break;
    }
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleLogoutConfirm = async () => {
    // 메인 메뉴와 동일한 로그아웃 처리
    await logout();
    useGameFlowStore.getState().goto('LOGIN');
    setIsLogoutModalOpen(false);
    onClose();
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <IconPauseButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <>
          {/* 블러 배경 오버레이 */}
          <div
            className='fixed inset-0 z-[100] backdrop-blur-md'
            onClick={onClose}
          />

          {/* 닫기 버튼 - 화면 우측 상단 */}
          <div className='fixed top-10 right-10 z-[102]'>
            <IconCloseButton onClick={onClose} />
          </div>

          {/* 팝업 메뉴 */}
          <div className='fixed inset-0 z-[101] flex items-center'>
            <div
              className={cn(
                'relative w-[500px] max-w-[90vw]',
                'rounded-lg p-10'
              )}
              onClick={e => e.stopPropagation()}
            >
              {/* 메뉴 항목들 */}
              <div className='flex flex-col gap-4'>
                {MENU_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuItemClick(item.id)}
                    className={cn(
                      'relative w-full',
                      'border border-white/10 bg-black/60',
                      'rounded-md px-10 py-8',
                      'text-left',
                      'transition-all duration-200',
                      'hover:border-white/20 hover:bg-black/80',
                      'active:scale-[0.98]'
                    )}
                  >
                    <Typography variant='dialogue-b' className='text-white'>
                      {item.label}
                    </Typography>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 로그아웃 확인 모달 */}
          <LogoutConfirmModal
            isOpen={isLogoutModalOpen}
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
          />
        </>
      )}
    </>
  );
}
