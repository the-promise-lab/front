/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionReportPointDto = {
  /**
   * GOOD/BAD 등 포인트 유형
   */
  type: string;
  /**
   * 카테고리
   */
  category: string;
  /**
   * 제목
   */
  title: string;
  /**
   * 설명
   */
  description: string;
  /**
   * Day 번호
   */
  dayNumber?: number;
  /**
   * Act ID
   */
  actId?: number;
  /**
   * 점수
   */
  points: number;
};
