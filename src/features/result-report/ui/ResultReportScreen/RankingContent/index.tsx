import { GlassPanel } from '../kit/GlassPanel';

export default function RankingContent() {
  return (
    <div className='relative flex h-full w-full flex-col pt-8'>
      <GlassPanel className='absolute inset-0 h-screen w-full' />
    </div>
  );
}
