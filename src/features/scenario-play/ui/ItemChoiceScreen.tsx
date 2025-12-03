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
  const description = event.choice?.description ?? event.script ?? '';
  const options = event.choice?.options ?? [];
  const fallback = event.choice?.fallback;
  const thumbnail = event.choice?.thumbnail;

  const handleItemSelect = (index: number, option: ScenarioChoiceOption) => {
    setSelectedItemIndex(index);
    // 아이템 선택 시 해당 옵션의 itemId와 함께 콜백
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
        transition={{ stiffness: 300, duration: 0.5 }}
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
