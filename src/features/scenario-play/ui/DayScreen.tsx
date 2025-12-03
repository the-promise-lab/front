import Typography from '@shared/ui/Typography';
import NoticeBanner from '@shared/ui/NoticeBanner';

interface DayScreenProps {
  dayNumber: number;
  onComplete?: () => void;
}

export default function DayScreen({ dayNumber, onComplete }: DayScreenProps) {
  const handleClick = () => {
    onComplete?.();
  };

  return (
    <div className='h-full w-full cursor-pointer' onClick={handleClick}>
      <NoticeBanner>
        <Typography variant='h1-b'>DAY {dayNumber}</Typography>
      </NoticeBanner>
    </div>
  );
}
