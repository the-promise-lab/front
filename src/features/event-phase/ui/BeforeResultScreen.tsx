import { motion } from 'framer-motion';
import GlowButton from '@shared/ui/GlowButton';
import Typography from '@shared/ui/Typography';

interface BeforeResultScreenProps {
  onGoToMainMenu?: () => void;
  backgroundImage?: string;
}
export default function BeforeResultScreen({
  onGoToMainMenu,
  backgroundImage,
}: BeforeResultScreenProps) {
  return (
    <div
      className='fixed inset-0 h-screen w-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'spring',
          duration: 0.5,
        }}
        className='fixed right-20 bottom-20 flex flex-col gap-4'
      >
        <GlowButton
          onClick={e => {
            e.stopPropagation(); // 이벤트 전파 방지
            console.log('메인메뉴 버튼 클릭됨');
            // 메인메뉴로 이동
            onGoToMainMenu?.();
            console.log('onGoToMainMenu 호출 완료');
          }}
        >
          <Typography variant='dialogue-m'>
            결과 보고서 화면으로 이동합니다.
          </Typography>
        </GlowButton>
      </motion.div>
    </div>
  );
}
