import { motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';
import { IconCloseButton } from '@shared/ui/icon-button';
import type { ReactNode } from 'react';
import Typography from '../Typography';

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
                    <MenuItemButtonBackground className='absolute top-0 right-0 h-full w-auto' />
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

function MenuItemButtonBackground({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 595 111'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_d_2493_3913)'>
        <path
          d='M0 2H538.5C567.495 2 591 25.5051 591 54.5C591 83.4949 567.495 107 538.5 107H0V2Z'
          fill='url(#paint0_linear_2493_3913)'
          fillOpacity='0.8'
          shapeRendering='crispEdges'
        />
        <path
          d='M538.5 1C568.047 1 592 24.9528 592 54.5C592 84.0472 568.047 108 538.5 108H-1V1H538.5Z'
          stroke='url(#paint1_radial_2493_3913)'
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2493_3913'
          x='-2'
          y='0'
          width='597'
          height='111'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='1' />
          <feGaussianBlur stdDeviation='0.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2493_3913'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2493_3913'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_2493_3913'
          x1='-2.60519e-05'
          y1='115.663'
          x2='279.039'
          y2='-211.541'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0.3' />
          <stop offset='1' stopColor='white' stopOpacity='0.15' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_2493_3913'
          cx='0'
          cy='0'
          r='1'
          gradientTransform='matrix(549.63 -59.85 125.279 36.315 319.14 54.5)'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0.4' />
        </radialGradient>
      </defs>
    </svg>
  );
}
