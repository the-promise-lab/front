import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';
import { IconCloseButton } from '@shared/ui/icon-button';
import type { ReactNode } from 'react';
import Typography from '../Typography';
import { GradientGlassFromEdge } from '../GradientGlassFromEdge';

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
  menuHeader?: ReactNode;
  menuPanelClassName?: string;
}

export function GlassMenuLayout<T extends string = string>({
  menuItems,
  selectedId,
  onSelect,
  onClose,
  children,
  className,
  menuHeader,
  menuPanelClassName,
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
          'pointer-events-auto fixed inset-0 z-101 flex',
          className
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* 좌측 영역: 메뉴헤더 + 메뉴 리스트 */}
        <aside className={cn('flex w-120 shrink-0 flex-col')}>
          {/* MenuHeader */}
          <div className='flex h-45 shrink-0 items-center px-16'>
            {menuHeader}
          </div>

          {/* 메뉴 리스트 */}
          <motion.div
            className={cn(
              'flex flex-1 flex-col gap-4 px-10 pt-4',
              menuPanelClassName
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 }}
          >
            {menuItems.map(item => {
              const isActive = item.id === selectedId;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    'relative -ml-10 rounded-full px-21.5 py-9 text-left transition-all'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <GradientGlassFromEdge
                      rtl
                      className='absolute! top-0 right-0'
                    />
                  )}
                  <Typography variant='button-b' className='text-white'>
                    {item.label.kor}
                  </Typography>
                </motion.button>
              );
            })}
          </motion.div>
        </aside>

        {/* 우측 영역: 컨텐츠 */}
        <motion.main
          className='relative flex h-dvh flex-1 flex-col overflow-hidden'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 }}
        >
          {/* 닫기 버튼 (우측 상단 absolute) */}
          {onClose && (
            <motion.div
              className='absolute top-10 right-10 z-10'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <IconCloseButton onClick={onClose} />
            </motion.div>
          )}

          {/* 컨텐츠 영역 */}
          <div className='relative flex h-full flex-1 flex-col overflow-hidden'>
            {children}
          </div>
        </motion.main>
      </motion.div>
    </>
  );
}
