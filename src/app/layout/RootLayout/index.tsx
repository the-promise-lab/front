import type React from 'react';
import OrientationGuard from './OrientationGuard';
import FullscreenScroll from './FullscreenScroll';
import GlobalBackground from './GlobalBackground';
import { PauseMenu } from '@processes/game-flow';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrientationGuard>
      <FullscreenScroll>
        <GlobalBackground>
          <div className='fixed left-1/2 z-10 aspect-[16/9] h-[100dvh] w-auto -translate-x-1/2 touch-pan-y overflow-x-visible'>
            {children}

            <div className='absolute top-11 right-11 z-10'>
              <PauseMenu />
            </div>
          </div>
        </GlobalBackground>
      </FullscreenScroll>
    </OrientationGuard>
  );
}
