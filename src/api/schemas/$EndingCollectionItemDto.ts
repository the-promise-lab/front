/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EndingCollectionItemDto = {
  properties: {
    endingId: {
      type: 'number',
      description: `엔딩 ID`,
      isRequired: true,
    },
    title: {
      type: 'string',
      description: `엔딩 제목`,
      isRequired: true,
    },
    imageUrl: {
      type: 'string',
      description: `엔딩 이미지 URL (수집되지 않은 경우 null)`,
      isRequired: true,
      isNullable: true,
    },
    isCollected: {
      type: 'boolean',
      description: `수집 여부`,
      isRequired: true,
    },
  },
} as const;
