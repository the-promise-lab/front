import { useGameFlowStore } from '@processes/game-flow';
import { motion } from 'framer-motion';
import { ShelfSelection } from '@features/shelf-selection';
import { useEffect } from 'react';
import type { InventoryDto } from '@api';

export default function PackingPhase() {
  const { back, gameSession, saveInventory, next } = useGameFlowStore();

  const bag = gameSession?.selectedBag;

  const onComplete = (result: InventoryDto) => {
    saveInventory(result);
    next();
  };

  useEffect(() => {
    if (!bag) {
      back();
    }
  }, [bag, back]);

  if (!bag) return null;
  return (
    <div className='relative h-full w-full'>
      {/* 기존 PACKING_PHASE 배경 (ShelfSelection) */}
      <motion.div
        className='absolute inset-0'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <ShelfSelection onBack={back} bag={bag} onComplete={onComplete} />
      </motion.div>
    </div>
  );
}
