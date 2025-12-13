/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RankingResponseDto = {
  properties: {
    success: {
      type: 'boolean',
      description: `성공 여부`,
      isRequired: true,
    },
    data: {
      type: 'RankingDataDto',
      isRequired: true,
    },
  },
} as const;
