/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NextActCharacterStatusChangeDto } from './NextActCharacterStatusChangeDto';
import type { NextActItemChangeDto } from './NextActItemChangeDto';
import type { NextActSessionStatChangeDto } from './NextActSessionStatChangeDto';
export type NextActUpdatesDto = {
  /**
   * 아이템 변화
   */
  itemChanges?: Array<NextActItemChangeDto>;
  /**
   * 캐릭터 상태 변화
   */
  characterStatusChanges?: Array<NextActCharacterStatusChangeDto>;
  /**
   * 세션 통계 변화
   */
  sessionStatChanges?: Array<NextActSessionStatChangeDto>;
};
