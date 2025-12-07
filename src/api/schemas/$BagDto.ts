/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $BagDto = {
  properties: {
    id: {
      type: 'number',
      description: `가방 ID`,
      isRequired: true,
    },
    name: {
      type: 'string',
      description: `가방 이름`,
      isRequired: true,
    },
    code: {
      type: 'string',
      description: `가방 코드`,
      isRequired: true,
    },
    image: {
      type: 'string',
      description: `가방 이미지`,
      isRequired: true,
    },
    capacity: {
      type: 'number',
      description: `가방 용량`,
      isRequired: true,
    },
    description: {
      type: 'string',
      description: `가방 설명`,
      isRequired: true,
    },
  },
} as const;
