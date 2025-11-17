import { toast } from 'sonner';
import Typography from './Typography';

/**
 * 아이템 담기 완료 Toast
 * Figma 디자인: node-id=1196-7497
 * - 배경: 좌→우 gradient (투명 → 검정/80%)
 * - 애니메이션: fade
 * - 위치: 우하단
 */
export function toastItemAdded() {
  toast.custom(
    () => (
      <div
        className='item-added-toast flex h-19 w-192 items-center justify-end bg-gradient-to-r from-transparent from-5% to-black/80 px-12'
        data-toast-type='item-added'
      >
        <Typography variant='dialogue-m'>아이템이 담겼습니다.</Typography>
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
      className: 'item-added-toast-container',
    }
  );
}
