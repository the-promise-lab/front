/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $HistoryResponseDto = {
  properties: {
    success: {
      type: 'boolean',
      description: `성공 여부`,
      isRequired: true,
    },
    data: {
      type: 'array',
      contains: {
        type: 'HistoryItemDto',
      },
      isRequired: true,
    },
    total: {
      type: 'number',
      description: `총 데이터 수`,
      isRequired: true,
    },
    page: {
      type: 'number',
      description: `현재 페이지`,
      isRequired: true,
    },
    limit: {
      type: 'number',
      description: `페이지 당 개수`,
      isRequired: true,
    },
  },
} as const;
