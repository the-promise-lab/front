import { useGameFlowStore } from '@processes/game-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { ShelfSelection } from '@features/shelf-selection';
import { useCountdown } from '@features/shelf-selection/model/useCountdown';
import { useEffect } from 'react';
import type { SubmitInventoryResultDto } from '@api';

export default function PackingPhase() {
  const { goto, back, gameSession, saveInventory, next } = useGameFlowStore();
  const { showModal, formattedTime } = useCountdown();

  const bagId = gameSession?.selectedBag?.id;

  const onComplete = (result: SubmitInventoryResultDto) => {
    console.log('onComplete', result); // 디버깅용
    saveInventory(result.inventories);
    next();
  };

  useEffect(() => {
    if (!bagId) {
      back();
    }
  }, [bagId, back]);

  if (!bagId) return null;
  return (
    <div className='relative h-full w-full'>
      {/* 기존 PACKING_PHASE 배경 (ShelfSelection) */}
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <ShelfSelection onBack={back} bagId={bagId} onComplete={onComplete} />
      </motion.div>

      <motion.div
        className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-mono text-6xl font-bold text-white'
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
                  goto('INTRO_STORY_3');
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
