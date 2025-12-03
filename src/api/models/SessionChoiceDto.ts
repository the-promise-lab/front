/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionChoiceFallbackDto } from './SessionChoiceFallbackDto';
import type { SessionChoiceOptionDto } from './SessionChoiceOptionDto';
import type { SessionChoiceOutcomeDto } from './SessionChoiceOutcomeDto';
export type SessionChoiceDto = {
  /**
   * 선택지 제목
   */
  title: string;
  /**
   * 설명
   */
  description?: string;
  /**
   * 선택지 썸네일
   */
  thumbnail?: string;
  type: SessionChoiceDto.type;
  /**
   * 선택지 목록
   */
  options: Array<SessionChoiceOptionDto>;
  /**
   * 아이템 미보유 시 기본 선택
   */
  fallback?: SessionChoiceFallbackDto;
  /**
   * 선택지별 결과 이벤트
   */
  outcomes?: Record<string, SessionChoiceOutcomeDto>;
};
export namespace SessionChoiceDto {
  export enum type {
    STORY_CHOICE = 'StoryChoice',
    ITEM_CHOICE = 'ItemChoice',
  }
}
