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
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scale: dimmed ? 1 : 1.1,
        filter: dimmed
          ? 'brightness(0.5) grayscale(1)'
          : 'brightness(1) grayscale(0)',
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
        scale: { duration: 0.5, ease: 'easeOut' },
        filter: { duration: 0.5, ease: 'easeOut' },
      }}
      className={cn(
        'absolute bottom-0 h-[80dvh] -translate-x-1/2',
        dimmed ? 'z-10' : 'z-20',
        position === 'left-end' && 'left-[25%]',
        position === 'left' && 'left-[37%]',
        position === 'center' && 'left-1/2',
        position === 'right' && 'left-[62%]',
        position === 'right-end' && 'left-[75%]'
      )}
      {...props}
    />
  );
}
