/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionReportResponseDto } from './SessionReportResponseDto';
export type HistoryItemDto = {
  /**
   * 세션 ID
   */
  id: string;
  /**
   * 캐릭터 이름(들)
   */
  characterName: string;
  /**
   * 최종 결과 (등급)
   */
  resultType: string;
  /**
   * XP 총합
   */
  xp: number;
  /**
   * 종료 날짜
   */
  date: string;
  /**
   * 종료 시간
   */
  time: string;
  /**
   * 캐릭터 구성 이미지 (또는 엔딩 이미지)
   */
  characterImageUrl?: string;
  /**
   * 히스토리 상세 (리포트 데이터). 목록 조회 시에는 제외될 수 있음.
   */
  playReport?: SessionReportResponseDto;
};
