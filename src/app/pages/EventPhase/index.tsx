import CautionNotice from '@features/event-phase/ui/CautionNotice';
import CharacterProfile from '@features/event-phase/ui/CharacterProfile/index';
import ChoiceOption from '@shared/ui/ChoiceOption';
import PlaceTitle from '@shared/ui/PlaceTitle';

export default function EventPhase() {
  return (
    <div className='flex h-screen w-screen flex-col gap-4 bg-[#000021]'>
      <div className='h-10' />
      <PlaceTitle title='대피소' />
      <div className='mx-auto flex w-1/2 flex-col gap-4'>
        <ChoiceOption text='대피소' />
        <ChoiceOption text='대피소' />
      </div>
      <div className='mx-auto w-1/2'>
        <CautionNotice />
      </div>
      <div className='fixed top-0 right-0'>
        <CharacterProfile mentality={100} hp={100} />
      </div>
    </div>
  );
}
