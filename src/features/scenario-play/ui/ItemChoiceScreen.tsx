import { useState } from 'react';
import { IconCaution } from '@shared/ui/icons';
import { motion } from 'framer-motion';
import Typography from '@shared/ui/Typography';
import ChoiceOption from './kit/ChoiceOption';
import ItemButton from './kit/ItemButton';
import type { ScenarioEvent, ScenarioChoiceOption } from '../model/types';

interface ItemChoiceScreenProps {
  event: ScenarioEvent;
  onSelect?: (option: ScenarioChoiceOption, selectedItemId?: number) => void;
}

export default function ItemChoiceScreen({
  event,
  onSelect,
}: ItemChoiceScreenProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const title = event.choice?.title ?? '아이템 선택';
  const description =
    event.choice?.description ??
    '랜덤 이벤트에 대한 텍스트가 들어갑니다.\n아이템을 선택해주세요.';
  const thumbnail = event.choice?.thumbnail;
  const options = event.choice?.options ?? [
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
  const fallback = event.choice?.fallback ?? {
    choiceOptionId: 4,
    text: '그냥 버틴다',
  };

  const handleItemSelect = (index: number, option: ScenarioChoiceOption) => {
    setSelectedItemIndex(index);
    onSelect?.(option, option.choiceOptionId);
  };

  const handleFallbackPress = () => {
    if (fallback) {
      onSelect?.({
        choiceOptionId: fallback.choiceOptionId,
        text: fallback.text,
      });
    }
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
        className='h-157.5 w-225.5 rounded-[2px] border-1 border-white bg-white/15 lg:rounded-[4px] lg:border-2'
      >
        {thumbnail && (
          <img
            src={thumbnail}
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
        <div className='flex flex-col gap-6'>
          <div className='flex gap-2'>
            {options.map((option, index) => (
              <ItemButton
                key={option.choiceOptionId}
                name={option.text}
                imageUrl={option.itemImage}
                pressed={selectedItemIndex === index}
                onClick={() => handleItemSelect(index, option)}
              />
            ))}
          </div>
          {fallback && (
            <ChoiceOption text={fallback.text} onPress={handleFallbackPress} />
          )}
        </div>
      </div>
    </div>
  );
}
