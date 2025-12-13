/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EndingCollectionGroupDto = {
  properties: {
    characterGroupCode: {
      type: 'string',
      description: `캐릭터 그룹 코드`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'EndingCollectionItemDto',
      },
      isRequired: true,
    },
  },
} as const;
