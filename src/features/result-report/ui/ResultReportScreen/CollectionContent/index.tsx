import { ContentTitle } from '../kit/ContentTitle';
import CollectionModal from './CollectionModal';
import useResultCollections from '../../../model/useResultCollections';

export default function CollectionContent() {
  const { data: resultCollections } = useResultCollections();

  return (
    <div className='relative flex h-full w-full flex-col px-16'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Collection' />
      </div>

      {/* 컨텐츠 영역 */}
      <div className='scrollbar-hide relative flex flex-1 justify-center overflow-y-auto'>
        <div className='flex h-fit w-fit flex-wrap gap-x-25 gap-y-18.75'>
          {resultCollections?.map(characterSet => (
            <CollectionModal
              key={characterSet.characterGroupCode}
              collectionCharacterSet={characterSet}
              isActive={characterSet.collectionCards.length > 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
