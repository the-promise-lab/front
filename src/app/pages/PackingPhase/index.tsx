import { useState, useEffect } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { ShelfSelection } from '@features/shelf-selection';

export default function PackingPhase() {
  const { goto, back } = useGameFlowStore();
  const [timeLeft, setTimeLeft] = useState(10); // 10초 카운트다운
  const [showModal, setShowModal] = useState(false);
  const [countdownMoved, setCountdownMoved] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  // 디버깅: PackingPhase 컴포넌트가 렌더링되는지 확인
  console.log('PackingPhase 컴포넌트 렌더링됨');

  // 카운트다운 로직
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // 카운트다운이 끝나면 모달 표시
      setShowModal(true);
    }
  }, [timeLeft]);

  // 1초 후 카운트다운을 상단으로 이동하고 배경 표시
  useEffect(() => {
    const moveTimer = setTimeout(() => {
      setCountdownMoved(true);
      setShowBackground(true);
    }, 2000);
    return () => clearTimeout(moveTimer);
  }, []);

  // 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    goto('DAY_FLOW');
  };

  return (
    <div className='relative h-screen w-screen'>
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
        className='absolute inset-0 bg-black'
        initial={{ opacity: 0.8 }}
        animate={{ opacity: showBackground ? 0 : 0.8 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* 카운트다운 타이머 */}
      <motion.div
        className='absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 font-mono text-6xl font-bold text-white'
        animate={
          countdownMoved
            ? {
                y: -100, // 상단으로 이동
                scale: 0.5, // 크기 축소
              }
            : {}
        }
        transition={{
          duration: 0.8,
          ease: 'easeInOut',
        }}
        style={{
          fontSize: countdownMoved ? '30px' : '60px',
        }}
      >
        {formatTime(timeLeft)}
      </motion.div>

      {/* 모달 */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black'
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className='rounded-lg bg-white p-8 shadow-xl'
            >
              <h2 className='mb-6 text-center text-2xl font-bold text-gray-800'>
                가방싸기 종료!
              </h2>
              <button
                onClick={handleConfirm}
                className='w-full rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-600'
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
