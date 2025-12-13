/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RankingUserDto = {
  properties: {
    rank: {
      type: 'number',
      description: `순위`,
      isRequired: true,
    },
    nickname: {
      type: 'string',
      description: `닉네임`,
      isRequired: true,
    },
    xp: {
      type: 'number',
      description: `XP`,
      isRequired: true,
    },
    isCurrentUser: {
      type: 'boolean',
      description: `현재 조회중인 세션(나)인지 여부`,
    },
  },
} as const;
