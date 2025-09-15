import type React from 'react';
import OrientationGuard from './OrientationGuard';
import BackgroundLayer from './BackgroundLayer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrientationGuard>
      <BackgroundLayer>{children}</BackgroundLayer>
    </OrientationGuard>
  );
}
