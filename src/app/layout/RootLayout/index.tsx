import type React from 'react';
import OrientationGuard from './OrientationGuard';
import ViewportWidthGuard from './ViewportWidthGuard';
import FullscreenScroll from './FullscreenScroll';
import GlobalBackground from './GlobalBackground';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrientationGuard>
      <ViewportWidthGuard>
        <FullscreenScroll>
          <GlobalBackground>
            <div className='fixed left-1/2 z-10 aspect-video h-dvh w-auto -translate-x-1/2 touch-pan-y overflow-x-visible'>
              {children}
            </div>
          </GlobalBackground>
        </FullscreenScroll>
      </ViewportWidthGuard>
    </OrientationGuard>
  );
}
