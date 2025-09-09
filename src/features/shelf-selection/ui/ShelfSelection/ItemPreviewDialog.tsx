import type { ShelfItem } from '../../model/types';
import OverlayDialog from '@shared/ui/OverlayDialog';

interface ItemPreviewDialogProps {
  item: ShelfItem | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  position?: { x: number; y: number };
}

export default function ItemPreviewDialog({
  item,
  open,
  onClose,
  onConfirm,
  position,
}: ItemPreviewDialogProps) {
  if (!item) return null;

  return (
    <OverlayDialog
      open={open}
      onClose={onClose}
      showTitle={false}
      closeOnBackdropClick
      position={position}
      backgroundColor="bg-black/10"
      className="w-64 p-3 bg-gray-900/80"
    >
      <div className="flex gap-3 items-start mb-3">
        <div className="w-12 h-12 shrink-0 bg-gray-100 border border-gray-200" />
        <div className="flex-1 min-w-0">
          <div className="text-gray-100 text-sm font-medium mb-1">
            {item.name}
          </div>
          <div className="text-gray-100 text-xs leading-relaxed">
            {item.description}
          </div>
        </div>
      </div>

      <button
        className="w-full max-w-32 text-sm py-2 rounded-full text-gray-100 border-gray-100 border bg-gray-600/70"
        onClick={onConfirm}
      >
        담기
      </button>
    </OverlayDialog>
  );
}
