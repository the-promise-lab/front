import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';
import { IconCloseButton } from '@shared/ui/icon-button';
import type { ReactNode } from 'react';

export interface MenuItem<T extends string = string> {
  id: T;
  label: { kor: string; eng: string };
}

interface GlassMenuLayoutProps<T extends string = string> {
  menuItems: readonly MenuItem<T>[];
  selectedId: T;
  onSelect: (id: T) => void;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

export function GlassMenuLayout<T extends string = string>({
  menuItems,
  selectedId,
  onSelect,
  onClose,
  children,
  className,
  headerContent,
}: GlassMenuLayoutProps<T> & { headerContent?: ReactNode }) {
  return (
    <>
      {/* 블러 배경 오버레이 - 뒷배경이 보이도록 투명하게 */}
      <motion.div
        className='fixed inset-0 z-100 bg-black/30 backdrop-blur-lg'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* 팝업 메뉴 - 전체 화면 덮기 */}
      <motion.div
        className={cn(
          'pointer-events-auto fixed inset-0 z-101 flex flex-col',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* 헤더 영역 (고정 높이) */}
        <div className='relative flex h-45 w-full shrink-0 items-center px-10'>
          {/* 헤더 컨텐츠 (좌측) */}
          <div className='flex-1'>{headerContent}</div>

          {/* 닫기 버튼 (우측) */}
          {onClose && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <IconCloseButton onClick={onClose} />
            </motion.div>
          )}
        </div>

        {/* 메인 컨텐츠 영역 (나머지 높이) */}
        <motion.div
          className={cn(
            'relative flex w-full flex-1 overflow-hidden'
            // 전체 배경 제거 (투명)
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 }}
        >
          {/* 좌측 카테고리 목록 - 배경 제거, 위치 조정 */}
          <aside className='w-120 px-10 pt-4'>
            <div className='flex flex-col gap-4'>
              {menuItems.map(item => {
                const isActive = item.id === selectedId;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => onSelect(item.id)}
                    className={cn(
                      'rounded-full px-6 py-3 text-left text-base font-semibold transition-all',
                      isActive
                        ? 'border border-white/40 bg-white/10 text-white shadow-[0_0_24px_rgba(255,255,255,0.15)]'
                        : 'border border-transparent text-white/55 hover:border-white/20 hover:text-white'
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label.kor}
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* 우측 내용 영역 */}
          <main className='flex flex-1 flex-col overflow-y-auto'>
            <div className='flex-1 px-16 pt-4 pb-16'>{children}</div>
          </main>
        </motion.div>
      </motion.div>
    </>
  );
}
