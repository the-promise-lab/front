import { toast } from 'sonner';
import Typography from './Typography';

export function toastItemAdded(name: string) {
  toast.custom(
    () => (
      <div
        className='flex h-19 w-192 items-center justify-end bg-gradient-to-r from-transparent from-5% to-black/80 px-12'
        data-toast-type='item-added'
      >
        <Typography variant='dialogue-m' className='text-white'>
          {name} 담기 완료!
        </Typography>
      </div>
    ),
    {
      position: 'bottom-right',
      duration: 2000,
      unstyled: true, // 기본 스타일/애니메이션 제거
      style: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
        margin: 0,
      },
      className: 'item-added-toast-container item-added-toast !bottom-30',
    }
  );
}
