import { BackgroundPortal } from '@shared/background-portal';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@shared/lib/utils';

/**
 * 16:9 컨텐츠 영역 바깥을 어둡게 처리하는 컴포넌트
 * - 중앙 영역은 투명
 * - 좌우 끝에서 중앙 방향으로 선형 그라데이션
 * - 16:9 영역보다 조금 안쪽까지 그라데이션이 침범
 */
export default function EdgeGradient({
  hidden = false,
  className,
}: {
  hidden?: boolean;
  className?: string;
}) {
  if (hidden) return null;
  return (
    <BackgroundPortal>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={cn(
            'pointer-events-none fixed inset-0 z-200 flex items-center justify-center',
            className
          )}
        >
          {/* 좌측 그라데이션 */}
          <div
            className='h-full flex-1'
            style={{
              background:
                'linear-gradient(to right, rgb(12, 11, 30) 0%, transparent 100%)',
            }}
          />

          <div className='aspect-14/9 h-full bg-transparent' />

          {/* 우측 그라데이션 */}
          <div
            className='h-full flex-1'
            style={{
              background:
                'linear-gradient(to left, rgb(12, 11, 30) 0%, transparent 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>
    </BackgroundPortal>
  );
}
