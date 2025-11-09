/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SetupInfoResponseDto = {
  properties: {
    bags: {
      type: 'array',
      contains: {
        type: 'BagResponseDto',
      },
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'ItemResponseDto',
      },
      isRequired: true,
    },
  },
} as const;
