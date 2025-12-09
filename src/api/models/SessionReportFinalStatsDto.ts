/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionReportFinalStatsDto = {
  /**
   * LifePoint 최종값
   */
  lifePoint: number;
  /**
   * 생존 일수
   */
  survivalDays?: number;
  /**
   * 총 선택 횟수
   */
  totalChoices?: number;
  /**
   * GOOD 선택 수
   */
  goodChoices?: number;
  /**
   * BAD 선택 수
   */
  badChoices?: number;
  /**
   * Neutral 선택 수
   */
  neutralChoices?: number;
};
