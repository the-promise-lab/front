/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $SubmitGameSessionInventoryDto = {
  properties: {
    bagId: {
      type: 'number',
      description: `가방 ID`,
      isRequired: true,
    },
    items: {
      type: 'array',
      contains: {
        type: 'GameSessionInventoryItemDto',
      },
      isRequired: true,
    },
  },
} as const;
