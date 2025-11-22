import { AnimatePresence, motion } from 'framer-motion';
import { memo } from 'react';
import { useTimer } from '../../model/useTimer';
import Typography from '@shared/ui/Typography';
import { cn } from '@shared/lib/utils';
import NoticeBanner from '@shared/ui/NoticeBanner';
import { BackgroundPortal } from '@shared/background-portal';

function HourglassIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 60 60'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M15 5H45V20L35 30L45 40V55H15V40L25 30L15 20V5ZM40 41.25L30 31.25L20 41.25V50H40V41.25ZM30 28.75L40 18.75V10H20V18.75L30 28.75ZM25 15H35V16.875L30 21.875L25 16.875V15Z'
        fill={'currentColor'}
      />
    </svg>
  );
}

const TimerDisplay = memo(
  ({ seconds, isImminent }: { seconds: number; isImminent: boolean }) => {
    return (
      <div className='absolute bottom-15 left-1/2 z-10 flex h-15 -translate-x-1/2 items-center gap-1'>
        {/* 발광 배경 효과 */}
        <div className='absolute top-0 left-1/2 z-[-1] -mt-[50%] h-74 w-81.5 -translate-x-1/2 rounded-full bg-black opacity-50 shadow-[0_0_47.8px_31px_#000]' />

        <HourglassIcon
          className={cn('relative h-15 w-15', isImminent && 'text-red-1')}
        />
        <Typography
          variant='h2-b'
          className={cn('text-white', isImminent && 'text-red-1')}
        >
          {seconds}s
        </Typography>
      </div>
    );
  }
);

TimerDisplay.displayName = 'TimerDisplay';

const SECONDS_GIVEN = 102;
const SECONDS_MAX_TO_SHOW = 100;

export default function Timer({ onTimeout }: { onTimeout: () => void }) {
  const { secondsLeft, showModal } = useTimer(SECONDS_GIVEN);
  const isImminent = secondsLeft < 10;
  const NoticeOn = SECONDS_GIVEN - secondsLeft <= 2;

  return (
    <>
      <TimerDisplay
        seconds={
          secondsLeft > SECONDS_MAX_TO_SHOW ? SECONDS_MAX_TO_SHOW : secondsLeft
        }
        isImminent={isImminent}
      />

      <AnimatePresence>
        {NoticeOn && (
          <BackgroundPortal>
            <motion.div
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[7.5px]'
            >
              <NoticeBanner withCaution>
                <div className='flex flex-col items-center justify-center gap-12'>
                  <Typography variant='dialogue-m'>
                    제한 시간 내에 가방 안에 생존을 위한 물품을 담으세요!
                  </Typography>
                  <Typography variant='h1-80'>
                    {SECONDS_MAX_TO_SHOW}s
                  </Typography>
                </div>
              </NoticeBanner>
            </motion.div>
          </BackgroundPortal>
        )}
      </AnimatePresence>

      {/* 모달 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'
            onClick={e => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className='rounded-lg bg-white p-8 shadow-xl'
              onClick={e => e.stopPropagation()}
            >
              <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>
                가방싸기 종료!
              </h2>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onTimeout();
                }}
                className='w-full rounded-lg bg-blue-500 px-6 py-3 text-[13px] font-medium text-white transition-colors hover:bg-blue-600'
              >
                확인
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
