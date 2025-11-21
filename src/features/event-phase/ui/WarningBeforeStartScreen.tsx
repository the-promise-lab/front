import TypingText from '@shared/ui/TypingText';
import NoticeBanner from '../../../shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';

export default function WarningBeforeStartScreen() {
  return (
    <NoticeBanner withCaution>
      <Typography variant='dialogue-2'>
        <TypingText
          texts={[
            '상황마다 주어지는 기회는 단 한 번뿐입니다. 이제 모든 것은 당신의 선택에 달려 있습니다.',
            '결과는 되돌릴 수 없으니, 신중히 결정하세요.',
          ]}
          smooth
        />
      </Typography>
    </NoticeBanner>
  );
}
