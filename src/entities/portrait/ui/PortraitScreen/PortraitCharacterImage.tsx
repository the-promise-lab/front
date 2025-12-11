import { cn } from '@shared/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface PortraitCharacterImageProps extends HTMLMotionProps<'img'> {
  dimmed?: boolean;
  position: 'left-end' | 'left' | 'center' | 'right' | 'right-end';
}

export default function PortraitCharacterImage({
  dimmed,
  position,
  ...props
}: PortraitCharacterImageProps) {
  return (
    <motion.img
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={cn(
        'absolute bottom-0 h-[80dvh] -translate-x-1/2',
        'transition-all duration-500 ease-out',
        dimmed ? 'z-10' : 'z-20',
        position === 'left-end' && 'left-[25%]',
        position === 'left' && 'left-[37%]',
        position === 'center' && 'left-1/2',
        position === 'right' && 'left-[62%]',
        position === 'right-end' && 'left-[75%]',
        dimmed ? 'scale-100 brightness-50 grayscale' : 'scale-110'
      )}
      {...props}
    />
  );
}
