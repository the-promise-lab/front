import { useGameFlowStore } from '@processes/game-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { ShelfSelection } from '@features/shelf-selection';
import CautionNotice from '@features/event-phase/ui/kit/CautionNotice';
import Typography from '@shared/ui/Typography';
import { useCountdown } from '@features/shelf-selection/model/useCountdown';

export default function PackingPhase() {
  const { goto, back } = useGameFlowStore();
  const { showModal, formattedTime, countdownMoved, showBackground } =
    useCountdown();

  return (
    <div className='relative h-full w-full'>
      {/* 기존 PACKING_PHASE 배경 (ShelfSelection) */}
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: showBackground ? 1 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <ShelfSelection onBack={back} />
      </motion.div>

      {/* 어두운 오버레이 (카운트다운 중에만) */}
      <motion.div
        className='pointer-events-none absolute inset-0 bg-black'
        initial={{ opacity: 0.8 }}
        animate={{ opacity: showBackground ? 0 : 0.8 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* 초기 카운트다운 CAUTION 오버레이 */}
      <AnimatePresence>
        {!countdownMoved && (
          <motion.div
            className='pointer-events-none absolute inset-0 z-20 flex items-center justify-center'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <div className='flex w-full max-w-[640px] flex-col items-center gap-6 px-6 text-center'>
              <CautionNotice className='w-full max-w-[320px]' />
              <div className='w-full rounded-3xl bg-black/70 px-12 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-md'>
                <Typography
                  variant='subtitle-2-b'
                  className='mb-4 text-white/70'
                >
                  제한 시간 내에 가방 안에 생존을 위한 물품을 담으세요!
                </Typography>
                <div className='font-mono text-7xl font-bold tracking-[0.2em] text-white'>
                  {formattedTime}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 카운트다운 타이머 (상단) */}
      {countdownMoved && (
        <motion.div
          className='pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-mono text-6xl font-bold text-white'
          initial={{ y: 0, scale: 1 }}
          animate={{
            y: -150,
            scale: 0.8,
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            fontSize: '30px',
          }}
        >
          {formattedTime}
        </motion.div>
      )}

      {/* 모달 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'
            onClick={e => e.stopPropagation()} // 배경 클릭 방지
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className='rounded-lg bg-white p-8 shadow-xl'
              onClick={e => e.stopPropagation()} // 모달 내부 클릭 이벤트 전파 방지
            >
              <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>
                가방싸기 종료!
              </h2>
              <button
                onClick={e => {
                  e.stopPropagation();
                  // handleConfirm();
                  goto('DAY_FLOW');
                }}
                disabled={false}
                className='w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50'
                style={{ fontSize: '13px' }}
              >
                확인
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
