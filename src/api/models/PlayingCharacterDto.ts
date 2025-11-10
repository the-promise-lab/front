/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacterDto } from './CharacterDto';
export type PlayingCharacterDto = {
  /**
   * 플레이 중인 캐릭터 ID
   */
  id: number;
  /**
   * 플레이 중인 캐릭터 셋 ID
   */
  playingCharacterSetId: number;
  character: CharacterDto;
  /**
   * 현재 체력
   */
  currentHp: number;
  /**
   * 현재 정신력
   */
  currentSp: number;
};
