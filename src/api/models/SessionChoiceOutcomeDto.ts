/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionEventDto } from './SessionEventDto';
export type SessionChoiceOutcomeDto = {
  resultType: SessionChoiceOutcomeDto.resultType;
  /**
   * 후속 이벤트 목록
   */
  events: Array<SessionEventDto>;
};
export namespace SessionChoiceOutcomeDto {
  export enum resultType {
    ACT_END = 'ACT_END',
    DAY_END = 'DAY_END',
    GAME_END = 'GAME_END',
    GAME_OVER = 'GAME_OVER',
    SUDDEN_DEATH = 'SUDDEN_DEATH',
  }
}
