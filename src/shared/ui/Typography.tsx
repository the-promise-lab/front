import { cn } from '@shared/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

export type TypographyVariant =
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

type ElementTypeMap = {
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  div: HTMLDivElement;
};

interface TypographyProps<T extends SemanticTag = SemanticTag>
  extends Omit<React.HTMLAttributes<ElementTypeMap[T]>, 'ref'> {
  variant: TypographyVariant;
  as?: T;
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
  'h1-b':
    'text-[35px] lg:text-[70px] leading-[136%] font-bold uppercase font-["NEXON_Lv2_Gothic:Bold",_sans-serif]',

  // H2 B: 54px / Auto / Bold
  'h2-b':
    'text-[27px] lg:text-[54px] leading-[normal] font-bold font-["NEXON_Lv2_Gothic:Bold",_sans-serif]',

  // H3 B: 40px / Auto / Bold / Upper
  'h3-b':
    'text-[20px] lg:text-[40px] leading-[normal] font-bold uppercase font-["NEXON_Lv2_Gothic:Bold",_sans-serif]',

  // Dialogue M: 36px / Auto / Medium / Upper
  'dialogue-m':
    'text-[18px] lg:text-[36px] leading-[normal] font-medium uppercase font-["NEXON_Lv2_Gothic:Medium",_sans-serif]',

  // Dialogue B: 36px / Auto / Bold
  'dialogue-b':
    'text-[18px] lg:text-[36px] leading-[normal] font-bold font-["NEXON_Lv2_Gothic:Bold",_sans-serif]',

  // Dialogue_2: 30px / 136% / Regular / Upper
  'dialogue-2':
    'text-[15px] lg:text-[30px] leading-[136%] font-normal uppercase font-["NEXON_Lv2_Gothic:Regular",_sans-serif]',

  // Subtitle_1 M: 28px / Auto / Medium
  'subtitle-1-m':
    'text-[14px] lg:text-[28px] leading-[normal] font-medium font-["NEXON_Lv2_Gothic:Medium",_sans-serif]',

  // Subtitle_2 M: 26px / Auto / Medium
  'subtitle-2-m':
    'text-[13px] lg:text-[26px] leading-[normal] font-medium font-["NEXON_Lv2_Gothic:Medium",_sans-serif]',

  // Subtitle_2 B: 26px / Auto / Bold
  'subtitle-2-b':
    'text-[13px] lg:text-[26px] leading-[normal] font-bold font-["NEXON_Lv2_Gothic:Bold",_sans-serif]',

  // Body: 26px / 135% / -1% / Regular / NanumSquare Neo OTF
  body: 'text-[13px] lg:text-[26px] leading-[135%] font-normal tracking-[-0.01em] font-["NanumSquareNeoOTF-Rg",_sans-serif]',

  // Mini Dialogue: 24px / 137.63% / -0.5% / Regular / NanumSquare Neo OTF
  'mini-dialogue':
    'text-[12px] lg:text-[24px] leading-[137.63%] font-normal tracking-[-0.005em] font-["NanumSquareNeoOTF-Rg",_sans-serif]',

  // Caption: 22px / Auto / Medium
  caption:
    'text-[11px] lg:text-[22px] leading-[normal] font-medium font-["NEXON_Lv2_Gothic:Medium",_sans-serif]',
};

/**
 *
 * @param variant - 타이포그래피 변수
 * @param as - 시맨틱 태그
 * @param className - 클래스 이름
 * @param children - 자식 요소
 * @returns
 */
function TypographyInner<T extends SemanticTag = SemanticTag>(
  { variant, as, className, children, ...props }: TypographyProps<T>,
  ref: React.ForwardedRef<ElementTypeMap[T]>
) {
  // as prop이 없으면 기본 태그 사용
  const Component = as ?? defaultSemanticTags[variant];

  return (
    <Component
      ref={ref as any} // eslint-disable-line @typescript-eslint/no-explicit-any
      className={cn(variantClassNames[variant], className)}
      data-typography-variant={variant}
      {...props}
    >
      {children}
    </Component>
  );
}
const Typography = forwardRef(TypographyInner) as <
  T extends SemanticTag = SemanticTag,
>(
  props: TypographyProps<T> & { ref?: React.ForwardedRef<ElementTypeMap[T]> }
) => React.ReactElement;

export default Typography;
