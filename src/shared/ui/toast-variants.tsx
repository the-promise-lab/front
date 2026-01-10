import { toast } from 'sonner';
import Typography from './Typography';

export function toastItemAdded(name: string) {
  toast.custom(
    () => (
      <div
        className='flex h-19 w-fit -translate-x-1/2 items-center justify-center px-24'
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0) 50%, rgba(0,0,0,0) 100%)',
        }}
        data-toast-type='item-added'
      >
        <Typography variant='dialogue-m' className='text-nowrap text-white'>
          {name} 담기 완료!
        </Typography>
      </div>
    ),
    {
      duration: 2000,
      unstyled: true, // 기본 스타일/애니메이션 제거
      style: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        padding: 0,
        margin: 0,
      },
      position: 'bottom-center',
      className: 'item-added-toast-container item-added-toast !bottom-35',
    }
  );
}
