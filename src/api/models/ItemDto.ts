/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ItemDto = {
  /**
   * 아이템 ID
   */
  id: number;
  /**
   * 아이템 이름
   */
  name: string;
  /**
   * 아이템 이미지
   */
  image: string | null;
  /**
   * 가방 차지 용량
   */
  capacityCost: number;
  /**
   * 소모성 아이템 여부
   */
  isConsumable: boolean | null;
  /**
   * 상점 섹션 ID
   */
  storeSectionId: number | null;
  /**
   * 가방에서 보이는지 여부
   */
  isVisable: boolean | null;
  /**
   * X 좌표
   */
  positionX: number | null;
  /**
   * Y 좌표
   */
  positionY: number | null;
};
