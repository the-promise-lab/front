import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';
import { IconCloseButton } from '@shared/ui/icon-button';
import type { ReactNode } from 'react';

export interface MenuItem<T extends string = string> {
  id: T;
  label: string;
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
}: GlassMenuLayoutProps<T>) {
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
        {/* 닫기 버튼 - 화면 우측 상단 */}
        {onClose && (
          <motion.div
            className='absolute top-10 right-10 z-102'
            initial={{ opacity: 0, scale: 0.8, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <IconCloseButton onClick={onClose} />
          </motion.div>
        )}

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
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </aside>

          {/* 우측 내용 영역 */}
          <main className='flex flex-1 flex-col overflow-y-auto'>
            <div className='flex-1 p-16'>{children}</div>
          </main>
        </motion.div>
      </motion.div>
    </>
  );
}
