import { IconCaution } from '@shared/ui/icons';
import { motion } from 'framer-motion';
import Typography from '@shared/ui/Typography';
import ChoiceOption from './kit/ChoiceOption';
import type { ScenarioEvent, ScenarioChoiceOption } from '../model/types';

interface StoryChoiceScreenProps {
  event: ScenarioEvent;
  onSelect?: (option: ScenarioChoiceOption) => void;
}

export default function StoryChoiceScreen({
  event,
  onSelect,
}: StoryChoiceScreenProps) {
  const title = event.choice?.title ?? '이벤트';
  const description = event.choice?.description ?? event.script ?? '';
  const options = event.choice?.options ?? [];
  const thumbnail = event.choice?.thumbnail;

  const handleOptionPress = (option: ScenarioChoiceOption) => {
    onSelect?.(option);
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
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className='flex flex-col gap-8'
        >
          {options.map(option => (
            <ChoiceOption
              key={option.choiceOptionId}
              text={option.text}
              onPress={() => handleOptionPress(option)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
