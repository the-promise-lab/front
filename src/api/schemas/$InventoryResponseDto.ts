/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InventoryResponseDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
    },
    bagId: {
      type: 'number',
      isRequired: true,
    },
    slots: {
      type: 'array',
      contains: {
        type: 'SlotResponseDto',
      },
      isRequired: true,
    },
  },
} as const;
