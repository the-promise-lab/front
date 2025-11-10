/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SetupInfoDto = {
  properties: {
    bags: {
      type: 'array',
      contains: {
        type: 'BagDto',
      },
      isRequired: true,
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
