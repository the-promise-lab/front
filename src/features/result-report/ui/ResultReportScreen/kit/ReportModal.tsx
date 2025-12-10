import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IconXWhite } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** 타이틀 왼쪽에 세로 바 표시 여부 */
  showTitleBar?: boolean;
  children: ReactNode;
}

/**
 * 결과 보고서용 공통 모달 컴포넌트
 * - 글래스모피즘 배경
 * - 애니메이션 (fade in/out)
 * - 헤더 (타이틀 + 닫기 버튼)
 */
export function ReportModal({
  isOpen,
  onClose,
  title,
  showTitleBar = false,
  children,
}: ReportModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-105 bg-black/40 backdrop-blur-2xl'
          onClick={onClose}
        >
          <div className='absolute top-1/2 left-1/2 h-fit w-fit -translate-x-1/2 -translate-y-1/2'>
            <ReportModalPanel className='h-[90dvh] w-auto' />
            <div
              className='absolute inset-0 flex flex-col gap-5 p-8 px-11'
              onClick={e => e.stopPropagation()}
            >
              {/* 헤더: 타이틀 + 닫기 버튼 */}
              <div className='flex shrink-0 items-center justify-between'>
                <div className='flex items-center gap-3'>
                  {showTitleBar && <div className='h-9 w-1.5 bg-white' />}
                  <Typography variant='dialogue-m'>{title}</Typography>
                </div>
                <button onClick={onClose} className='size-18'>
                  <IconXWhite className='size-full' />
                </button>
              </div>

              {/* 컨텐츠 영역 */}
              <div className='scrollbar-hide min-h-0 flex-1 overflow-y-auto'>
                {children}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReportModalPanel({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 1315 888'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        d='M24 1H1291C1303.7 1 1314 11.2975 1314 24V864C1314 876.703 1303.7 887 1291 887H24C11.2975 887 1 876.703 1 864V24C1 11.2975 11.2975 1 24 1Z'
        fill='url(#paint0_linear_report_modal)'
        fillOpacity='0.8'
        stroke='url(#paint1_radial_report_modal)'
        strokeWidth='2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_report_modal'
          x1='-5.79665e-05'
          y1='961.26'
          x2='1346.43'
          y2='545.875'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0.3' />
          <stop offset='1' stopColor='white' stopOpacity='0.15' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_report_modal'
          cx='0'
          cy='0'
          r='1'
          gradientTransform='matrix(1222.95 -506.16 278.75 307.121 710.1 444)'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0.4' />
        </radialGradient>
      </defs>
    </svg>
  );
}
