/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionReportBagDto = {
  /**
   * 가방 ID
   */
  bagId: number;
  /**
   * 가방 이름
   */
  bagName: string;
  /**
   * 가방 용량
   */
  capacity: number;
  /**
   * 사용 용량
   */
  usedCapacity?: number;
  /**
   * 사용률(%)
   */
  usageRate?: number;
  /**
   * 가방 등급
   */
  grade?: string;
  /**
   * 가방 효율(%)
   */
  efficiency?: number;
};
