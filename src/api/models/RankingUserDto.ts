/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RankingUserDto = {
  /**
   * 순위
   */
  rank: number;
  /**
   * 닉네임
   */
  nickname: string;
  /**
   * XP
   */
  xp: number;
  /**
   * 현재 조회중인 세션(나)인지 여부
   */
  isCurrentUser?: boolean;
};
