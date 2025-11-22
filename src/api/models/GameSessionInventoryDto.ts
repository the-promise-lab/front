/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemDto } from './ItemDto';
export type GameSessionInventoryDto = {
  /**
   * 게임 세션 ID
   */
  sessionId: number;
  /**
   * 아이템 정보
   */
  item: ItemDto;
  /**
   * 수량
   */
  quantity: number;
};
