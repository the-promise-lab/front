/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionActMetaDto } from './SessionActMetaDto';
import type { SessionDayMetaDto } from './SessionDayMetaDto';
import type { SessionEndingMetaDto } from './SessionEndingMetaDto';
import type { SessionEventDto } from './SessionEventDto';
export type NextActResponseDto = {
  /**
   * 세션 ID
   */
  sessionId: string;
  status: NextActResponseDto.status;
  /**
   * 현재 Day 정보
   */
  day: SessionDayMetaDto | null;
  /**
   * 현재 Act 정보
   */
  act: SessionActMetaDto | null;
  /**
   * Act 이벤트 리스트
   */
  events: Array<SessionEventDto>;
  /**
   * 엔딩 정보
   */
  ending: SessionEndingMetaDto | null;
};
export namespace NextActResponseDto {
  export enum status {
    IN_PROGRESS = 'IN_PROGRESS',
    DAY_END = 'DAY_END',
    GAME_END = 'GAME_END',
    GAME_OVER = 'GAME_OVER',
    SUDDEN_DEATH = 'SUDDEN_DEATH',
  }
}
