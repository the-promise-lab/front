import NoticeBanner from './kit/NoticeBanner';

export default function DayScreen() {
  const day = 1;
  return (
    <NoticeBanner>
      <p className='font-[NexonLv2Gothic] text-4xl font-bold'>DAY {day}</p>
    </NoticeBanner>
  );
}
