interface PlaceTitleProps {
  title: string;
}

export default function PlaceTitle({ title }: PlaceTitleProps) {
  return (
    <div className='relative flex h-18 w-131 items-center gap-[10px] bg-gradient-to-r from-[#343337] to-[rgba(52,51,55,0)] px-10.75 py-0'>
      {/* 흰색 세로 바 */}
      <div className='h-10 w-1.5 shrink-0 bg-white' />

      {/* 제목 텍스트 */}
      <div className='absolute top-3.5 left-15.25'>
        <p className='text-xl leading-[normal] font-bold tracking-[-0.4px] whitespace-nowrap text-white'>
          {title}
        </p>
      </div>
    </div>
  );
}
