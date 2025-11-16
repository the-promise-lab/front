import { useMemo, useState } from 'react';

import { useEffect } from 'react';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export function useCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(100); // 실제 남은 시간 (3초 후 04:00부터 카운트다운)
  const [showModal, setShowModal] = useState(false);
  const [countdownMoved, setCountdownMoved] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [displayCountdown, setDisplayCountdown] = useState(false);

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

  // 카운트다운 로직
  useEffect(() => {
    if (!displayCountdown) return;
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(true);
    }
  }, [secondsLeft, displayCountdown]);

  const formattedTime = useMemo(() => formatTime(secondsLeft), [secondsLeft]);

  return {
    secondsLeft,
    showModal,
    formattedTime,
    countdownMoved,
    showBackground,
    displayCountdown,
  };
}
