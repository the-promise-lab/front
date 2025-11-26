import { IconDiamond } from '@shared/ui/icons';
import Typography from '@shared/ui/Typography';
import CharacterResultCard from './CharacterResultCard';

interface CharacterResult {
  characterNames: string;
  result: string;
  imageUrl?: string;
}

interface FinalResultSectionProps {
  characters: CharacterResult[];
}

export default function FinalResultSection({
  characters,
}: FinalResultSectionProps) {
  return (
    <div className='flex flex-col gap-4'>
      {/* Final Result 라벨 */}
      <div className='flex items-center gap-3'>
        <IconDiamond className='size-8' />
        <Typography variant='body-b' className='text-white'>
          Final Result
        </Typography>
      </div>

      {/* 2x2 캐릭터 카드 그리드 */}
      <div className='grid grid-cols-2 gap-x-6 gap-y-4 pl-10'>
        {characters.map((character, index) => (
          <CharacterResultCard
            key={index}
            characterNames={character.characterNames}
            result={character.result}
            imageUrl={character.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
