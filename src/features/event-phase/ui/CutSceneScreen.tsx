import TypingText from '@shared/ui/TypingText';
import { cn } from '@shared/lib/utils';
import { useSetBackground } from '@shared/background';

interface Props {
  imageUrl: string;
  text: string;
}

export function CutSceneScreen({ imageUrl, text }: Props) {
  useSetBackground({
    image: imageUrl,
  });
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] h-full w-full bg-cover bg-center bg-no-repeat'
      )}
    >
      <div
        className={cn(
          'fixed right-0 bottom-[7%] left-0 flex h-59 w-full items-center justify-center',
          'text-center break-keep whitespace-pre-line',
          'animate-in fade-in-0 zoom-in-95 duration-750'
        )}
        style={{
          background:
            'linear-gradient(90deg, rgba(25, 25, 32, 0.00) 5%, rgba(25, 25, 32, 0.60) 25%, rgba(0, 0, 0, 0.80) 50%, #191920 75.48%, rgba(25, 25, 32, 0.00) 95%)',
        }}
      >
        <TypingText texts={text.split('\\n')} variant='dialogue-m' smooth />
      </div>
    </div>
  );
}
