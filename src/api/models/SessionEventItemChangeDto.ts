/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionEventItemChangeDto = {
  /**
   * 아이템 ID
   */
  itemId: number;
  /**
   * 아이템 이름
   */
  itemName: string | null;
  /**
   * 변동 수량
   */
  quantityChange: number;
  /**
   * 변경 후 총량
   */
  newQuantity: number | null;
};
