import { motion } from 'framer-motion';
import GlowButton from '@shared/ui/GlowButton';
import Typography from '@shared/ui/Typography';
import { useSetBackground } from '@shared/background';

interface BeforeResultScreenProps {
  onGoToResultReport?: () => void;
  backgroundImage?: string;
}
export default function BeforeResultScreen({
  onGoToResultReport,
  backgroundImage,
}: BeforeResultScreenProps) {
  useSetBackground({
    image: backgroundImage,
  });
  return (
    <div className='fixed inset-0 h-screen w-screen bg-cover bg-center'>
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
            e.stopPropagation();
            onGoToResultReport?.();
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
