import type React from 'react';
import OrientationGuard from './OrientationGuard';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrientationGuard>{children}</OrientationGuard>;
}
