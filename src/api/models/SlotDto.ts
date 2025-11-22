/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemDto } from './ItemDto';
export type SlotDto = {
  /**
   * 슬롯 ID
   */
  id: number;
  /**
   * 인벤토리 ID
   */
  invId?: number;
  /**
   * 아이템 정보
   */
  item: ItemDto;
  /**
   * 수량
   */
  quantity: number;
};
