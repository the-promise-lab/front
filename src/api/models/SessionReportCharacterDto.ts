/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionReportCharacterDto = {
  /**
   * 캐릭터 코드
   */
  characterCode: string;
  /**
   * 캐릭터 이름
   */
  name: string;
  /**
   * 최종 HP
   */
  finalHp: number;
  /**
   * 최종 Mental
   */
  finalMental: number;
  /**
   * 최대 HP
   */
  maxHp?: number;
  /**
   * 최대 Mental
   */
  maxMental?: number;
  /**
   * 생존 상태 예: ALIVE/DEAD
   */
  survivalStatus: string;
};
