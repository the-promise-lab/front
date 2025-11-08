/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlayingCharacterDto } from './PlayingCharacterDto';
export type SelectCharacterSetResponseDto = {
  /**
   * 플레이 중인 캐릭터 셋 ID
   */
  id: number;
  /**
   * 게임 세션 ID
   */
  gameSessionId: number;
  /**
   * 캐릭터 그룹 ID
   */
  characterGroupId: number;
  playingCharacter: Array<PlayingCharacterDto>;
};
