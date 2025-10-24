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
  // H1 B: 70px / 136% / Bold / Upper
  'h1-b': 'text-[35px] lg:text-[70px] leading-[136%] font-bold uppercase',

  // H2 B: 54px / Auto / Bold
  'h2-b': 'text-[27px] lg:text-[54px] leading-normal font-bold',

  // H3 B: 40px / Auto / Bold / Upper
  'h3-b': 'text-[20px] lg:text-[40px] leading-normal font-bold uppercase',

  // Dialogue M: 36px / Auto / Medium / Upper
  'dialogue-m':
    'text-[18px] lg:text-[36px] leading-normal font-medium uppercase',

  // Dialogue B: 36px / Auto / Bold
  'dialogue-b': 'text-[18px] lg:text-[36px] leading-normal font-bold',

  // Dialogue_2: 30px / 136% / Regular / Upper
  'dialogue-2':
    'text-[15px] lg:text-[30px] leading-[136%] font-normal uppercase',

  // Subtitle_1 M: 28px / Auto / Medium
  'subtitle-1-m': 'text-[14px] lg:text-[28px] leading-normal font-medium',

  // Subtitle_2 M: 26px / Auto / Medium
  'subtitle-2-m': 'text-[13px] lg:text-[26px] leading-normal font-medium',

  // Subtitle_2 B: 26px / Auto / Bold
  'subtitle-2-b': 'text-[13px] lg:text-[26px] leading-normal font-bold',

  // Body: 26px / 135% / -1% / Regular / NanumSquare Neo OTF
  body: 'text-[13px] lg:text-[26px] leading-[135%] font-normal tracking-[-0.01em] font-nanumSquare',

  // Mini Dialogue: 24px / 137.63% / -0.5% / Regular / NanumSquare Neo OTF
  'mini-dialogue':
    'text-[12px] lg:text-[24px] leading-[137.63%] font-normal tracking-[-0.005em] font-nanumSquare',

  // Caption: 22px / Auto / Medium
  caption: 'text-[11px] lg:text-[22px] leading-normal font-medium',
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
