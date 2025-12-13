/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RankingDataDto = {
  properties: {
    myScore: {
      type: 'RankingMyScoreDto',
      isRequired: true,
    },
    characters: {
      type: 'array',
      contains: {
        type: 'RankingCharacterResultDto',
      },
      isRequired: true,
    },
    rankings: {
      type: 'array',
      contains: {
        type: 'RankingUserDto',
      },
      isRequired: true,
    },
  },
} as const;
