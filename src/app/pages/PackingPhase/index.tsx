import { useState, useEffect } from 'react';
import { useGameFlowStore } from '@processes/game-flow';
import { motion, AnimatePresence } from 'framer-motion';
import { ShelfSelection } from '@features/shelf-selection';
import CautionNotice from '@features/event-phase/ui/kit/CautionNotice';
import Typography from '@shared/ui/Typography';

export default function PackingPhase() {
  const { goto, back } = useGameFlowStore();
  const [timeLeft, setTimeLeft] = useState(10); // 실제 남은 시간 (3초 후 04:00부터 카운트다운)
  const [showModal, setShowModal] = useState(false);
  const [countdownMoved, setCountdownMoved] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [displayCountdown, setDisplayCountdown] = useState(false);

  // 디버깅: PackingPhase 컴포넌트가 렌더링되는지 확인
  console.log('PackingPhase 컴포넌트 렌더링됨');

  // 카운트다운 로직
  useEffect(() => {
    if (!displayCountdown) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(true);
    }
  }, [timeLeft, displayCountdown]);

  // 1초 후 카운트다운을 상단으로 이동하고 배경 표시
  useEffect(() => {
    const moveTimer = setTimeout(() => {
      setCountdownMoved(true);
      setShowBackground(true);
    }, 4000);
    const startCountdownTimer = setTimeout(() => {
      setDisplayCountdown(true);
    }, 3000);
    return () => {
      clearTimeout(moveTimer);
      clearTimeout(startCountdownTimer);
    };
  }, []);

  // 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // const handleConfirm = async () => {
  //   if (isSubmitting) return; // 중복 제출 방지

  //   setIsSubmitting(true);

  //   try {
  //     // 쿠키에서 accessToken 가져오기
  //     const accessToken = getCookie('accessToken');

  //      if (!accessToken) {
  //        throw new Error('인증 토큰이 없습니다.');
  //      }

  //     // 선택한 아이템들을 서버에 전송
  //     const response = await fetch(`${config.API_BASE_URL}/api/packing/items`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         items: selectedShelfItems.map(item => ({
  //           id: item.id,
  //           name: item.name,
  //           quantity: item.quantity,
  //         })),
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('서버 요청 실패');
  //     }

  //     // 서버 응답 확인 (필요시 처리)
  //     const data = await response.json();
  //     console.log('선택한 아이템 전송 완료:', data);

  //     // 성공 시 다음 단계로 이동
  //     goto('DAY_FLOW');
  //   } catch (error) {
  //     console.error('아이템 전송 중 오류:', error);
  //     // 에러 처리 (사용자에게 알림 표시 등)
  //     alert('아이템 전송에 실패했습니다. 다시 시도해주세요.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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
                  {formatTime(timeLeft)}
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
          {formatTime(timeLeft)}
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
