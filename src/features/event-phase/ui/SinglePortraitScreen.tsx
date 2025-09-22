import { useState, type MouseEvent } from 'react';
import PortraitBanner from './kit/PortraitBanner';

const portraits = [
  '우리는 통장에 돈이 빠지는게 더 낫지. 근손실보다는..',
  '맞습니다 헴!!',
  '닭가슴살 또 챙기러 갑시다!!',
];

export default function SinglePortraitScreen() {
  const [portraitIndex, setPortraitIndex] = useState(0);
  const handleNextPortrait = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setPortraitIndex(prev => (prev + 1) % portraits.length);
  };
  const currentPortrait = portraits[portraitIndex];
  return (
    <div className='relative h-full w-full'>
      <PortraitBanner
        onClick={handleNextPortrait}
        key={`currentPortrait-${portraitIndex}`}
        portrait={currentPortrait}
        characterName='캐릭터 이름'
      />
    </div>
  );
}
