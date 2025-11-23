/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $StoreSectionDto = {
  properties: {
    id: {
      type: 'number',
      description: `상점 섹션 ID`,
      isRequired: true,
    },
    code: {
      type: 'string',
      description: `상점 섹션 코드`,
      isRequired: true,
    },
    displayName: {
      type: 'string',
      description: `상점 섹션 이름`,
      isRequired: true,
    },
    backgroundImage: {
      type: 'string',
      description: `배경 이미지`,
      isRequired: true,
      isNullable: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'ItemDto',
      },
      isRequired: true,
    },
  },
} as const;
