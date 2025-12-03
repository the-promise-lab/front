/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionChoiceOptionDto = {
  /**
   * 선택지 ID
   */
  choiceOptionId: number;
  /**
   * 선택지 문구
   */
  text: string;
  /**
   * 요구 아이템 카테고리
   */
  itemCategoryId: number | null;
  /**
   * 사용될 아이템 ID
   */
  itemId: number | null;
  /**
   * 아이템 이름
   */
  itemName: string | null;
  /**
   * 아이템 이미지 파일명
   */
  itemImage: string | null;
  /**
   * 소모 수량
   */
  quantity: number | null;
  /**
   * 선택 가능 여부
   */
  isSelectable: boolean;
};
