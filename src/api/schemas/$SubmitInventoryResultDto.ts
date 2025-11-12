/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubmitInventoryResultDto = {
  properties: {
    inventories: {
      type: 'array',
      contains: {
        type: 'InventoryDto',
      },
      isRequired: true,
    },
  },
} as const;
