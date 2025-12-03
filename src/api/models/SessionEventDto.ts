/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SessionChoiceDto } from './SessionChoiceDto';
import type { SessionEventCharacterDto } from './SessionEventCharacterDto';
import type { SessionEventEffectDto } from './SessionEventEffectDto';
import type { SessionEventItemChangeDto } from './SessionEventItemChangeDto';
import type { SessionEventSessionEffectDto } from './SessionEventSessionEffectDto';
export type SessionEventDto = {
  /**
   * 이벤트 ID
   */
  eventId: number;
  type: SessionEventDto.type;
  /**
   * 대사/내레이션
   */
  script?: string;
  /**
   * 대사 캐릭터 목록
   */
  characters: Array<SessionEventCharacterDto>;
  /**
   * 배경 이미지
   */
  bgImage?: string;
  /**
   * 장면 효과
   */
  sceneEffect?: string;
  /**
   * 배경음
   */
  bgm?: string;
  /**
   * 배경음 볼륨
   */
  bgmVolume?: number;
  /**
   * 효과음
   */
  se?: string;
  /**
   * 효과음 볼륨
   */
  seVolume?: number;
  /**
   * 효과음 반복 여부
   */
  seLoop?: boolean;
  /**
   * 선택지 정보
   */
  choice?: SessionChoiceDto;
  /**
   * 캐릭터 스탯 변화
   */
  effects?: Array<SessionEventEffectDto>;
  /**
   * 아이템 변화
   */
  itemChanges?: Array<SessionEventItemChangeDto>;
  /**
   * 세션 스탯 변화
   */
  sessionEffects?: Array<SessionEventSessionEffectDto>;
};
export namespace SessionEventDto {
  export enum type {
    SIMPLE = 'Simple',
    STORY_CHOICE = 'StoryChoice',
    ITEM_CHOICE = 'ItemChoice',
    STATUS = 'Status',
    SYSTEM = 'System',
  }
}
