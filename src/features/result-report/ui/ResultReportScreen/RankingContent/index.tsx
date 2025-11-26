import { ContentTitle } from '../kit/ContentTitle';
import { GlassPanel } from '../kit/GlassPanel';

export default function RankingContent() {
  return (
    <div className='relative flex h-full w-full flex-col'>
      {/* 타이틀 영역 - 기존 h-45 유지 */}
      <div className='flex h-45 shrink-0 items-center px-16'>
        <ContentTitle title='Ranking' />
      </div>

      {/* 컨텐츠 영역 */}
      <div className='relative flex-1'>
        <GlassPanel className='absolute inset-0 h-screen w-full' />
      </div>
    </div>
  );
}
