import Typography from '@shared/ui/Typography';
import { ContentTitle } from '../kit/ContentTitle';
import ImageButton from '../kit/ImageButton';
import { useState } from 'react';

const CHARACTER_SETS = [
  {
    id: 1,
    charactersName: '형빈과 병철',
    imageUrl: '/image/reportPage/collection_hb_bc.png',
  },
  {
    id: 2,
    charactersName: '복순과 진실',
    imageUrl: '/image/reportPage/collection_bs_js.png',
  },
  {
    id: 3,
    charactersName: '재욱과 예원',
    imageUrl: '/image/reportPage/collection_jw_yw.png',
  },
  {
    id: 4,
    charactersName: '미리와 재호',
    imageUrl: '/image/reportPage/collection_mr_jh.png',
  },
];

export default function CollectionContent() {
  const [selectedCharacterSetId, setSelectedCharacterSetId] = useState<
    number | null
  >(CHARACTER_SETS[0].id);

  const handleSelectCharacterSet = (characterSetId: number) => {
    setSelectedCharacterSetId(characterSetId);
  };

  return (
    <div className='relative flex h-full w-full flex-col px-16'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Collection' />
      </div>

      {/* 컨텐츠 영역 */}
      <div className='relative flex flex-1 justify-center'>
        <div className='grid h-fit w-fit grid-cols-2 gap-x-25 gap-y-18.75'>
          {CHARACTER_SETS.map(characterSet => (
            <ImageButton
              key={characterSet.id}
              className='relative h-80 w-140'
              isActive={selectedCharacterSetId === characterSet.id}
              onClick={() => handleSelectCharacterSet(characterSet.id)}
            >
              <Typography
                variant='dialogue-m'
                className='absolute top-3 left-0'
              >
                {characterSet.charactersName}
              </Typography>
              <img
                src={characterSet.imageUrl}
                alt={characterSet.charactersName}
                className='absolute right-0 bottom-0 h-full w-auto'
              />
            </ImageButton>
          ))}
        </div>
      </div>
    </div>
  );
}
