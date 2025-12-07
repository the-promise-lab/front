import { BackgroundPortal } from '../background-portal';
import Typography from './Typography';

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
    <BackgroundPortal>
      {/* 블러 배경 오버레이 */}
      <div
        className='fixed inset-0 z-110 bg-black/40 backdrop-blur-md'
        onClick={onCancel}
      />

      {/* 모달 */}
      <div className='fixed inset-0 z-111 flex items-center justify-center'>
        <div
          className='relative h-fit w-fit'
          onClick={e => e.stopPropagation()}
        >
          {/* SVG 배경 패널 */}
          <LogoutModalPanel className='h-115 w-auto' />

          {/* 컨텐츠 */}
          <div className='absolute inset-0 flex flex-col items-center justify-center gap-11 px-18.5 py-3.5'>
            {/* 제목 + 본문 */}
            <div className='flex w-full flex-col items-center gap-8.5 py-4.5 text-center'>
              <Typography variant='h4-b' className='text-white uppercase'>
                정말 로그아웃 하시겠습니까?
              </Typography>
              <div className='flex flex-col gap-0.5'>
                <Typography variant='body' className='text-white'>
                  게임을 종료하고 메인 화면으로 돌아갑니다.
                </Typography>
                <Typography variant='body' className='text-white'>
                  저장되지 않은 진행 상황은 사라질 수 있습니다.
                </Typography>
              </div>
            </div>

            {/* 버튼들 */}
            <div className='flex gap-6'>
              <button
                onClick={onCancel}
                className='flex h-26 w-75 items-center justify-center rounded-[4.8px] bg-[#808080] transition-all hover:bg-gray-600 active:scale-[0.98] lg:rounded-[12px]'
              >
                <Typography variant='h4-b' className='text-white uppercase'>
                  취소
                </Typography>
              </button>
              <button
                onClick={onConfirm}
                className='flex h-26 w-75 items-center justify-center rounded-[4.8px] bg-[#1c1b21] transition-all hover:bg-[#2a2930] active:scale-[0.98] lg:rounded-[12px]'
              >
                <Typography variant='h4-b' className='text-white uppercase'>
                  로그아웃
                </Typography>
              </button>
            </div>
          </div>
        </div>
      </div>
    </BackgroundPortal>
  );
}

function LogoutModalPanel({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 793 320'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <rect
        x='1'
        y='1'
        width='791'
        height='318'
        rx='23'
        fill='url(#paint0_linear_logout_modal)'
        fillOpacity='0.8'
        stroke='url(#paint1_radial_logout_modal)'
        strokeWidth='2'
      />
      <defs>
        <linearGradient
          id='paint0_linear_logout_modal'
          x1='0'
          y1='347'
          x2='812'
          y2='197'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0.3' />
          <stop offset='1' stopColor='white' stopOpacity='0.15' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_logout_modal'
          cx='0'
          cy='0'
          r='1'
          gradientTransform='matrix(738.5 -182.8 100.7 187.7 428 160)'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0.4' />
        </radialGradient>
      </defs>
    </svg>
  );
}
