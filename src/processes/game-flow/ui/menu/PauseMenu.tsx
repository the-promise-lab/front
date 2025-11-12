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
import { AnimatePresence, motion } from 'framer-motion';

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
      <AnimatePresence>
        {isOpen ? (
          <>
            {/* 블러 배경 오버레이 */}
            <motion.div
              className='fixed inset-0 z-[100] bg-black/60 backdrop-blur-md'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* 닫기 버튼 - 화면 우측 상단 */}
            <motion.div
              className='fixed top-10 right-10 z-[102]'
              initial={{ opacity: 0, scale: 0.8, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <IconCloseButton onClick={onClose} />
            </motion.div>

            {/* 팝업 메뉴 */}
            <motion.div
              className='fixed inset-0 z-[101] flex items-center justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className={cn(
                  'relative w-[520px] max-w-[90vw]',
                  'rounded-3xl bg-black/70 p-10 shadow-2xl shadow-black/40 backdrop-blur'
                )}
                initial={{ y: 36, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 36, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                onClick={e => e.stopPropagation()}
              >
                <div className='flex flex-col gap-4'>
                  {MENU_ITEMS.map(item => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id)}
                      className={cn(
                        'relative w-full',
                        'border border-white/10 bg-black/60',
                        'rounded-xl px-10 py-8',
                        'text-left',
                        'transition-all duration-200',
                        'hover:border-white/20 hover:bg-black/80'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Typography variant='dialogue-b' className='text-white'>
                        {item.label}
                      </Typography>
                    </motion.button>
                  ))}
                </div>
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
