/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RankingCharacterResultDto } from './RankingCharacterResultDto';
import type { RankingMyScoreDto } from './RankingMyScoreDto';
import type { RankingUserDto } from './RankingUserDto';
export type RankingDataDto = {
  myScore: RankingMyScoreDto;
  characters: Array<RankingCharacterResultDto>;
  rankings: Array<RankingUserDto>;
};
