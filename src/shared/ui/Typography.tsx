import { cn } from '@shared/lib/utils';
import type React from 'react';

type TypographyVariant =
  | 'h1-b'
  | 'h2-b'
  | 'h3-b'
  | 'dialogue-m'
  | 'dialogue-b'
  | 'dialogue-2'
  | 'subtitle-1-m'
  | 'subtitle-2-m'
  | 'subtitle-2-b'
  | 'body'
  | 'mini-dialogue'
  | 'caption';

type SemanticTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'div';

interface TypographyProps {
  variant: TypographyVariant;
  as?: SemanticTag;
  className?: string;
  children: React.ReactNode;
}

const defaultSemanticTags: Record<TypographyVariant, SemanticTag> = {
  'h1-b': 'h1',
  'h2-b': 'h2',
  'h3-b': 'h3',
  'dialogue-m': 'p',
  'dialogue-b': 'p',
  'dialogue-2': 'p',
  'subtitle-1-m': 'p',
  'subtitle-2-m': 'p',
  'subtitle-2-b': 'p',
  body: 'p',
  'mini-dialogue': 'p',
  caption: 'p',
};

const variantClassNames: Record<TypographyVariant, string> = {
  // H1 B: 70px / 136% / Bold / Upper → 70px = 4.375rem
  'h1-b': 'text-[4.375rem] leading-[136%] font-bold uppercase',

  // H2 B: 54px / Auto / Bold → 54px = 3.375rem
  'h2-b': 'text-[3.375rem] leading-normal font-bold',

  // H3 B: 40px / Auto / Bold / Upper → 40px = 2.5rem
  'h3-b': 'text-[2.5rem] leading-normal font-bold uppercase',

  // Dialogue M: 36px / Auto / Medium / Upper → 36px = 2.25rem
  'dialogue-m': 'text-[2.25rem] leading-normal font-medium uppercase',

  // Dialogue B: 36px / Auto / Bold → 36px = 2.25rem
  'dialogue-b': 'text-[2.25rem] leading-normal font-bold',

  // Dialogue_2: 30px / 136% / Regular / Upper → 30px = 1.875rem
  'dialogue-2': 'text-[1.875rem] leading-[136%] font-normal uppercase',

  // Subtitle_1 M: 28px / Auto / Medium → 28px = 1.75rem
  'subtitle-1-m': 'text-[1.75rem] leading-normal font-medium',

  // Subtitle_2 M: 26px / Auto / Medium → 26px = 1.625rem
  'subtitle-2-m': 'text-[1.625rem] leading-normal font-medium',

  // Subtitle_2 B: 26px / Auto / Bold → 26px = 1.625rem
  'subtitle-2-b': 'text-[1.625rem] leading-normal font-bold',

  // Body: 26px / 135% / -1% / Regular / NanumSquare Neo OTF → 26px = 1.625rem
  body: 'text-[1.625rem] leading-[135%] font-normal tracking-[-0.01em] font-nanumSquare',

  // Mini Dialogue: 24px / 137.63% / -0.5% / Regular / NanumSquare Neo OTF → 24px = 1.5rem
  'mini-dialogue':
    'text-[1.5rem] leading-[137.63%] font-normal tracking-[-0.005em] font-nanumSquare',

  // Caption: 22px / Auto / Medium → 22px = 1.375rem
  caption: 'text-[1.375rem] leading-normal font-medium',
};

/**
 *
 * @param variant - 타이포그래피 변수
 * @param as - 시맨틱 태그
 * @param className - 클래스 이름
 * @param children - 자식 요소
 * @returns
 */
export default function Typography({
  variant,
  as,
  className,
  children,
}: TypographyProps) {
  // as prop이 없으면 기본 태그 사용
  const Component = as ?? defaultSemanticTags[variant];

  return (
    <Component className={cn(variantClassNames[variant], className)}>
      {children}
    </Component>
  );
}
