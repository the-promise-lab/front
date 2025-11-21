/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryDto } from './InventoryDto';
import type { PlayingCharacterSetDto } from './PlayingCharacterSetDto';
export type GameSessionDto = {
  id: number;
  userId: number;
  currentActId: number | null;
  createdAt: string;
  playingCharacterSet: PlayingCharacterSetDto | null;
  inventory: InventoryDto | null;
};
