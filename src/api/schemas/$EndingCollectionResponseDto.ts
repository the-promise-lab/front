/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $EndingCollectionResponseDto = {
  properties: {
    success: {
      type: 'boolean',
      description: `성공 여부`,
      isRequired: true,
    },
    data: {
      type: 'array',
      contains: {
        type: 'EndingCollectionGroupDto',
      },
      isRequired: true,
    },
  },
} as const;
