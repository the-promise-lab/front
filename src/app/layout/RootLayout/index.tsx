import type React from 'react';
import OrientationGuard from './OrientationGuard';
import BackgroundLayer from './BackgroundLayer';
import { PauseMenu } from '@processes/game-flow';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrientationGuard>
      <BackgroundLayer>
        <div className='fixed left-1/2 z-10 aspect-[16/9] h-screen w-auto -translate-x-1/2 touch-pan-y overflow-hidden'>
          {children}

          <div className='absolute top-11 right-11 z-10'>
            <PauseMenu />
          </div>
        </div>
      </BackgroundLayer>
    </OrientationGuard>
  );
}
