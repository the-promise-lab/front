/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HistoryItemDto } from './HistoryItemDto';
export type HistoryResponseDto = {
  /**
   * 성공 여부
   */
  success: boolean;
  /**
   * 히스토리 목록
   */
  data: Array<HistoryItemDto>;
  /**
   * 총 데이터 수
   */
  total: number;
  /**
   * 현재 페이지
   */
  page: number;
  /**
   * 페이지 당 개수
   */
  limit: number;
};
