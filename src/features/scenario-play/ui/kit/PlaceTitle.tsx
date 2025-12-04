import Typography from '@shared/ui/Typography';

interface PlaceTitleProps {
  title: string;
}

export default function PlaceTitle({ title }: PlaceTitleProps) {
  return (
    <div className='relative flex h-18 w-110 items-center bg-gradient-to-r from-[#000000] to-[#00000000] px-10.75 py-0'>
      {/* 흰색 세로 바 */}
      <div className='absolute top-1.5 left-11 flex items-center gap-3'>
        <div className='h-10 w-1.5 shrink-0 bg-white' />

        {/* 제목 텍스트 */}
        <Typography variant='h3-b' className='text-white'>
          {title}
        </Typography>
      </div>
    </div>
  );
}
