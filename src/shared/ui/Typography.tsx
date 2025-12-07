import { cn } from '@shared/lib/utils';
import type React from 'react';
import { forwardRef } from 'react';

export type TypographyVariant =
  | 'h1-80'
  | 'h1-b'
  | 'h2-b'
  | 'h3-m'
  | 'h3-b'
  | 'h4-b'
  | 'h4-eb'
  | 'title'
  | 'dialogue-m'
  | 'dialogue-b'
  | 'dialogue-2'
  | 'button-b'
  | 'button-eb'
  | 'mini-dialogue'
  | 'subtitle-1-m'
  | 'subtitle-2-m'
  | 'subtitle-2-b'
  | 'body'
  | 'body-b'
  | 'body-2-b'
  | 'body-3-r'
  | 'body-3-m'
  | 'caption'
  | 'caption-2';

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
  'h1-80': 'h1',
  'h1-b': 'h1',
  'h2-b': 'h2',
  'h3-m': 'h3',
  'h3-b': 'h3',
  'h4-b': 'h4',
  'h4-eb': 'h4',
  title: 'h1',
  'dialogue-m': 'p',
  'dialogue-b': 'p',
  'dialogue-2': 'p',
  'button-b': 'p',
  'button-eb': 'p',
  'mini-dialogue': 'p',
  'subtitle-1-m': 'p',
  'subtitle-2-m': 'p',
  'subtitle-2-b': 'p',
  body: 'p',
  'body-b': 'p',
  'body-2-b': 'p',
  'body-3-r': 'p',
  'body-3-m': 'p',
  caption: 'p',
  'caption-2': 'p',
};

const variantClassNames: Record<TypographyVariant, string> = {
  // H1 80: 80px / Bold / Nexon Lv2 Gothic
  'h1-80': 'text-[32px] lg:text-[80px] font-bold font-nexon-lv2-gothic',

  // H1 B: 70px / Bold / Upper / Nexon Lv1 Gothic Low OTF
  'h1-b':
    'text-[28px] lg:text-[70px] font-bold uppercase leading-[1.36] font-nexon-lv1-gothic-low-otf',

  // H2 B: 54px / Bold / Nexon Lv2 Gothic
  'h2-b': 'text-[21.6px] lg:text-[54px] font-bold font-nexon-lv2-gothic',

  // H3 M: 40px / Medium / Nexon Lv2 Gothic
  'h3-m': 'text-[16px] lg:text-[40px] font-medium font-nexon-lv2-gothic',

  // H3 B: 40px / Bold / Upper / Nexon Lv2 Gothic
  'h3-b':
    'text-[16px] lg:text-[40px] font-bold uppercase font-nexon-lv2-gothic',

  // H4 B: 40px / Bold / Upper / NanumSquare Neo OTF
  'h4-b':
    'text-[16px] lg:text-[40px] font-bold uppercase font-nanumsquare-neo-otf',

  // H4 EB: 40px / Extrabold / Upper / NanumSquare Neo OTF
  'h4-eb':
    'text-[16px] lg:text-[40px] font-extrabold uppercase font-nanumsquare-neo-otf',

  // Title: 48px / Extrabold / NanumSquare Neo OTF
  title: 'text-[19.2px] lg:text-[48px] font-extrabold font-nanumsquare-neo-otf',

  // Dialogue M: 36px / Medium / Nexon Lv2 Gothic
  'dialogue-m':
    'text-[14.4px] lg:text-[36px] font-medium leading-[1.35] font-nexon-lv2-gothic',

  // Dialogue B: 36px / Bold / Nexon Lv2 Gothic
  'dialogue-b': 'text-[14.4px] lg:text-[36px] font-bold font-nexon-lv2-gothic',

  // Dialogue 2: 30px / Regular / Nexon Lv2 Gothic
  'dialogue-2':
    'text-[12px] lg:text-[30px] font-normal leading-[1.36] font-nexon-lv2-gothic',

  // Button B: 30px / Bold / NanumSquare Neo OTF
  'button-b': 'text-[12px] lg:text-[30px] font-bold font-nanumsquare-neo-otf',

  // Button EB: 30px / Extrabold / Upper / NanumSquare Neo OTF
  'button-eb':
    'text-[12px] lg:text-[30px] font-extrabold uppercase font-nanumsquare-neo-otf',

  // Mini Dialogue: 28px / Regular / NanumSquare Neo OTF
  'mini-dialogue':
    'text-[11.2px] lg:text-[28px] font-normal tracking-[-0.005em] leading-[1.38] font-nanumsquare-neo-otf',

  // Subtitle 1 M: 28px / Medium / Nexon Lv2 Gothic
  'subtitle-1-m':
    'text-[11.2px] lg:text-[28px] font-medium font-nexon-lv2-gothic',

  // Subtitle 2 M: 26px / Medium / Nexon Lv2 Gothic
  'subtitle-2-m':
    'text-[10.4px] lg:text-[26px] font-medium font-nexon-lv2-gothic',

  // Subtitle 2 B: 26px / Bold / Nexon Lv2 Gothic
  'subtitle-2-b':
    'text-[10.4px] lg:text-[26px] font-bold font-nexon-lv2-gothic',

  // Body: 26px / Regular / NanumSquare Neo OTF
  body: 'text-[10.4px] lg:text-[26px] font-normal tracking-[-0.01em] leading-[1.38] font-nanumsquare-neo-otf',

  // Body B: 26px / Bold / NanumSquare Neo OTF
  'body-b':
    'text-[10.4px] lg:text-[26px] font-bold tracking-[-0.01em] leading-[1.38] font-nanumsquare-neo-otf',

  // Body 2 B: 24px / Bold / NanumSquare Neo OTF
  'body-2-b':
    'text-[9.6px] lg:text-[24px] font-bold tracking-[-0.01em] leading-[1.3] font-nanumsquare-neo-otf',

  // Body 3 R: 24px / Regular / Nexon Lv2 Gothic
  'body-3-r':
    'text-[9.6px] lg:text-[24px] font-normal leading-[1.3] font-nexon-lv2-gothic',

  // Body 3 M: 24px / Medium / Nexon Lv2 Gothic
  'body-3-m': 'text-[9.6px] lg:text-[24px] font-medium font-nexon-lv2-gothic',

  // Caption: 22px / Medium / Nexon Lv2 Gothic
  caption: 'text-[8.8px] lg:text-[22px] font-medium font-nexon-lv2-gothic',

  // Caption 2: 20px / Regular / Nexon Lv2 Gothic
  'caption-2':
    'text-[8px] lg:text-[20px] font-normal leading-[1.3] font-nexon-lv2-gothic',
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
