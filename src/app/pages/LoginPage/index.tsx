import { useEffect, useRef, useState } from 'react';
import { config } from '@config/env';
import { useSetBackground } from '@shared/background';
import { cn } from '@shared/lib/utils';
import { AuthService } from '@api';
import { useAuthStore } from '@shared/auth/model/useAuthStore';
import { useGameFlowStore } from '@processes/game-flow';
import { isAxiosError } from 'axios';
import { useShallow } from 'zustand/react/shallow';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
type VideoPhase = 'intro' | 'splash';

export default function LoginPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<VideoPhase>('intro');
  const [showLogin, setShowLogin] = useState(false);
  const [hasShownEarlyModal, setHasShownEarlyModal] = useState(false);
  const splashVideoRef = useRef<HTMLVideoElement | null>(null);
  const { login } = useAuthStore(useShallow(state => ({ login: state.login })));
  const { goto } = useGameFlowStore(
    useShallow(state => ({ goto: state.goto }))
  );

  useSetBackground({
    color: '#000',
  });

  // URL에서 code 파라미터 감지 및 토큰 교환
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) return;

    const exchangeCodeForToken = async () => {
      setIsProcessing(true);
      setError(null);

      try {
        // URL 정리 (code 파라미터 제거)
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        // 환경변수에 설정된 redirect_uri 사용, 없으면 현재 origin 사용
        const redirectUri = window.location.origin;

        // 백엔드 API로 code 전송하여 accessToken 받기
        const tokenResponse =
          await AuthService.authControllerExchangeCodeForToken({
            code,
            redirectUri,
          });

        // 토큰을 먼저 저장 (이후 API 요청에 토큰이 포함됨)
        login(
          { id: '', name: '', provider: 'kakao' },
          tokenResponse.accessToken
        );

        // 프로필 정보 가져오기
        const profileResponse = await AuthService.authControllerGetProfile();

        // 로그인 상태 업데이트 (프로필 정보 포함)
        login(profileResponse, tokenResponse.accessToken);

        // 로딩 페이지로 이동 (그 후 메인 메뉴로 자동 전환됨)
        goto('PROGRESS');
      } catch (err) {
        console.error('카카오 로그인 실패:', err);
        if (isAxiosError(err)) {
          setError(err.response?.data.message ?? err.message);
        } else {
          setError('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
        }
        setIsProcessing(false);
      }
    };

    exchangeCodeForToken();
  }, [login, goto]);

  const handleKakaoLogin = () => {
    // 카카오 인증 URL로 직접 리디렉션
    // 환경변수에 설정된 redirect_uri 사용, 없으면 현재 origin 사용
    const redirectUri = encodeURIComponent(window.location.origin);
    const kakaoAuthUrl = `${KAKAO_AUTH_URL}?client_id=${config.KAKAO_REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const handleIntroEnded = () => {
    setPhase('splash');
  };

  const handleSplashEnded = () => {
    setShowLogin(true);
    const video = splashVideoRef.current;
    video?.play().catch(() => {});
  };

  useEffect(() => {
    if (phase === 'splash') {
      const video = splashVideoRef.current;
      if (video) {
        setShowLogin(false);
        setHasShownEarlyModal(false);
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  }, [phase]);

  const handleSplashTimeUpdate = () => {
    if (hasShownEarlyModal) return;
    const video = splashVideoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= 2) {
      setHasShownEarlyModal(true);
      setShowLogin(true);
    }
  };

  return (
    <div className='relative h-full w-full overflow-hidden text-white'>
      <div
        className={cn(
          'absolute inset-0 overflow-hidden transition-all duration-700',
          showLogin && 'scale-105 blur-[8px]'
        )}
      >
        {phase === 'intro' && (
          <video
            key='intro-video'
            className='absolute top-1/2 left-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 object-cover'
            src='/video/intro.mp4'
            autoPlay
            muted
            playsInline
            onEnded={handleIntroEnded}
          />
        )}
        <video
          key='splash-video'
          ref={splashVideoRef}
          className={cn(
            'absolute top-1/2 left-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 object-cover transition-opacity duration-700',
            phase === 'splash' ? 'opacity-100' : 'opacity-0'
          )}
          src='/image/mainPage/splash_main.mp4'
          autoPlay={phase === 'splash'}
          loop
          preload='auto'
          muted
          playsInline
          onEnded={handleSplashEnded}
          onTimeUpdate={handleSplashTimeUpdate}
        />
        <div className='absolute inset-0 bg-black/35' />
      </div>

      <div className='relative z-10 flex h-full w-full items-center justify-center'>
        {(showLogin || isProcessing) && (
          <div
            className='flex flex-col items-center justify-center rounded-[12px] border-[2px] border-white/40 px-45 py-25 text-center backdrop-blur-md'
            style={{
              background:
                'var(--bt_glass, linear-gradient(78deg, rgba(255, 255, 255, 0.24) -1.42%, rgba(255, 255, 255, 0.12) 91.38%))',
            }}
          >
            {isProcessing ? (
              <div className='flex flex-col items-center gap-4'>
                <div className='h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent' />
                <p>로그인 처리 중...</p>
              </div>
            ) : (
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
                  <svg
                    width='18'
                    height='18'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    font-family='Apple SD Gothic Neo'
                  >
                    <path d='M12 2C6.477 2 2 5.731 2 10.286c0 2.858 1.818 5.377 4.545 6.952L5.91 21.09c-.13.41.278.758.643.548l5.12-2.78C11.834 18.924 11.916 18.929 12 18.929c5.523 0 10-3.731 10-8.643C22 5.731 17.523 2 12 2z' />
                  </svg>
                  카카오톡 로그인
                </button>
                {error && <p className='mt-2 text-sm text-red-400'>{error}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
