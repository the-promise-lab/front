import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/lib/utils';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function GlassButton({
  children,
  className,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={cn(
        'relative flex items-center justify-center',
        'h-30 w-145',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-transform active:scale-95',
        className
      )}
      {...props}
    >
      {/* SVG 배경 */}
      <svg
        className='pointer-events-none absolute inset-0 h-full w-full'
        viewBox='0 0 580 120'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        preserveAspectRatio='none'
      >
        <rect
          x='1'
          y='1'
          width='578'
          height='118'
          rx='59'
          fill='url(#paint0_linear_1196_7048)'
          fillOpacity='0.8'
        />
        <rect
          x='1'
          y='1'
          width='578'
          height='118'
          rx='59'
          stroke='url(#paint1_radial_1196_7048)'
          strokeWidth='2'
        />

        <defs>
          <linearGradient
            id='paint0_linear_1196_7048'
            x1='-2.5567e-05'
            y1='129.9'
            x2='322.945'
            y2='-195.285'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' stopOpacity='0.3' />
            <stop offset='1' stopColor='white' stopOpacity='0.15' />
          </linearGradient>
          <radialGradient
            id='paint1_radial_1196_7048'
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(539.4 -68.4 122.947 41.5029 313.2 60)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='white' stopOpacity='0.4' />
          </radialGradient>
        </defs>
      </svg>

      {children}
    </button>
  );
}
