/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RankingMyScoreDto = {
  properties: {
    rank: {
      type: 'number',
      description: `내 순위`,
      isRequired: true,
    },
    totalUsers: {
      type: 'number',
      description: `전체 사용자(세션) 수`,
      isRequired: true,
    },
    xp: {
      type: 'number',
      description: `획득 XP (HP + SP + LifePoint)`,
      isRequired: true,
    },
  },
} as const;
