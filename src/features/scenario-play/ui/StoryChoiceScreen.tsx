import { IconCaution } from '@shared/ui/icons';
import ChoiceOption from './kit/ChoiceOption';
import { motion } from 'framer-motion';
import Typography from '@shared/ui/Typography';
import type { ScenarioEvent, ScenarioChoiceOption } from '../model/types';
import { useState } from 'react';
import { getObjectUrlSelector, useAssetStore } from '@shared/preload-assets';

interface StoryChoiceScreenProps {
  event: ScenarioEvent;
  onSelect?: (option: ScenarioChoiceOption) => void;
}

export default function StoryChoiceScreen({
  event,
  onSelect,
}: StoryChoiceScreenProps) {
  const [pressedOptionId, setPressedOptionId] = useState<number | null>(null);
  const getObjectUrl = useAssetStore(getObjectUrlSelector);
  const title = event.choice?.title ?? '랜덤 이벤트 제목';
  const description =
    event.choice?.description ??
    '랜덤 이벤트에 대한 텍스트가 들어갑니다.\n선택지[1]과 선택지[2]가 있는 화면의 경우,\n엔딩 분기를 위한 스토리형 사건입니다.';
  const thumbnail = event.choice?.thumbnail;
  const options = event.choice?.options?.slice(0, 3) ?? [
    {
      choiceOptionId: 1,
      text: '선택지 1',
      itemImage: 'item-image-1.png',
    },
    {
      choiceOptionId: 2,
      text: '선택지 2',
      itemImage: 'item-image-2.png',
    },
    {
      choiceOptionId: 3,
      text: '선택지 3',
      itemImage: 'item-image-3.png',
    },
  ];

  const handleOptionPress = (option: ScenarioChoiceOption) => {
    setPressedOptionId(option.choiceOptionId);
  };

  const handleOptionProceed = (option: ScenarioChoiceOption) => {
    onSelect?.(option);
  };

  return (
    <div className='flex w-full gap-13.75 pt-22.5 pl-14'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          stiffness: 300,
          duration: 0.5,
        }}
        className='h-157.5 w-225.5 rounded-[2px] border border-white bg-white/15 lg:rounded-[4px] lg:border-2'
      >
        {thumbnail && (
          <img
            src={getObjectUrl(thumbnail)}
            alt={title}
            className='h-full w-full object-cover'
          />
        )}
      </motion.div>
      <div className='flex flex-1 flex-col justify-between'>
        <div className='flex flex-col gap-3 pr-12 break-keep whitespace-pre-line'>
          <div className='flex h-13.5 items-center gap-2.5'>
            <IconCaution className='size-11.5' />
            <Typography variant='h3-b'>{title}</Typography>
          </div>
          <Typography variant='body'>{description}</Typography>
        </div>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{
            type: 'spring',
            duration: 0.5,
          }}
          className='flex flex-col gap-8'
        >
          {options.map(option => (
            <ChoiceOption
              key={option.choiceOptionId}
              text={option.text}
              isPressed={pressedOptionId === option.choiceOptionId}
              onPress={() => handleOptionPress(option)}
              onProceed={() => handleOptionProceed(option)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
