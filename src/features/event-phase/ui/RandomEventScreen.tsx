import { IconCaution } from '@shared/ui/icons';
import ChoiceOption from './kit/ChoiceOption';

interface RandomEventScreenProps {
  type?: 'STORY' | 'RANDOM';
}
export default function RandomEventScreen({
  type = 'STORY',
}: RandomEventScreenProps) {
  const title = '랜덤 이벤트 제목';
  const description =
    '랜덤 이벤트에 대한 텍스트가 들어갑니다.\n선택지[1]과 선택지[2]가 있는 화면의 경우,\n엔딩 분기를 위한 스토리형 사건입니다.';
  const storyOptions = [
    {
      label: '[1] 선택지 내용이 출력됩니다.',
    },
    {
      label: '[2] 선택지 내용이 출력됩니다.',
    },
  ];

  return (
    <div className='flex h-[90%] w-full gap-11 pt-9 pl-14'>
      <div className='h-full w-[45dvw] rounded-[4px] border-2 border-white bg-white/15'>
        {/* 이미지영역 */}
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <div className='flex flex-col gap-9'>
          <h4 className='flex items-center gap-2.5 font-[NexonLv2Gothic] text-xl font-bold'>
            <IconCaution className='size-11.5' />
            {title}
          </h4>
          <p className='text-sm leading-[130%] whitespace-pre'>{description}</p>
        </div>
        {type === 'STORY' ? (
          <div className='flex flex-col gap-9'>
            {storyOptions.map(option => (
              <ChoiceOption key={option.label} text={option.label} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
