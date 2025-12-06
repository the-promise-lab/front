import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { cn } from '@shared/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Typography from '@shared/ui/Typography';
import { GradientGlassFromEdge } from '@shared/ui/GradientGlassFromEdge';
import { IconDiamond, IconDiamondPressed } from '@shared/ui/icons';

interface ChoiceOptionProps {
  text: string;
  onPress?: (isPressed: boolean) => void;
}

const TIMEOUT_DURATION = 2000;

export default function ChoiceOption({ text, onPress }: ChoiceOptionProps) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePress = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const newPressedState = !isPressed;
    setIsPressed(newPressedState);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsPressed(false);
      onPress?.(newPressedState);
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {isPressed ? (
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'relative h-24 w-full',
            'z-0 flex cursor-pointer items-center gap-4.5 px-7'
          )}
        >
          <div className='relative z-1 size-10 shrink-0'>
            <IconDiamondPressed className='absolute inset-0' />
          </div>
          <ChoiceOptionSelectedSvg className='absolute top-1/2 -left-6 h-40 w-auto -translate-y-1/2' />
          <div className='z-1 text-sm leading-none font-bold text-white'>
            <Typography variant='subtitle-2-b'>{text}</Typography>
          </div>
        </motion.div>
      ) : (
        <div
          onClick={handlePress}
          className={cn(
            'relative z-0 flex h-24 w-full cursor-pointer items-center gap-4.5 px-7',
            'transition-all duration-200 ease-in-out'
            // isPressed && 'active scale-[1.05]'
          )}
        >
          <GradientGlassFromEdge
            className='absolute! top-0 left-0 rounded-l-full'
            isPressed={isPressed}
          />
          <div className='relative z-1 size-10 shrink-0'>
            <IconDiamond className='absolute inset-0' />
          </div>
          <div className='z-1 text-sm leading-none font-bold text-white'>
            <Typography variant='subtitle-2-b'>{text}</Typography>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function ChoiceOptionSelectedSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 1401 152'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <foreignObject x='0' y='0' width='1401' height='152'>
        <div
          style={{
            backdropFilter: 'blur(2px)',
            clipPath: 'url(#bgblur_0_2713_3422_clip_path)',
            height: '100%',
            width: '100%',
          }}
        ></div>
      </foreignObject>
      <g filter='url(#filter0_d_2713_3422)' data-figma-bg-blur-radius='4'>
        <path
          d='M28 76C28 49.4903 49.4903 28 76 28H1373V124H76C49.4903 124 28 102.51 28 76Z'
          fill='black'
          fillOpacity='0.2'
          shapeRendering='crispEdges'
        />
        <path
          d='M76 29H1372V123H76C50.0426 123 29 101.957 29 76C29 50.0426 50.0426 29 76 29Z'
          stroke='url(#paint0_radial_2713_3422)'
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
        <path
          d='M76 29H1372V123H76C50.0426 123 29 101.957 29 76C29 50.0426 50.0426 29 76 29Z'
          stroke='url(#paint1_linear_2713_3422)'
          strokeOpacity='0.8'
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_2713_3422'
          x='0'
          y='0'
          width='1401'
          height='152'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset />
          <feGaussianBlur stdDeviation='14' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.909804 0 0 0 0 0.729412 0 0 0 0 0.0823529 0 0 0 0.25 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_2713_3422'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_2713_3422'
            result='shape'
          />
        </filter>
        <clipPath id='bgblur_0_2713_3422_clip_path' transform='translate(0 0)'>
          <path d='M28 76C28 49.4903 49.4903 28 76 28H1373V124H76C49.4903 124 28 102.51 28 76Z' />
        </clipPath>
        <radialGradient
          id='paint0_radial_2713_3422'
          cx='0'
          cy='0'
          r='1'
          gradientUnits='userSpaceOnUse'
          gradientTransform='translate(669.932 8.11759) rotate(90) scale(42.3478 485.436)'
        >
          <stop stopColor='#FF8A00' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </radialGradient>
        <linearGradient
          id='paint1_linear_2713_3422'
          x1='28'
          y1='76'
          x2='1373'
          y2='76'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FFDB5A' />
          <stop offset='0.831731' stopColor='#FFDB5A' stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  );
}
