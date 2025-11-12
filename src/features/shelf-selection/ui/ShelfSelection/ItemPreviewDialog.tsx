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
      className="w-64 bg-gray-900/80 p-3"
    >
      <div className="mb-3 flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 border border-gray-200 bg-gray-100" />
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-sm font-medium text-gray-100">
            {item.name}
          </div>
          <div className="text-xs leading-relaxed text-gray-100">
            {item.description}
          </div>
        </div>
      </div>

      <button
        className="w-full max-w-32 rounded-full border border-gray-100 bg-gray-600/70 py-2 text-sm text-gray-100"
        onClick={onConfirm}
      >
        담기
      </button>
    </OverlayDialog>
  );
}
