import { IconCaution } from '@shared/ui/icons';
import ChoiceOption from './kit/ChoiceOption';
import ItemButton from './kit/ItemButton';
import { motion } from 'framer-motion';
import Typography from '@shared/ui/Typography';

interface RandomEventScreenProps {
  type?: 'STORY' | 'ITEM';
  eventData?: {
    storyEventData?: {
      id: number;
      title: string;
      descriptions: string[];
      image: string;
      options?: Array<{
        text: string;
        value: string;
        statChanges?: {
          mentality?: number;
          hp?: number;
        };
      }>;
    };
    itemEventData?: {
      id: number;
      title: string;
      descriptions: string[];
      image: string;
      candidateItems?: string[];
      changeStatsValue?: {
        success?: {
          mentality?: number;
          hp?: number;
        };
        fail?: {
          mentality?: number;
          hp?: number;
        };
      };
    };
  };
}
export default function RandomEventScreen({
  type = 'STORY',
  eventData,
}: RandomEventScreenProps) {
  // props로 받은 이벤트 데이터 사용
  const storyEventData = eventData?.storyEventData;
  const itemEventData = eventData?.itemEventData;

  // TODO: 아이템 선택 시 서버에 POST 요청 (API 준비되면 구현)
  // const handleItemSelect = async (itemId: string) => {
  //   await fetch('/api/events/choice', {
  //     method: 'POST',
  //     body: JSON.stringify({ itemId }),
  //   });
  //   // 서버에서 변경된 스탯값 받아서 전역 상태 업데이트
  // };

  const title = storyEventData?.title || '랜덤 이벤트 제목';
  const description =
    storyEventData?.descriptions?.join('\n') ||
    '랜덤 이벤트에 대한 텍스트가 들어갑니다.\n선택지[1]과 선택지[2]가 있는 화면의 경우,\n엔딩 분기를 위한 스토리형 사건입니다.';

  const storyOptions = storyEventData?.options?.map(option => ({
    label: option.text,
    value: option.value,
    statChanges: option.statChanges,
  })) || [
    {
      label: '[1] 선택지 내용이 출력됩니다.',
    },
    {
      label: '[2] 선택지 내용이 출력됩니다.',
    },
    {
      label: '[3] 선택지 내용이 출력됩니다.',
    },
  ];

  const itemOptions = itemEventData?.candidateItems?.map((item, index) => ({
    name: item,
    image: `${item.toLowerCase().replace(/\s+/g, '-')}.png`,
    disabled: index === 1, // 두 번째 아이템을 비활성화로 설정
    pressed: index === 2, // 세 번째 아이템을 선택된 상태로 설정
  })) || [
    {
      name: '닭가슴살',
      image: 'chicken-breast.png',
    },
    {
      name: '닭가슴살',
      image: 'chicken-breast.png',
      disabled: true,
    },
    {
      name: '닭가슴살',
      image: 'chicken-breast.png',
      pressed: true,
    },
  ];

  return (
    <div className='flex h-[92%] w-full gap-11 pt-4.5 pl-14'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          stiffness: 300,
          duration: 0.5,
        }}
        className='h-full w-[45dvw] rounded-[4px] border-2 border-white bg-white/15'
      >
        {/* 이미지영역 */}
      </motion.div>
      <div className='flex flex-1 flex-col justify-between'>
        <div className='flex flex-col gap-3 pr-12 break-keep whitespace-pre-line'>
          <div className='flex h-13.5 items-center gap-2.5'>
            <IconCaution className='size-11.5' />
            <Typography variant='h3-b'>{title}</Typography>
          </div>
          <Typography variant='body'>{description}</Typography>
        </div>
        {type === 'STORY' && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{
              type: 'spring',
              duration: 0.5,
            }}
            className='flex flex-col gap-8'
          >
            {storyOptions.map(option => (
              <ChoiceOption key={option.label} text={option.label} />
            ))}
          </motion.div>
        )}
        {type === 'ITEM' && (
          <div className='flex flex-col gap-6'>
            <div className='flex gap-2'>
              {itemOptions.map(option => (
                <ItemButton
                  key={option.name}
                  name={option.name}
                  imageUrl={option.image}
                  pressed={option.pressed}
                  disabled={option.disabled}
                />
              ))}
            </div>
            <ChoiceOption text='그냥 버틴다' />
          </div>
        )}
      </div>
    </div>
  );
}
