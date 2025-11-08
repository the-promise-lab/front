/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InventoryResponseDto } from './InventoryResponseDto';
import type { PlayingCharacterSetResponseDto } from './PlayingCharacterSetResponseDto';
export type GameSessionResponseDto = {
  id: number;
  userId: number;
  currentActId: number | null;
  createdAt: string;
  playingCharacterSet: PlayingCharacterSetResponseDto | null;
  inventories: Array<InventoryResponseDto>;
};
