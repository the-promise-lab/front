import Typography from '@shared/ui/Typography';

interface CharacterResultCardProps {
  characterNames: string;
  result: string;
  imageUrl?: string;
}

export default function CharacterResultCard({
  characterNames,
  result,
  imageUrl,
}: CharacterResultCardProps) {
  return (
    <div className='flex flex-col gap-2'>
      {/* 캐릭터 이름 + 결과 */}
      <Typography variant='caption' className='text-white'>
        {characterNames}: {result}
      </Typography>

      {/* 이미지 카드 */}
      <div
        className='h-37.25 w-72.25 overflow-hidden rounded-[2.334px] border-[0.584px] border-white lg:rounded-[5.836px] lg:border-[1.459px]'
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(58.73deg, rgba(255,255,255,0.56) 1.7%, rgba(255,255,255,0) 97.22%)',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={characterNames}
            className='h-full w-full object-cover'
          />
        ) : (
          // TODO: 실제 이미지로 교체
          <div className='h-full w-full bg-gray-500/30' />
        )}
      </div>
    </div>
  );
}
