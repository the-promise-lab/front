import { BagSelection } from '@features/bag-selection/ui/BagSelection';
import {
  Header,
  playingCharacterSetSelector,
  useGameFlowStore,
} from '@processes/game-flow';
import EdgeGradient from '@shared/ui/layout/EdgeGradient';

export default function BagSelectPage() {
  const { saveBag, next } = useGameFlowStore();
  const playingCharacterSet = useGameFlowStore(playingCharacterSetSelector);
  return (
    <div className='relative flex h-full w-full flex-col gap-0'>
      <EdgeGradient />
      <Header
        hasCharacterProfiles
        playingCharacters={playingCharacterSet?.playingCharacters}
      />
      <BagSelection
        onComplete={selectedBag => {
          console.log('Selected bag:', selectedBag);
          saveBag(selectedBag);
          next();
        }}
      />
    </div>
  );
}
