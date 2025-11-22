/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BagDto } from './BagDto';
import type { GameSessionInventoryDto } from './GameSessionInventoryDto';
import type { PlayingCharacterSetDto } from './PlayingCharacterSetDto';
export type GameSessionDto = {
  /**
   * 게임 세션 ID
   */
  id: number;
  /**
   * 유저 ID
   */
  userId: number;
  /**
   * 가방 정보
   */
  bag: BagDto;
  /**
   * 가방 사용량
   */
  bagCapacityUsed: number | null;
  /**
   * 가방 확정 시각
   */
  bagConfirmedAt: string | null;
  /**
   * 게임 세션 상태
   */
  status: string | null;
  /**
   * 생존 점수
   */
  lifePoint: number;
  /**
   * 현재 날짜 ID
   */
  currentDayId: number | null;
  /**
   * 현재 액트 ID
   */
  currentActId: number | null;
  /**
   * 엔딩 ID
   */
  endingId: number | null;
  /**
   * 게임 종료 시각
   */
  endedAt: string | null;
  /**
   * 생성 시각
   */
  createdAt: string;
  /**
   * 수정 시각
   */
  updatedAt: string;
  /**
   * 플레이 중인 캐릭터 셋
   */
  playingCharacterSet: PlayingCharacterSetDto | null;
  /**
   * 게임 세션 인벤토리
   */
  gameSessionInventory: Array<GameSessionInventoryDto>;
};
