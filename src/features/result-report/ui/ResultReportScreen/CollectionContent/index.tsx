import { ContentTitle } from '../kit/ContentTitle';

export default function CollectionContent() {
  return (
    <div className='relative flex h-full w-full flex-col px-16'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center'>
        <ContentTitle title='Collection' />
      </div>

      {/* 컨텐츠 영역 */}
      <div className='relative flex-1'>
        {/* TODO: Collection 컨텐츠 구현 */}
      </div>
    </div>
  );
}
