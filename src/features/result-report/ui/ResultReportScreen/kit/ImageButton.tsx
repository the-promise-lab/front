import type { ReactNode } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@shared/lib/utils';

interface ImageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  buttonBackgroundClassName?: string;
}

export default function ImageButton({
  children,
  className,
  isActive = false,
  buttonBackgroundClassName,
  ...props
}: ImageButtonProps) {
  return (
    <button className={cn(className)} {...props}>
      {isActive ? (
        <ImageButtonBackgroundActive
          className={cn('absolute bottom-0', buttonBackgroundClassName)}
        />
      ) : (
        <ImageButtonBackgroundInactive
          className={cn('absolute bottom-0', buttonBackgroundClassName)}
        />
      )}
      {children}
    </button>
  );
}

function ImageButtonBackgroundActive({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 592 265'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g filter='url(#filter0_d_1744_4599)'>
        <g clipPath='url(#clip0_1744_4599)'>
          <path
            d='M14 22C14 17.5817 17.5817 14 22 14H569.724C574.142 14 577.724 17.5817 577.724 22V242.136C577.724 246.554 574.142 250.136 569.724 250.136H22C17.5817 250.136 14 246.554 14 242.136V22Z'
            fill='url(#paint0_linear_1744_4599)'
            shapeRendering='crispEdges'
          />
        </g>
        <path
          d='M569.724 13C574.694 13 578.724 17.0294 578.724 22V242.136C578.724 247.106 574.694 251.136 569.724 251.136H22C17.0294 251.136 13 247.106 13 242.136V22L13.0117 21.5371C13.2526 16.7817 17.1847 13 22 13H569.724Z'
          stroke='#FFB332'
          strokeWidth='2'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_1744_4599'
          x='0'
          y='0'
          width='591.724'
          height='264.136'
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
          <feGaussianBlur stdDeviation='6' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0.996078 0 0 0 0 0.541176 0 0 0 0 0.00392157 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_1744_4599'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_1744_4599'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_1744_4599'
          x1='79.2344'
          y1='274.705'
          x2='522.161'
          y2='20.7498'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FE8A01' stopOpacity='0.8' />
          <stop offset='1' stopColor='#FE8A01' stopOpacity='0.3' />
        </linearGradient>
        <clipPath id='clip0_1744_4599'>
          <path
            d='M14 22C14 17.5817 17.5817 14 22 14H569.724C574.142 14 577.724 17.5817 577.724 22V242.136C577.724 246.554 574.142 250.136 569.724 250.136H22C17.5817 250.136 14 246.554 14 242.136V22Z'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
}

function ImageButtonBackgroundInactive({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 570 242'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g clipPath='url(#clip0_1744_4602)'>
        <rect
          x='2.72949'
          y='2.72949'
          width='563.724'
          height='236.136'
          rx='10.9196'
          fill='url(#paint0_linear_1744_4602)'
          fillOpacity='0.8'
        />
        <rect
          x='2.72949'
          y='2.72949'
          width='563.724'
          height='236.136'
          rx='10.9196'
          fill='black'
          fillOpacity='0.2'
        />
      </g>
      <rect
        x='1.36454'
        y='1.36454'
        width='566.454'
        height='238.866'
        rx='12.2845'
        stroke='url(#paint1_radial_1744_4602)'
        strokeWidth='2.7299'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1744_4602'
          x1='15.2877'
          y1='238.866'
          x2='468.872'
          y2='-100.232'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' stopOpacity='0.7' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </linearGradient>
        <radialGradient
          id='paint1_radial_1744_4602'
          cx='0'
          cy='0'
          r='1'
          gradientTransform='matrix(524.263 -134.598 119.497 81.6695 307.14 120.798)'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0.4' />
        </radialGradient>
        <clipPath id='clip0_1744_4602'>
          <rect
            x='2.72949'
            y='2.72949'
            width='563.724'
            height='236.136'
            rx='10.9196'
            fill='white'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
