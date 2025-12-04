/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SessionEndingMetaDto = {
  properties: {
    endingId: {
      type: 'number',
      description: `엔딩 ID`,
      isRequired: true,
    },
    endingIndex: {
      type: 'number',
      description: `엔딩 인덱스`,
      isRequired: true,
    },
    title: {
      type: 'string',
      description: `엔딩 제목`,
      isRequired: true,
    },
    endingImage: {
      type: 'string',
      description: `엔딩 이미지`,
      isRequired: true,
      isNullable: true,
    },
  },
} as const;
