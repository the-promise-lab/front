import { ContentTitle } from '../kit/ContentTitle';
import { RESULT_COLLECTION_CHARACTER_SETS } from '../../../__mocks__/mockResults';
import CollectionModal from './CollectionModal';

export default function CollectionContent({
  activeCharacterSetId,
}: {
  activeCharacterSetId: number;
}) {
  return (
    <div className='relative flex h-full w-full flex-col px-16'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Collection' />
      </div>

      {/* 컨텐츠 영역 */}
      <div className='relative flex flex-1 justify-center'>
        <div className='grid h-fit w-fit grid-cols-2 gap-x-25 gap-y-18.75'>
          {RESULT_COLLECTION_CHARACTER_SETS.map(characterSet => (
            <CollectionModal
              key={characterSet.id}
              collectionCharacterSet={characterSet}
              isActive={activeCharacterSetId === characterSet.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
