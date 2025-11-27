import type { ReactNode } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils';

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  imageUrl: string;
}

export default function ImageButton({
  children,
  className,
  imageUrl,
  ...props
}: ImageButtonProps) {
  return (
    <button
      className={cn(className)}
      {...props}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </button>
  );
}
