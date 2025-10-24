import Typography from '@shared/ui/Typography';
import NoticeBanner from './kit/NoticeBanner';

export default function DayScreen() {
  const day = 1;
  return (
    <NoticeBanner>
      <Typography variant='h1-b'>DAY {day}</Typography>
    </NoticeBanner>
  );
}
