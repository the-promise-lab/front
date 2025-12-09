/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SessionReportSessionMetaDto = {
  /**
   * 게임 세션 ID
   */
  id: number;
  /**
   * 사용자 이름(카카오 로그인명)
   */
  userName: string;
  /**
   * 캐릭터 그룹 코드
   */
  characterGroupCode?: string;
  /**
   * 캐릭터 그룹 이름
   */
  characterGroupName?: string;
  /**
   * 세션 상태
   */
  status: string;
  /**
   * 종료 시각
   */
  endedAt?: string;
  /**
   * 생성 시각
   */
  createdAt: string;
  /**
   * 총 플레이 시간(초)
   */
  totalPlayTimeSeconds?: number;
  /**
   * LifePoint 최종값
   */
  lifePoint: number;
};
