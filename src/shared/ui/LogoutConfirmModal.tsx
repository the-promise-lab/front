import Typography from './Typography';
import { cn } from '@shared/lib/utils';

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 블러 배경 오버레이 */}
      <div
        className='fixed inset-0 z-[110] backdrop-blur-md'
        onClick={onCancel}
      />

      {/* 모달 */}
      <div className='fixed inset-0 z-[111] flex items-center justify-center'>
        <div
          className={cn(
            'relative w-[500px] max-w-[150vw]',
            'bg-white/10 backdrop-blur-sm',
            'rounded-lg p-10',
            'border border-white/20'
          )}
          onClick={e => e.stopPropagation()}
        >
          {/* 제목 */}
          <div className='mb-6 text-center'>
            <Typography variant='h3-b' className='text-white'>
              정말 로그아웃 하시겠습니까?
            </Typography>
          </div>

          {/* 본문 텍스트 */}
          <div className='mb-8 flex flex-col gap-2 text-center'>
            <Typography variant='body' className='text-white/70'>
              게임을 종료하고 메인 화면으로 돌아갑니다.
            </Typography>
            <Typography variant='body' className='text-white/70'>
              저장되지 않은 진행 상황은 사라질 수 있습니다.
            </Typography>
          </div>

          {/* 버튼들 */}
          <div className='flex gap-4'>
            <button
              onClick={onCancel}
              className={cn(
                'flex-1 rounded-md',
                'bg-white/30 py-4',
                'transition-all duration-200',
                'hover:bg-gray-500 active:scale-[0.98]'
              )}
            >
              <Typography variant='dialogue-m' className='text-white'>
                취소
              </Typography>
            </button>
            <button
              onClick={onConfirm}
              className={cn(
                'flex-1 rounded-md',
                'bg-[#8EDDD7] py-4',
                'transition-all duration-200',
                'hover:bg-teal-600 active:scale-[0.98]'
              )}
            >
              <Typography variant='dialogue-m' className='text-black'>
                확인
              </Typography>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
