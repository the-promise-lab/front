import Typography from '@shared/ui/Typography';
import { useState } from 'react';

export default function TmpDesignSystemPreview() {
  const [showDesignSystem, setShowDesignSystem] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDesignSystem(true)}
        className='fixed right-4 bottom-4 h-12 w-12 font-medium'
      >
        🎨
      </button>
      {showDesignSystem && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='relative h-[90vh] w-[90vw] overflow-auto rounded-lg bg-white p-8 shadow-2xl'>
            <button
              onClick={() => setShowDesignSystem(false)}
              className='sticky top-0 float-right h-12 w-12 bg-red-500 font-medium text-white transition-all hover:bg-red-600 active:bg-red-700'
            >
              ✕
            </button>

            <div className='clear-both space-y-8'>
              <div>
                <h1 className='mb-6 text-3xl font-bold text-gray-800'>
                  Typography 디자인 시스템
                </h1>
                <p className='mb-8 text-gray-600'>
                  모든 타이포그래피 variant를 확인할 수 있습니다.
                </p>
              </div>

              {/* H1 B */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="h1-b"
                </p>
                <Typography variant='h1-b' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* H2 B */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="h2-b"
                </p>
                <Typography variant='h2-b' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* H3 B */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="h3-b"
                </p>
                <Typography variant='h3-b' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Dialogue M */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="dialogue-m"
                </p>
                <Typography variant='dialogue-m' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Dialogue B */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="dialogue-b"
                </p>
                <Typography variant='dialogue-b' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Dialogue_2 */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="dialogue-2"
                </p>
                <Typography variant='dialogue-2' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Subtitle_1 M */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="subtitle-1-m"
                </p>
                <Typography variant='subtitle-1-m' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Subtitle_2 M */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="subtitle-2-m"
                </p>
                <Typography variant='subtitle-2-m' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Subtitle_2 B */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant='subtitle-2-b'
                </p>
                <Typography variant='subtitle-2-b' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Body */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant='body'
                </p>
                <Typography variant='body' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Mini Dialogue */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="mini-dialogue"
                </p>
                <Typography variant='mini-dialogue' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>

              {/* Caption */}
              <div className='border-b pb-4'>
                <p className='mb-2 text-sm font-medium text-purple-600'>
                  variant="caption"
                </p>
                <Typography variant='caption' className='text-black'>
                  Lorem Ipsum
                </Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
