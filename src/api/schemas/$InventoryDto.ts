/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InventoryDto = {
  properties: {
    id: {
      type: 'number',
      isRequired: true,
    },
    gameSessionId: {
      type: 'number',
    },
    bagId: {
      type: 'number',
      isRequired: true,
    },
    slots: {
      type: 'array',
      contains: {
        type: 'SlotDto',
      },
      isRequired: true,
    },
  },
} as const;
