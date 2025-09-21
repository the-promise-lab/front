import { cn } from '@shared/lib/utils';
import { IconBackpackButton, IconPauseButton } from './kit/icon-button';

export default function Header() {
  return (
    <div
      className={cn(
        'absolute inset-0 z-70 h-fit pt-11 pr-11',
        'flex items-center justify-between'
      )}
    >
      <div></div>
      <div className='flex items-center gap-6'>
        <IconBackpackButton />
        <IconPauseButton />
      </div>
    </div>
  );
}
