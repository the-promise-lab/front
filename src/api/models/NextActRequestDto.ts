/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NextActChoicePayloadDto } from './NextActChoicePayloadDto';
import type { NextActUpdatesDto } from './NextActUpdatesDto';
export type NextActRequestDto = {
  /**
   * 직전 Act ID
   */
  lastActId?: number;
  /**
   * 선택지 보고 (선택지를 보여준 경우에만 전송)
   */
  choice?: NextActChoicePayloadDto;
  /**
   * 프론트 처리 업데이트(인벤토리/스탯 변화 보고)
   */
  updates?: NextActUpdatesDto;
};
