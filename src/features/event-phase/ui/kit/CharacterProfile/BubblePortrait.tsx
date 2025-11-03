import { cn } from '@shared/lib/utils';
import TypingText from '@shared/ui/TypingText';

interface BubblePortraitProps {
  className?: string;
  text: string;
  characterColors: {
    backgroundColor: string;
    borderColor: string;
  };
}

export default function BubblePortrait({
  className,
  text,
  characterColors,
}: BubblePortraitProps) {
  return (
    <div
      className={cn(
        'flex w-fit items-center justify-center px-6.5 py-4',
        'rounded-[8px] lg:rounded-[16px]',
        'border-1 border-solid lg:border-2',
        'fade-in',
        className
      )}
      style={{
        backgroundColor: characterColors.backgroundColor,
        borderColor: characterColors.borderColor,
      }}
    >
      <TypingText smooth texts={[text]} variant='dialogue-m' />
    </div>
  );
}
