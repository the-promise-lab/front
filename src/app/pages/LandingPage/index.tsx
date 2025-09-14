import { useAuthStore, type User } from '@shared/auth/model/useAuthStore';
import { config } from '@config/env';

export default function LandingPage() {
  const { login } = useAuthStore();

  const handleLoginSuccess = (user: User) => {
    login(user);
  };

  const handleKakaoLogin = () => {
    // 서버의 카카오 로그인 엔드포인트로 리다이렉트
    window.location.href = `${config.API_BASE_URL}/api/auth/kakao`;
  };

  return (
    <div className="h-dvh w-screen bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden">
      {/* 가로모드 메인 컨텐츠 */}
      <div className="h-full flex">
        {/* 왼쪽 영역: 브랜딩 */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gradient-to-br from-yellow-400 to-yellow-500">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-2">The Promise</h1>
            <p className="text-yellow-100 text-sm mb-6">재난 대비 훈련 게임</p>

            {/* 특징 포인트 */}
            {/* <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-200">✓</span>
                <span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-200">✓</span>
                <span></span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-200">✓</span>
                <span></span>
              </div>
            </div> */}
          </div>
        </div>

        {/* 오른쪽 영역: 로그인 */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
          <div className="w-full max-w-sm">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">시작하기</h2>
            </div>

            <div className="space-y-3">
              {/* 카카오 로그인 */}
              <button
                onClick={handleKakaoLogin}
                className="w-full bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-800 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-all touch-manipulation"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 5.731 2 10.286c0 2.858 1.818 5.377 4.545 6.952L5.91 21.09c-.13.41.278.758.643.548l5.12-2.78C11.834 18.924 11.916 18.929 12 18.929c5.523 0 10-3.731 10-8.643C22 5.731 17.523 2 12 2z" />
                </svg>
                카카오톡으로 시작하기
              </button>

              {/* 구분선 */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500">또는</span>
                </div>
              </div>

              {/* 게스트 로그인 */}
              <button
                onClick={() =>
                  handleLoginSuccess({
                    id: 'guest',
                    nickname: '게스트',
                    provider: 'guest',
                  })
                }
                className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all touch-manipulation"
              >
                게스트로 시작하기
              </button>
            </div>

            {/* 약관 동의 */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 leading-relaxed">
                로그인하면 서비스 이용약관 및<br />
                개인정보처리방침에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
