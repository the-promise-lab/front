/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SlotDto } from './SlotDto';
export type SubmitInventoryDto = {
  /**
   * 가방 ID
   */
  bagId: number;
  /**
   * 인벤토리 슬롯 목록
   */
  slots: Array<SlotDto>;
};
