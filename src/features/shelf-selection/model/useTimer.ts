import { useEffect, useState } from 'react';

export function useTimer(initialSeconds = 600) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [showModal, setShowModal] = useState(false);

  // 카운트다운 로직
  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowModal(true);
    }
  }, [secondsLeft]);

  return {
    secondsLeft,
    showModal,
  };
}
