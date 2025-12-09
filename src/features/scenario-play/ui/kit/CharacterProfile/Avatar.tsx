import { cn } from '@shared/lib/utils';
import { getObjectUrlSelector, useAssetStore } from '@shared/preload-assets';

interface AvatarProps {
  className?: string;
  name?: string;
  image?: string;
  characterColors?: {
    backgroundColor: string;
    borderColor: string;
  };
  active?: boolean;
}
export default function Avatar({
  className,
  name,
  image,
  characterColors,
  active = false,
}: AvatarProps) {
  const getObjectUrl = useAssetStore(getObjectUrlSelector);
  return (
    <div
      className={cn(
        'aspect-square rounded-[80px] bg-white/80 shadow-[0px_0px_14px_0px_rgba(0,0,0,0.3)]',
        `relative h-25 w-25`,
        'bg-cover bg-center bg-no-repeat',
        active ? 'border-1 border-solid lg:border-2' : '',
        className
      )}
      style={{
        backgroundColor:
          characterColors?.backgroundColor || 'rgba(255, 255, 255, 0.5)',
        borderColor: characterColors?.borderColor || 'transparent',
      }}
    >
      {name && (
        <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-nowrap text-white'>
          {name}
        </span>
      )}
      {image && (
        <img
          src={getObjectUrl(image)}
          alt={name || 'avatar'}
          className='absolute top-0 left-0 h-full w-full rounded-[80px] object-cover'
        />
      )}
    </div>
  );
}
