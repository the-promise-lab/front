import scrollbar from 'tailwind-scrollbar';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        // 모바일 가로모드 중심 - 평균 사이즈 기준
        'mobile-landscape': {
          raw: '(orientation: landscape) and (max-width: 896px) and (max-height: 414px)',
        },
        'mobile-portrait': {
          raw: '(orientation: portrait) and (max-width: 414px) and (max-height: 896px)',
        },
        // 기본 브레이크포인트
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      height: {
        'screen-safe': '100vh',
        'screen-mobile': '100vh', // 전체 높이 사용
        'mobile-landscape': '100vh',
      },
      maxHeight: {
        mobile: '100vh',
        'mobile-landscape': '100vh',
      },
      width: {
        'mobile-landscape': '100vw', // 전체 너비 사용
        'screen-mobile': '100vw',
      },
      maxWidth: {
        mobile: '100vw',
        'mobile-landscape': '100vw',
      },
      aspectRatio: {
        'mobile-landscape': '896/414', // 2.16:1 비율
      },
      fontFamily: {
        'nexon-lv2-gothic': 'var(--font-nexon-lv2-gothic)',
        'nexon-lv1-gothic-low-otf': 'var(--font-nexon-lv1-gothic-low-otf)',
        'nanumsquare-neo-otf': 'var(--font-nanumsquare-neo-otf)',
      },
      colors: {
        'caution-1': 'var(--color-caution-1)',
        'red-1': 'var(--color-red-1)',
        'green-1': 'var(--color-green-1)',
        'yellow-1': 'var(--color-yellow-1)',
        'purple-1': 'var(--color-purple-1)',
        'sky-1': 'var(--color-sky-1)',
        'main-1': 'var(--color-main-1)',
        'secondary-1': 'var(--color-secondary-1)',
        'w-1': 'var(--color-w-1)',
      },
      textShadow: {
        neon: '0 0 4px var(--color-sky-1, #01ead6)',
      },
    },
  },
  plugins: [scrollbar, scrollbarHide],
};
