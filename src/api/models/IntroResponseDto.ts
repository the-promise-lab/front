/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionEventDto } from './SessionEventDto';
export type IntroResponseDto = {
  /**
   * Session ID
   */
  sessionId: string;
  /**
   * Intro mode that was played
   */
  introMode: number;
  /**
   * Intro events to render
   */
  events: Array<SessionEventDto>;
};
