/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameSessionInventoryItemDto } from './GameSessionInventoryItemDto';
export type SubmitGameSessionInventoryDto = {
  /**
   * 가방 ID
   */
  bagId: number;
  /**
   * 아이템 목록
   */
  items: Array<GameSessionInventoryItemDto>;
};
