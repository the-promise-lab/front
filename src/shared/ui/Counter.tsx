import { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from 'framer-motion';

/**
 *
 * @param root0
 * @param root0.value
 */

type Props = {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  springOptions?: SpringOptions;
};

export default function Counter({
  value,
  direction = 'up',
  className,
  springOptions,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 100,
    stiffness: 100,
    ...springOptions,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === 'down' ? 0 : value);
    }
  }, [motionValue, isInView, direction, value]);

  useEffect(
    () =>
      springValue.on('change', latest => {
        if (direction === 'down') console.log('latest', latest);
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('en-US').format(
            parseInt(latest.toFixed(0))
          );
        }
      }),
    [springValue, direction]
  );

  if (value === 0) {
    return (
      <span className={className} ref={ref}>
        &nbsp;
      </span>
    );
  }
  return <span className={className} ref={ref} />;
}
