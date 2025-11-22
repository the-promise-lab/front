import { BagSelection } from '@features/bag-selection/ui/BagSelection';
import {
  Header,
  playingCharacterSetSelector,
  useGameFlowStore,
} from '@processes/game-flow';

export default function BagSelectPage() {
  const { saveBag, next } = useGameFlowStore();
  const playingCharacterSet = useGameFlowStore(playingCharacterSetSelector);
  return (
    <div className='relative flex h-full w-full flex-col gap-0'>
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
