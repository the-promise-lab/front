import { useEffect } from 'react';
import { useGameFlowStore } from '../../../processes/game-flow';
import { useAuthStore } from '../../../shared/auth/model/useAuthStore';
import { useCheckAuthState } from '../../../shared/auth/model/useLoginStatus';
import { config } from '../../../config/env';

export default function LandingPage() {
  const { setAuthenticated } = useGameFlowStore();
  const { isLoggedIn, login } = useAuthStore();

  // useCheckAuthState 훅 사용 (로그아웃 플래그 자동 처리)
  useCheckAuthState();

  // 이미 로그인된 경우 메인메뉴로 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      setAuthenticated(true);
    }
  }, [isLoggedIn, setAuthenticated]);

  const handleKakaoLogin = () => {
    // 서버의 카카오 로그인 엔드포인트로 리다이렉트
    window.location.href = `${config.API_BASE_URL}/api/auth/kakao`;
  };

  const handleGuestLogin = () => {
    // 게스트 로그인 처리 - 바로 메인메뉴로 이동
    const guestUser = {
      id: 'guest',
      nickname: '게스트',
      provider: 'guest' as const,
    };

    login(guestUser);
    setAuthenticated(true);
  };

  return (
    <div className='h-dvh w-screen overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100'>
      {/* 가로모드 메인 컨텐츠 */}
      <div className='flex h-full'>
        {/* 왼쪽 영역: 브랜딩 */}
        <div className='flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 p-8'>
          <div className='text-center text-white'>
            <h1 className='mb-2 text-2xl font-bold'>The Promise</h1>
            <p className='mb-6 text-sm text-yellow-100'>재난 대비 훈련 게임</p>
          </div>
        </div>

        {/* 오른쪽 영역: 로그인 */}
        <div className='flex flex-1 flex-col items-center justify-center bg-white p-8'>
          <div className='w-full max-w-sm'>
            <div className='mb-6 text-center'>
              <h2 className='mb-2 text-xl font-bold text-gray-800'>시작하기</h2>
            </div>

            <div className='space-y-3'>
              {/* 카카오 로그인 */}
              <button
                onClick={handleKakaoLogin}
                className='flex w-full touch-manipulation items-center justify-center gap-3 rounded-lg bg-yellow-400 px-4 py-3 font-medium text-gray-800 transition-all hover:bg-yellow-500 active:bg-yellow-600'
              >
                <svg
                  width='18'
                  height='18'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M12 2C6.477 2 2 5.731 2 10.286c0 2.858 1.818 5.377 4.545 6.952L5.91 21.09c-.13.41.278.758.643.548l5.12-2.78C11.834 18.924 11.916 18.929 12 18.929c5.523 0 10-3.731 10-8.643C22 5.731 17.523 2 12 2z' />
                </svg>
                카카오톡으로 시작하기
              </button>

              {/* 구분선 */}
              <div className='relative my-4'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-xs'>
                  <span className='bg-white px-3 text-gray-500'>또는</span>
                </div>
              </div>

              {/* 게스트 로그인 */}
              <button
                onClick={handleGuestLogin}
                className='w-full touch-manipulation rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-all hover:bg-gray-200 active:bg-gray-300'
              >
                게스트로 시작하기
              </button>
            </div>

            {/* 약관 동의 */}
            <div className='mt-6 text-center'>
              <p className='text-xs leading-relaxed text-gray-400'>
                로그인하면 서비스 이용약관 및
                <br />
                개인정보처리방침에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
