/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubmitInventoryResponseDto = {
  properties: {
    inventories: {
      type: 'array',
      contains: {
        type: 'InventoryResponseDto',
      },
      isRequired: true,
    },
  },
} as const;
