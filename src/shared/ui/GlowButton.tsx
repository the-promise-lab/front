import { cn } from '@shared/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  glowColor?: string;
  glowSize?: number;
  className?: string;
  disabled?: boolean;
}

/**
 * Radial glow 효과가 있는 버튼 컴포넌트
 *
 * @example
 * ```tsx
 * <RadialButton>기본 버튼</RadialButton>
 * <RadialButton glowColor="rgba(255, 0, 0, 0.8)">빨간 glow</RadialButton>
 * <RadialButton className="w-full h-[60px]">커스텀 크기</RadialButton>
 * ```
 */
const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  (
    {
      children,
      glowColor = 'rgba(198, 186, 240, 0.8)',
      glowSize = 13,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'rounded-6 relative box-border bg-black/80',
          'h-27 w-fit rounded-[12px] px-11 py-7.5 lg:rounded-[24px]',
          'text-center whitespace-pre text-white',
          'transition-all duration-200',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        style={{
          boxShadow: disabled
            ? 'none'
            : `0px 0px ${glowSize}px 0px ${glowColor}`,
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default GlowButton;
