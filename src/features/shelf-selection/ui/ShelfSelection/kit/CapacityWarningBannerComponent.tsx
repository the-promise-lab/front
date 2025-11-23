import NoticeBanner from '@shared/ui/NoticeBanner';
import Typography from '@shared/ui/Typography';
import { AnimatePresence, motion } from 'framer-motion';

interface CapacityWarningBannerComponentProps {
  isVisible: boolean;
}

export default function CapacityWarningBannerComponent({
  isVisible,
}: CapacityWarningBannerComponentProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <NoticeBanner withCaution>
            <Typography variant='dialogue-m'>
              더 이상 담을 수 없습니다.
            </Typography>
          </NoticeBanner>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
