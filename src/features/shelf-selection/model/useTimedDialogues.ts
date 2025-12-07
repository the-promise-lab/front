import { useEffect, useState } from 'react';

export interface TimedDialogue {
  triggerTime: number;
  text: string;
  speaker: string;
  condition?: 'elapsed' | 'remaining';
  duration?: number;
}

/**
 * 시간에 따라 대사를 표시하는 훅
 *
 * @param secondsLeft - 남은 시간 (초)
 * @param totalSeconds - 전체 시간 (초)
 * @param dialogues - 대사 목록
 * @returns 현재 표시할 대사 텍스트 (없으면 null)
 */
export function useTimedDialogues(
  secondsLeft: number,
  totalSeconds: number,
  dialogues: TimedDialogue[]
): TimedDialogue | null {
  const [currentDialogue, setCurrentDialogue] = useState<TimedDialogue | null>(
    null
  );
  const [shownDialogues, setShownDialogues] = useState<Set<number>>(new Set());
  const [hideTimer, setHideTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  useEffect(() => {
    const elapsed = totalSeconds - secondsLeft;

    dialogues.forEach((dialogue, index) => {
      // 이미 표시한 대사는 스킵
      if (shownDialogues.has(index)) return;

      // 트리거 조건 확인
      const shouldShow =
        dialogue.condition === 'remaining'
          ? secondsLeft <= dialogue.triggerTime
          : elapsed >= dialogue.triggerTime;

      if (shouldShow) {
        // 기존 타이머가 있으면 취소
        if (hideTimer) {
          clearTimeout(hideTimer);
        }

        // 대사 표시
        setCurrentDialogue(dialogue);
        setShownDialogues(prev => new Set(prev).add(index));

        // 지정된 시간 후 대사 숨김
        const duration = dialogue.duration ?? 5000;
        const timer = setTimeout(() => {
          setCurrentDialogue(null);
          setHideTimer(null);
        }, duration);

        setHideTimer(timer);
      }
    });
  }, [secondsLeft, totalSeconds, dialogues, shownDialogues, hideTimer]);

  // cleanup
  useEffect(() => {
    return () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [hideTimer]);

  return currentDialogue;
}
