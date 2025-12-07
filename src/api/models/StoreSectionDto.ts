/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemDto } from './ItemDto';
export type StoreSectionDto = {
  /**
   * 상점 섹션 ID
   */
  id: number;
  /**
   * 상점 섹션 코드
   */
  code: string;
  /**
   * 상점 섹션 이름
   */
  displayName: string;
  /**
   * 배경 이미지
   */
  backgroundImage: string | null;
  /**
   * 아이템 목록
   */
  items: Array<ItemDto>;
};
