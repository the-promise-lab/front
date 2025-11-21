import { config } from '@config/env';
import { useSetBackground } from '@shared/background';

export default function LoginPage() {
  useSetBackground({
    color: '#000',
  });
  const handleKakaoLogin = () => {
    // 서버의 카카오 로그인 엔드포인트로 리다이렉트 (redirect URI 포함)
    const redirectUri = encodeURIComponent(window.location.origin);
    window.location.href = `${config.API_BASE_URL}/api/auth/kakao?redirect_uri=${redirectUri}`;
  };

  return (
    <div className='flex h-full w-full items-center justify-center text-white'>
      <div
        className='flex flex-col items-center justify-center rounded-[12px] border-[2px] border-white/40 px-45 py-25 text-center backdrop-blur-md'
        style={{
          // height: '240px',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 100%)',
        }}
      >
        <div className='flex flex-col items-center justify-center gap-15'>
          <div>
            <p
              className='text-[22px] text-white uppercase'
              style={{
                fontFamily: 'NanumSquare Neo OTF, sans-serif',
                fontWeight: 600,
                lineHeight: '100%',
                letterSpacing: '0em',
              }}
            >
              환영합니다!
            </p>
            <p
              className='mt-4 text-[16px] text-white/85'
              style={{
                fontFamily: 'NanumSquare Neo OTF, sans-serif',
                fontWeight: 400,
                lineHeight: '138%',
                letterSpacing: '-0.01em',
              }}
            >
              로그인하여 플레이를 시작하세요.
            </p>
          </div>
          <button
            onClick={handleKakaoLogin}
            className='flex touch-manipulation items-center justify-center gap-3 rounded-sm bg-[#FEE500] px-60 py-6 font-medium text-gray-800 transition-all hover:bg-yellow-500 active:bg-yellow-600'
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M12 2C6.477 2 2 5.731 2 10.286c0 2.858 1.818 5.377 4.545 6.952L5.91 21.09c-.13.41.278.758.643.548l5.12-2.78C11.834 18.924 11.916 18.929 12 18.929c5.523 0 10-3.731 10-8.643C22 5.731 17.523 2 12 2z' />
            </svg>
            카카오톡 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
